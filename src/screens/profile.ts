import '../styles/profile.css';
import { navigate } from '../main';
import {
  ACHIEVEMENTS,
  SHOP_ITEMS,
  equipShopItem,
  evaluateAchievements,
  getAchievementList,
  getEquippedItem,
  getLoginStreak,
  loadPlayer,
  purchaseShopItem,
  touchLogin,
} from '../store';

let activeCategory: 'skin' | 'hat' | 'pet' = 'skin';

export function mount(container: HTMLElement): void {
  const player = loadPlayer();
  if (!player) {
    navigate('home');
    return;
  }

  touchLogin(player);
  evaluateAchievements(player);

  const achievements = getAchievementList(player);
  const unlockedCount = achievements.filter((achievement) => achievement.unlockedAt).length;
  const hat = getEquippedItem(player, 'hat');
  const pet = getEquippedItem(player, 'pet');
  const skin = getEquippedItem(player, 'skin');

  container.innerHTML = `
    <div class="profile-screen">
      <div class="profile-header">
        <button class="btn-back" id="backBtn">← 返回地图</button>
        <div class="profile-summary card">
          <div class="profile-avatar-stage">
            <span class="profile-avatar">${player.avatar}</span>
            ${hat ? `<span class="profile-hat">${hat.icon}</span>` : ''}
            ${pet ? `<span class="profile-pet">${pet.icon}</span>` : ''}
          </div>
          <div class="profile-main">
            <div class="profile-name">${player.nickname}</div>
            <div class="profile-meta">Lv.${player.level} · ${player.coins} 🪙</div>
            <div class="profile-tags">
              <span class="profile-tag">连续登录 ${getLoginStreak(player)} 天</span>
              <span class="profile-tag">连对 ${player.currentCorrectStreak} 题</span>
              <span class="profile-tag">总答对 ${player.totalCorrect} 题</span>
            </div>
          </div>
        </div>
      </div>

      <section class="card profile-section">
        <div class="section-head">
          <div>
            <h2>成就勋章</h2>
            <p>已解锁 ${unlockedCount} / ${ACHIEVEMENTS.length}</p>
          </div>
        </div>
        <div class="achievement-grid">
          ${achievements.map((achievement) => `
            <div class="achievement-card${achievement.unlockedAt ? ' unlocked' : ' locked'}">
              <div class="achievement-icon">${achievement.icon}</div>
              <div class="achievement-name">${achievement.name}</div>
              <div class="achievement-desc">${achievement.desc}</div>
              <div class="achievement-status">${achievement.unlockedAt ? '已获得' : '未达成'}</div>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="card profile-section">
        <div class="section-head">
          <div>
            <h2>装扮商店</h2>
            <p>用金币解锁皮肤、帽子和宠物</p>
          </div>
          <div class="preview-line">
            <span>当前皮肤 ${skin?.icon ?? '🧮'}</span>
            <span>帽子 ${hat?.icon ?? '无'}</span>
            <span>宠物 ${pet?.icon ?? '无'}</span>
          </div>
        </div>

        <div class="shop-tabs">
          ${(['skin', 'hat', 'pet'] as const).map((category) => `
            <button class="shop-tab${activeCategory === category ? ' active' : ''}" data-category="${category}" type="button">
              ${categoryLabel(category)}
            </button>
          `).join('')}
        </div>

        <div class="shop-grid">
          ${SHOP_ITEMS.filter((item) => item.category === activeCategory).map((item) => {
            const owned = player.ownedItems.includes(item.id);
            const equipped = (
              (item.category === 'skin' && player.equippedSkin === item.id) ||
              (item.category === 'hat' && player.equippedHat === item.id) ||
              (item.category === 'pet' && player.equippedPet === item.id)
            );

            return `
              <div class="shop-card${equipped ? ' equipped' : ''}">
                <div class="shop-icon">${item.icon}</div>
                <div class="shop-name">${item.name}</div>
                <div class="shop-price">${item.price} 🪙</div>
                <button
                  class="btn ${owned ? 'btn-secondary' : 'btn-primary'} shop-action"
                  data-item="${item.id}"
                  data-action="${owned ? 'equip' : 'buy'}"
                  type="button"
                  ${equipped ? 'disabled' : ''}
                >
                  ${equipped ? '已装备' : owned ? '装备' : '购买'}
                </button>
              </div>
            `;
          }).join('')}
        </div>
        <div class="shop-message" id="shopMessage"></div>
      </section>
    </div>
  `;

  container.querySelector('#backBtn')?.addEventListener('click', () => navigate('map'));

  container.querySelectorAll('.shop-tab').forEach((button) => {
    button.addEventListener('click', (event) => {
      activeCategory = (event.currentTarget as HTMLButtonElement).dataset['category'] as 'skin' | 'hat' | 'pet';
      mount(container);
    });
  });

  container.querySelectorAll('.shop-action').forEach((button) => {
    button.addEventListener('click', (event) => {
      const target = event.currentTarget as HTMLButtonElement;
      const itemId = target.dataset['item'];
      const action = target.dataset['action'];
      if (!itemId || !action) return;

      const currentPlayer = loadPlayer();
      if (!currentPlayer) return;

      const result = action === 'buy'
        ? purchaseShopItem(currentPlayer, itemId)
        : equipShopItem(currentPlayer, itemId);

      evaluateAchievements(currentPlayer);
      mount(container);

      const messageEl = container.querySelector('#shopMessage');
      if (messageEl) {
        messageEl.textContent = result.message;
        messageEl.classList.toggle('error', !result.ok);
      }
    });
  });
}

function categoryLabel(category: 'skin' | 'hat' | 'pet'): string {
  if (category === 'skin') return '计算器皮肤';
  if (category === 'hat') return '帽子';
  return '宠物';
}
