import { createPlayer, loadPlayer, savePlayer } from '../store';
import { navigate } from '../main';

const AVATARS = ['🦊', '🐼', '🐸', '🦁', '🐯', '🐨', '🐻', '🐰', '🐮', '🐷', '🦄', '🐙'];

export function mount(container: HTMLElement): void {
  const existing = loadPlayer();
  const defaultNickname = existing?.nickname ?? '';
  const defaultAvatar = existing?.avatar ?? AVATARS[0];

  container.innerHTML = `
    <div class="home-screen">
      <div class="home-hero">
        <div class="home-title-emoji float">🌟</div>
        <h1 class="home-title">小小数学探险家</h1>
        <p class="home-subtitle">开始你的数学冒险之旅！</p>
      </div>

      <div class="home-form card">
        <div class="form-section">
          <label class="form-label">选择你的头像</label>
          <div class="avatar-grid" id="avatarGrid">
            ${AVATARS.map(a => `
              <button class="avatar-btn${a === defaultAvatar ? ' selected' : ''}" data-avatar="${a}" type="button">${a}</button>
            `).join('')}
          </div>
        </div>

        <div class="form-section">
          <label class="form-label" for="nicknameInput">你的昵称</label>
          <input
            id="nicknameInput"
            class="input"
            type="text"
            placeholder="输入昵称（2-8个字）"
            maxlength="8"
            value="${defaultNickname}"
          />
        </div>

        <button class="btn btn-primary btn-lg start-btn" id="startBtn" type="button">
          出发冒险！🚀
        </button>
      </div>
    </div>
  `;

  // Inject home styles
  injectStyles();

  let selectedAvatar = defaultAvatar;

  const grid = container.querySelector('#avatarGrid')!;
  grid.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.avatar-btn') as HTMLButtonElement | null;
    if (!btn) return;
    selectedAvatar = btn.dataset['avatar']!;
    grid.querySelectorAll('.avatar-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });

  const startBtn = container.querySelector('#startBtn') as HTMLButtonElement;
  const nicknameInput = container.querySelector('#nicknameInput') as HTMLInputElement;

  startBtn.addEventListener('click', () => {
    const nickname = nicknameInput.value.trim();
    if (nickname.length < 2) {
      nicknameInput.classList.add('shake');
      nicknameInput.focus();
      setTimeout(() => nicknameInput.classList.remove('shake'), 400);
      return;
    }

    const existing = loadPlayer();
    if (existing) {
      existing.nickname = nickname;
      existing.avatar = selectedAvatar;
      savePlayer(existing);
    } else {
      createPlayer(nickname, selectedAvatar);
    }

    navigate('map');
  });
}

function injectStyles(): void {
  if (document.getElementById('home-styles')) return;
  const style = document.createElement('style');
  style.id = 'home-styles';
  style.textContent = `
    .home-screen {
      padding: 32px 20px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .home-hero {
      text-align: center;
      padding: 16px 0;
    }
    .home-title-emoji {
      font-size: 3.5rem;
      display: block;
      margin-bottom: 8px;
    }
    .home-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--color-text);
      margin-bottom: 8px;
    }
    .home-subtitle {
      color: var(--color-text-light);
      font-size: 1rem;
    }
    .home-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .form-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .form-label {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--color-text);
    }
    .avatar-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 8px;
    }
    .avatar-btn {
      aspect-ratio: 1;
      font-size: 1.6rem;
      border: 3px solid transparent;
      border-radius: 12px;
      background: #f5f0e8;
      cursor: pointer;
      transition: border-color 0.15s, transform 0.1s, background 0.15s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar-btn:hover {
      background: #ffe8b0;
      transform: scale(1.1);
    }
    .avatar-btn.selected {
      border-color: var(--color-primary);
      background: #fff3d0;
      transform: scale(1.1);
    }
    .start-btn {
      width: 100%;
      margin-top: 4px;
    }
  `;
  document.head.appendChild(style);
}
