import '../styles/battle.css';
import type { NavigateParams, BattleState } from '../types';
import { loadPlayer, addXP, addCoins, addWrongAnswer } from '../store';
import { createBattleState, processCorrectAnswer, processWrongAnswer, processTimeout, isBattleOver, calculateResult } from '../engine/combat';
import { generateQuestion } from '../engine/questions';
import { playCorrect, playWrong, playCombo, playVictory, resumeAudio } from '../audio';
import { navigate } from '../main';

let intervalId: ReturnType<typeof setInterval> | null = null;

function clearTimer(): void {
  if (intervalId !== null) { clearInterval(intervalId); intervalId = null; }
}

export function mount(container: HTMLElement, params?: NavigateParams): void {
  clearTimer();
  resumeAudio();

  const islandId = params?.islandId ?? 'addition';
  const player = loadPlayer();
  if (!player) { navigate('home'); return; }

  const state: BattleState = createBattleState(islandId, player.level);
  state.currentQuestion = generateQuestion(islandId, state.difficulty);

  renderBattle(container, state, player.avatar, player.nickname);
  startTimer(container, state, islandId);
}

function renderBattle(container: HTMLElement, state: BattleState, playerAvatar: string, playerName: string): void {
  const q = state.currentQuestion!;
  container.innerHTML = `
    <div class="battle-screen" id="battleScreen">
      <div class="battle-header">
        <button class="btn-back" id="backBtn">← 退出</button>
        <div class="battle-score">得分: <span id="scoreVal">${state.score}</span></div>
        <div class="battle-combo" id="comboDisplay" style="opacity:${state.combo >= 3 ? 1 : 0}">
          🔥 ${state.combo}连击
        </div>
      </div>

      <div class="battle-arena">
        <div class="monster-side">
          <div class="monster-emoji" id="monsterEmoji">${state.monster.emoji}</div>
          <div class="monster-name">${state.monster.name}</div>
          <div class="hp-bar-wrap">
            <div class="hp-bar monster-hp-bar">
              <div class="hp-fill monster-hp-fill" id="monsterHpFill"
                style="width:${(state.monster.currentHp / state.monster.maxHp) * 100}%"></div>
            </div>
            <span class="hp-text" id="monsterHpText">${state.monster.currentHp}/${state.monster.maxHp}</span>
          </div>
        </div>

        <div class="vs-badge">VS</div>

        <div class="player-side">
          <div class="player-emoji">${playerAvatar}</div>
          <div class="player-name">${playerName}</div>
          <div class="hp-bar-wrap">
            <div class="hp-bar player-hp-bar">
              <div class="hp-fill player-hp-fill" id="playerHpFill"
                style="width:${(state.playerHp / state.playerMaxHp) * 100}%"></div>
            </div>
            <span class="hp-text" id="playerHpText">${state.playerHp}/${state.playerMaxHp}</span>
          </div>
        </div>
      </div>

      <div class="timer-wrap">
        <div class="timer-ring">
          <svg viewBox="0 0 44 44" class="timer-svg">
            <circle cx="22" cy="22" r="18" fill="none" stroke="#e8e0d5" stroke-width="4"/>
            <circle cx="22" cy="22" r="18" fill="none" stroke="var(--color-primary)" stroke-width="4"
              stroke-dasharray="113" stroke-dashoffset="0" id="timerCircle"
              stroke-linecap="round" transform="rotate(-90 22 22)"/>
          </svg>
          <span class="timer-text" id="timerText">10</span>
        </div>
        <div class="progress-text" id="progressText">第 ${state.questionsAnswered + 1} / 10 题</div>
      </div>

      <div class="question-card card" id="questionCard">
        <div class="question-text${q.text.length > 12 ? ' long' : ''}" id="questionText">${q.text}</div>
      </div>

      <div class="numpad" id="numpad">
        ${[1,2,3,4,5,6,7,8,9,'⌫',0,'✓'].map(k => `
          <button class="numpad-btn${k === '✓' ? ' numpad-confirm' : k === '⌫' ? ' numpad-del' : ''}"
            data-key="${k}" type="button">${k}</button>
        `).join('')}
      </div>

      <div class="answer-display">
        <span id="answerDisplay">_</span>
      </div>
    </div>
  `;

  setupNumpad(container, state, state.islandId);
  setupBackBtn(container);
}

let currentAnswer = '';

