import '../styles/map.css';
import { getAchievementList, getEquippedItem, getLoginStreak, ISLANDS, loadPlayer } from '../store';
import { navigate } from '../main';

export function mount(container: HTMLElement): void {
  const player = loadPlayer();
  if (!player) { navigate('home'); return; }

  const hat = getEquippedItem(player, 'hat');
  const pet = getEquippedItem(player, 'pet');
  const unlockedAchievements = getAchievementList(player).filter((achievement) => achievement.unlockedAt).length;

  container.innerHTML = `
    <div class="map-screen">
      <div class="map-header">
        <div class="player-info">
          <div class="player-avatar-stage">
            <span class="player-avatar-badge">${player.avatar}</span>
            ${hat ? `<span class="player-hat-badge">${hat.icon}</span>` : ''}
            ${pet ? `<span class="player-pet-badge">${pet.icon}</span>` : ''}
          </div>
          <div class="player-details">
            <div class="player-name-text">${player.nickname}</div>
            <div class="player-level-text">Lv.${player.level} · ${player.coins} 🪙</div>
            <div class="player-bonus-text">勋章 ${unlockedAchievements} 枚 · 连续登录 ${getLoginStreak(player)} 天</div>
          </div>
        </div>
        <div class="xp-bar-wrap">
          <div class="xp-bar">
            <div class="xp-fill" style="width:${xpPercent(player)}%"></div>
          </div>
          <span class="xp-text">${player.xp % 100} / 100 XP</span>
        </div>
      </div>

      <div class="map-title">
        <span class="map-title-emoji float">🗺️</span>
        <h2>选择冒险岛屿</h2>
      </div>

      <div class="islands-grid">
        ${ISLANDS.map(island => {
          const unlocked = player.unlockedIslands.includes(island.id);
          return `
            <div class="island-card${unlocked ? ' unlocked' : ' locked'}"
              data-island="${island.id}"
              style="--island-color: ${island.color}">
              <div class="island-emoji">${island.emoji}</div>
              <div class="island-name">${island.name}</div>
              <div class="island-desc">${island.description}</div>
              ${!unlocked ? `<div class="island-lock">🔒 Lv.${island.requiredLevel}</div>` : ''}
              ${unlocked ? `<button class="btn btn-primary island-btn" data-island="${island.id}">出发！</button>` : ''}
            </div>
          `;
        }).join('')}
      </div>

      <div class="map-footer">
        <button class="btn btn-primary" id="profileBtn">商店与我的</button>
        <button class="btn btn-secondary" id="changePlayerBtn">换个角色</button>
      </div>
    </div>
  `;

  container.querySelectorAll('.island-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const islandId = (e.currentTarget as HTMLElement).dataset['island']!;
      navigate('battle', { islandId });
    });
  });

  container.querySelector('#changePlayerBtn')?.addEventListener('click', () => {
    navigate('home');
  });
  container.querySelector('#profileBtn')?.addEventListener('click', () => {
    navigate('profile');
  });
}

function xpPercent(player: { xp: number; level: number }): number {
  return (player.xp % 100);
}
