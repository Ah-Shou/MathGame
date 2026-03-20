import type { BattleState, BattleResult, Monster } from '../types';

const PLAYER_MAX_HP = 5;
const MONSTER_MAX_HP = 5;
const TIME_LIMIT_MS = 10000; // 10s per question
const TOTAL_QUESTIONS = 10;

export function createMonster(islandId: string, level: number): Monster {
  const monsters: Record<string, { name: string; emoji: string }> = {
    addition: { name: '沙滩螃蟹', emoji: '🦀' },
    subtraction: { name: '森林精灵', emoji: '🧝' },
    multiplication: { name: '峡谷巨龙', emoji: '🐉' },
    division: { name: '洞穴蝙蝠', emoji: '🦇' },
    geometry: { name: '几何魔方', emoji: '🎲' },
    logic: { name: '迷宫幽灵', emoji: '👻' },
  };
  const m = monsters[islandId] ?? { name: '神秘怪物', emoji: '👾' };
  return {
    name: m.name,
    emoji: m.emoji,
    maxHp: MONSTER_MAX_HP,
    currentHp: MONSTER_MAX_HP,
    level,
  };
}

export function createBattleState(islandId: string, playerLevel: number): BattleState {
  return {
    islandId,
    monster: createMonster(islandId, playerLevel),
    playerHp: PLAYER_MAX_HP,
    playerMaxHp: PLAYER_MAX_HP,
    currentQuestion: null,
    timeLeft: TIME_LIMIT_MS,
    timeLimit: TIME_LIMIT_MS,
    combo: 0,
    score: 0,
    questionsAnswered: 0,
    questionsCorrect: 0,
    startTime: Date.now(),
    totalTime: TOTAL_QUESTIONS * TIME_LIMIT_MS,
    timeUsed: 0,
    consecutiveWrong: 0,
    difficulty: 1,
  };
}

export function processCorrectAnswer(state: BattleState): { damage: number; isCombo: boolean } {
  state.questionsAnswered++;
  state.questionsCorrect++;
  state.consecutiveWrong = 0;
  state.combo++;

  const isCombo = state.combo > 0 && state.combo % 3 === 0;
  const damage = isCombo ? 2 : 1;

  state.monster.currentHp = Math.max(0, state.monster.currentHp - damage);
  state.score += isCombo ? 20 : 10;

  // Increase difficulty after 3 correct
  if (state.questionsCorrect % 3 === 0 && state.difficulty < 3) {
    state.difficulty++;
  }

  return { damage, isCombo };
}

export function processWrongAnswer(state: BattleState): void {
  state.questionsAnswered++;
  state.combo = 0;
  state.consecutiveWrong++;
  state.playerHp = Math.max(0, state.playerHp - 1);

  // Auto-reduce difficulty after 3 consecutive wrong
  if (state.consecutiveWrong >= 3 && state.difficulty > 1) {
    state.difficulty--;
    state.consecutiveWrong = 0;
  }
}

export function processTimeout(state: BattleState): void {
  state.questionsAnswered++;
  state.combo = 0;
  state.consecutiveWrong++;
  state.playerHp = Math.max(0, state.playerHp - 1);
}

export function isBattleOver(state: BattleState): boolean {
  return (
    state.playerHp <= 0 ||
    state.monster.currentHp <= 0 ||
    state.questionsAnswered >= TOTAL_QUESTIONS
  );
}

export function calculateResult(state: BattleState): BattleResult {
  const timeUsed = Date.now() - state.startTime;
  const timeRatio = timeUsed / state.totalTime;

  let stars = 1;
  if (state.playerHp >= state.playerMaxHp && timeRatio < 0.6) {
    stars = 3;
  } else if (state.playerHp >= 2) {
    stars = 2;
  }

  const xpGained = stars * 20 + state.questionsCorrect * 5;
  const coinsGained = stars * 10 + state.questionsCorrect * 2;

  return {
    stars,
    xpGained,
    coinsGained,
    questionsCorrect: state.questionsCorrect,
    questionsTotal: state.questionsAnswered,
  };
}