function setupNumpad(container: HTMLElement, state: BattleState, islandId: string): void {
  currentAnswer = '';
  updateAnswerDisplay(container);

  const numpad = container.querySelector('#numpad')!;
  numpad.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.numpad-btn') as HTMLButtonElement | null;
    if (!btn) return;
    const key = btn.dataset['key']!;
    handleKey(key, container, state, islandId);
  });

  // Keyboard support
  const keyHandler = (e: KeyboardEvent) => {
    if (!container.isConnected) { document.removeEventListener('keydown', keyHandler); return; }
    if (e.key >= '0' && e.key <= '9') handleKey(e.key, container, state, islandId);
    else if (e.key === 'Backspace') handleKey('⌫', container, state, islandId);
    else if (e.key === 'Enter') handleKey('✓', container, state, islandId);
  };
  document.addEventListener('keydown', keyHandler);
}

function handleKey(key: string, container: HTMLElement, state: BattleState, islandId: string): void {
  if (key === '⌫') {
    currentAnswer = currentAnswer.slice(0, -1);
  } else if (key === '✓') {
    submitAnswer(container, state, islandId);
    return;
  } else if (currentAnswer.length < 4) {
    currentAnswer += key;
  }
  updateAnswerDisplay(container);
}

function updateAnswerDisplay(container: HTMLElement): void {
  const el = container.querySelector('#answerDisplay');
  if (el) el.textContent = currentAnswer || '_';
}

function submitAnswer(container: HTMLElement, state: BattleState, islandId: string): void {
  if (!currentAnswer) return;
  const answer = parseInt(currentAnswer, 10);
  const correct = state.currentQuestion!.answer;

  clearTimer();

  if (answer === correct) {
    const { isCombo } = processCorrectAnswer(state);
    if (isCombo) playCombo(); else playCorrect();
    flashScreen(container, 'success');
    animateMonster(container);
    if (isCombo) showComboEffect(container, state.combo);
  } else {
    const p = loadPlayer()!;
    addWrongAnswer(p, state.currentQuestion!.text, correct);
    processWrongAnswer(state);
    playWrong();
    flashScreen(container, 'danger');
    shakeScreen(container);
  }

  currentAnswer = '';
  updateHpBars(container, state);
  updateScore(container, state);

  if (isBattleOver(state)) {
    setTimeout(() => showResult(container, state), 600);
    return;
  }

  state.currentQuestion = generateQuestion(islandId, state.difficulty);
  state.timeLeft = state.timeLimit;

  setTimeout(() => {
    updateQuestion(container, state);
    updateProgress(container, state);
    startTimer(container, state, islandId);
  }, 400);
}

function startTimer(container: HTMLElement, state: BattleState, islandId: string): void {
  clearTimer();
  const TICK = 100;
  intervalId = setInterval(() => {
    if (!container.isConnected) { clearTimer(); return; }
    state.timeLeft -= TICK;
    state.timeUsed += TICK;
    updateTimerUI(container, state);

    if (state.timeLeft <= 0) {
      clearTimer();
      processTimeout(state);
      playWrong();
      flashScreen(container, 'danger');
      shakeScreen(container);
      updateHpBars(container, state);
      currentAnswer = '';
      updateAnswerDisplay(container);

      if (isBattleOver(state)) {
        setTimeout(() => showResult(container, state), 600);
        return;
      }

      state.currentQuestion = generateQuestion(islandId, state.difficulty);
      state.timeLeft = state.timeLimit;
      setTimeout(() => {
        updateQuestion(container, state);
        updateProgress(container, state);
        startTimer(container, state, islandId);
      }, 400);
    }
  }, TICK);
}

function updateTimerUI(container: HTMLElement, state: BattleState): void {
  const circle = container.querySelector('#timerCircle') as SVGCircleElement | null;
  const text = container.querySelector('#timerText');
  if (!circle || !text) return;
  const ratio = state.timeLeft / state.timeLimit;
  const circumference = 113;
  circle.style.strokeDashoffset = String(circumference * (1 - ratio));
  circle.style.stroke = ratio < 0.3 ? 'var(--color-danger)' : 'var(--color-primary)';
  text.textContent = String(Math.ceil(state.timeLeft / 1000));
}

function updateHpBars(container: HTMLElement, state: BattleState): void {
  const mFill = container.querySelector('#monsterHpFill') as HTMLElement | null;
  const pFill = container.querySelector('#playerHpFill') as HTMLElement | null;
  const mText = container.querySelector('#monsterHpText');
  const pText = container.querySelector('#playerHpText');
  if (mFill) mFill.style.width = `${(state.monster.currentHp / state.monster.maxHp) * 100}%`;
  if (pFill) pFill.style.width = `${(state.playerHp / state.playerMaxHp) * 100}%`;
  if (mText) mText.textContent = `${state.monster.currentHp}/${state.monster.maxHp}`;
  if (pText) pText.textContent = `${state.playerHp}/${state.playerMaxHp}`;
}

function updateScore(container: HTMLElement, state: BattleState): void {
  const el = container.querySelector('#scoreVal');
  if (el) el.textContent = String(state.score);
  const combo = container.querySelector('#comboDisplay') as HTMLElement | null;
  if (combo) {
    combo.style.opacity = state.combo >= 3 ? '1' : '0';
    combo.textContent = `🔥 ${state.combo}连击`;
  }
}

function updateQuestion(container: HTMLElement, state: BattleState): void {
  const el = container.querySelector('#questionText');
  if (el) {
    const text = state.currentQuestion!.text;
    el.textContent = text;
    el.classList.toggle('long', text.length > 12);
    el.classList.remove('pop-in');
    void (el as HTMLElement).offsetWidth;
    el.classList.add('pop-in');
  }
  updateAnswerDisplay(container);
}

function updateProgress(container: HTMLElement, state: BattleState): void {
  const el = container.querySelector('#progressText');
  if (el) el.textContent = `第 ${state.questionsAnswered + 1} / 10 题`;
}

function flashScreen(container: HTMLElement, type: 'success' | 'danger'): void {
  const screen = container.querySelector('#battleScreen') as HTMLElement | null;
  if (!screen) return;
  screen.classList.remove('flash-success', 'flash-danger');
  void screen.offsetWidth;
  screen.classList.add(type === 'success' ? 'flash-success' : 'flash-danger');
  setTimeout(() => screen.classList.remove('flash-success', 'flash-danger'), 400);
}

function shakeScreen(container: HTMLElement): void {
  const card = container.querySelector('#questionCard') as HTMLElement | null;
  if (!card) return;
  card.classList.remove('shake');
  void card.offsetWidth;
  card.classList.add('shake');
  setTimeout(() => card.classList.remove('shake'), 400);
}

function animateMonster(container: HTMLElement): void {
  const el = container.querySelector('#monsterEmoji') as HTMLElement | null;
  if (!el) return;
  el.classList.remove('monster-hit');
  void el.offsetWidth;
  el.classList.add('monster-hit');
  setTimeout(() => el.classList.remove('monster-hit'), 400);
}

function showComboEffect(container: HTMLElement, combo: number): void {
  const el = document.createElement('div');
  el.className = 'combo-popup pop-in';
  el.textContent = `🔥 ${combo}连击！`;
  container.querySelector('#battleScreen')?.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

function setupBackBtn(container: HTMLElement): void {
  container.querySelector('#backBtn')?.addEventListener('click', () => {
    clearTimer();
    navigate('map');
  });
}

function showResult(container: HTMLElement, state: BattleState): void {
  clearTimer();
  playVictory();

  const p = loadPlayer()!;
  const result = calculateResult(state);
  const { player: updatedPlayer, newLevel, newUnlocks } = addXP(p, result.xpGained);
  addCoins(updatedPlayer, result.coinsGained);

  result.newLevel = newLevel;
  result.newUnlocks = newUnlocks;

  const starEmojis = ['⭐', '⭐', '⭐'];
  const screen = container.querySelector('#battleScreen') as HTMLElement;
  screen.innerHTML = `
    <div class="result-screen">
      <div class="result-title">${state.monster.currentHp <= 0 ? '🎉 胜利！' : state.playerHp <= 0 ? '💔 失败' : '⏱️ 结束！'}</div>
      <div class="result-monster">${state.monster.emoji}</div>
      <div class="stars">
        ${starEmojis.map((s, i) => `<span class="star${i < result.stars ? ' active' : ''}" style="animation-delay:${i * 0.2}s">${s}</span>`).join('')}
      </div>
      <div class="result-stats card">
        <div class="stat-row"><span>答对题数</span><span>${result.questionsCorrect} / ${result.questionsTotal}</span></div>
        <div class="stat-row"><span>获得经验</span><span>+${result.xpGained} XP</span></div>
        <div class="stat-row"><span>获得金币</span><span>+${result.coinsGained} 🪙</span></div>
        ${newLevel ? `<div class="stat-row level-up"><span>🎊 升级了！</span><span>Lv.${newLevel}</span></div>` : ''}
        ${newUnlocks?.length ? `<div class="stat-row unlock"><span>🔓 解锁新岛屿！</span><span>${newUnlocks.join(', ')}</span></div>` : ''}
      </div>
      <div class="result-btns">
        <button class="btn btn-primary btn-lg" id="playAgainBtn">再来一次 🔄</button>
        <button class="btn btn-secondary" id="mapBtn">返回地图 🗺️</button>
      </div>
    </div>
  `;

  container.querySelector('#playAgainBtn')?.addEventListener('click', () => {
    clearTimer();
    mount(container, { islandId: state.islandId });
  });
  container.querySelector('#mapBtn')?.addEventListener('click', () => {
    clearTimer();
    navigate('map');
  });
}
