import type { Player, WrongAnswer, Achievement, ShopItem } from './types';

const STORAGE_KEY = 'mathgame_player';
const XP_PER_LEVEL = 100;
const MAX_LOGIN_DAYS = 30;

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_win', name: '初出茅庐', desc: '完成第一场战斗', icon: '🎖️' },
  { id: 'combo_master', name: '连击达人', desc: '单场触发一次连击', icon: '🔥' },
  { id: 'perfect_battle', name: '完美战斗', desc: '满血通关一场战斗', icon: '💎' },
  { id: 'mental_math', name: '心算小能手', desc: '连续答对 30 题', icon: '🧠' },
  { id: 'century', name: '百题勇士', desc: '累计答对 100 题', icon: '🏅' },
  { id: 'all_islands', name: '探险家', desc: '解锁全部 6 个岛屿', icon: '🗺️' },
  { id: 'login_3', name: '坚持不懈', desc: '连续登录 3 天', icon: '📅' },
  { id: 'login_7', name: '持之以恒', desc: '连续登录 7 天', icon: '🌟' },
  { id: 'rich', name: '小富翁', desc: '金币累计达到 200 枚', icon: '🪙' },
  { id: 'level_5', name: '冒险老手', desc: '达到 5 级', icon: '⚔️' },
];

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'skin_sunset', name: '晚霞算盘', icon: '🌇', price: 40, category: 'skin' },
  { id: 'skin_ocean', name: '海洋蓝盘', icon: '🌊', price: 70, category: 'skin' },
  { id: 'skin_forest', name: '森林木盘', icon: '🌿', price: 90, category: 'skin' },
  { id: 'hat_party', name: '派对帽', icon: '🎉', price: 30, category: 'hat' },
  { id: 'hat_crown', name: '皇冠', icon: '👑', price: 50, category: 'hat' },
  { id: 'hat_cowboy', name: '牛仔帽', icon: '🤠', price: 60, category: 'hat' },
  { id: 'hat_wizard', name: '魔法帽', icon: '🎩', price: 80, category: 'hat' },
  { id: 'pet_cat', name: '小猫咪', icon: '🐱', price: 100, category: 'pet' },
  { id: 'pet_dog', name: '小狗狗', icon: '🐶', price: 100, category: 'pet' },
  { id: 'pet_dragon', name: '迷你龙', icon: '🐲', price: 200, category: 'pet' },
  { id: 'pet_unicorn', name: '独角兽', icon: '🦄', price: 300, category: 'pet' },
];

export const ISLANDS = [
  { id: 'addition', name: '加法海滩', emoji: '🏖️', type: 'addition' as const, requiredLevel: 1, color: '#FFB830', description: '10~100以内加法' },
  { id: 'subtraction', name: '减法森林', emoji: '🌲', type: 'subtraction' as const, requiredLevel: 2, color: '#6BCB77', description: '退位减法挑战' },
  { id: 'multiplication', name: '乘法峡谷', emoji: '⛰️', type: 'multiplication' as const, requiredLevel: 4, color: '#4A90D9', description: '乘法口诀大冒险' },
  { id: 'division', name: '除法洞穴', emoji: '🕳️', type: 'division' as const, requiredLevel: 6, color: '#9B59B6', description: '表内除法大挑战' },
  { id: 'geometry', name: '几何乐园', emoji: '🔷', type: 'geometry' as const, requiredLevel: 8, color: '#E74C3C', description: '周长与面积计算' },
  { id: 'logic', name: '逻辑迷宫', emoji: '🧩', type: 'logic' as const, requiredLevel: 10, color: '#1ABC9C', description: '找规律填数字' },
];

function createDefaultPlayer(): Player {
  return {
    id: crypto.randomUUID(),
    nickname: '',
    avatar: '🦊',
    level: 1,
    xp: 0,
    coins: 0,
    unlockedIslands: ['addition'],
    wrongAnswers: [],
    achievements: {},
    ownedItems: [],
    equippedHat: '',
    equippedPet: '',
    equippedSkin: '',
    totalCorrect: 0,
    currentCorrectStreak: 0,
    loginDates: [],
  };
}

function normalizePlayer(raw: unknown): Player {
  const base = createDefaultPlayer();
  const candidate = typeof raw === 'object' && raw ? raw as Partial<Player> : {};

  return {
    ...base,
    ...candidate,
    unlockedIslands: Array.isArray(candidate.unlockedIslands) && candidate.unlockedIslands.length
      ? [...new Set(candidate.unlockedIslands)]
      : base.unlockedIslands,
    wrongAnswers: Array.isArray(candidate.wrongAnswers) ? candidate.wrongAnswers : [],
    achievements: candidate.achievements && typeof candidate.achievements === 'object' ? candidate.achievements : {},
    ownedItems: Array.isArray(candidate.ownedItems) ? [...new Set(candidate.ownedItems)] : [],
    equippedHat: typeof candidate.equippedHat === 'string' ? candidate.equippedHat : '',
    equippedPet: typeof candidate.equippedPet === 'string' ? candidate.equippedPet : '',
    equippedSkin: typeof candidate.equippedSkin === 'string' ? candidate.equippedSkin : '',
    totalCorrect: typeof candidate.totalCorrect === 'number' ? candidate.totalCorrect : 0,
    currentCorrectStreak: typeof candidate.currentCorrectStreak === 'number' ? candidate.currentCorrectStreak : 0,
    loginDates: sanitizeLoginDates(candidate.loginDates),
  };
}

function sanitizeLoginDates(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  return [...new Set(input.filter((value): value is string => typeof value === 'string'))]
    .sort()
    .slice(-MAX_LOGIN_DAYS);
}

function todayKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function shiftDateKey(dateKey: string, days: number): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  const nextYear = date.getFullYear();
  const nextMonth = String(date.getMonth() + 1).padStart(2, '0');
  const nextDay = String(date.getDate()).padStart(2, '0');
  return `${nextYear}-${nextMonth}-${nextDay}`;
}

export function loadPlayer(): Player | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const player = normalizePlayer(JSON.parse(raw));
    savePlayer(player);
    return player;
  } catch {
    return null;
  }
}

export function savePlayer(player: Player): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
}

export function createPlayer(nickname: string, avatar: string): Player {
  const player = createDefaultPlayer();
  player.nickname = nickname;
  player.avatar = avatar;
  touchLogin(player);
  savePlayer(player);
  return player;
}

export function touchLogin(player: Player): { player: Player; streak: number; isNewDay: boolean } {
  const today = todayKey();
  const exists = player.loginDates.includes(today);
  if (!exists) {
    player.loginDates = [...player.loginDates, today].sort().slice(-MAX_LOGIN_DAYS);
    savePlayer(player);
  }
  return { player, streak: getLoginStreak(player), isNewDay: !exists };
}

export function getLoginStreak(player: Player): number {
  const dates = sanitizeLoginDates(player.loginDates);
  if (!dates.length) return 0;

  let streak = 1;
  for (let index = dates.length - 1; index > 0; index--) {
    if (dates[index - 1] === shiftDateKey(dates[index], -1)) {
      streak++;
      continue;
    }
    break;
  }
  return streak;
}

export function addXP(player: Player, xp: number): { player: Player; newLevel?: number; newUnlocks?: string[] } {
  player.xp += xp;
  const newUnlocks: string[] = [];
  let newLevel: number | undefined;

  const oldLevel = player.level;
  player.level = Math.floor(player.xp / XP_PER_LEVEL) + 1;

  if (player.level > oldLevel) {
    newLevel = player.level;
  }

  for (const island of ISLANDS) {
    if (island.requiredLevel <= player.level && !player.unlockedIslands.includes(island.id)) {
      player.unlockedIslands.push(island.id);
      newUnlocks.push(island.id);
    }
  }

  savePlayer(player);
  return { player, newLevel, newUnlocks: newUnlocks.length ? newUnlocks : undefined };
}

export function addCoins(player: Player, coins: number): Player {
  player.coins += coins;
  savePlayer(player);
  return player;
}

export function addWrongAnswer(player: Player, question: string, correctAnswer: number): Player {
  const entry: WrongAnswer = { question, correctAnswer, timestamp: Date.now() };
  player.wrongAnswers = [entry, ...player.wrongAnswers].slice(0, 10);
  savePlayer(player);
  return player;
}

export function recordCorrectAnswer(player: Player): Player {
  player.totalCorrect += 1;
  player.currentCorrectStreak += 1;
  savePlayer(player);
  return player;
}

export function resetCorrectStreak(player: Player): Player {
  player.currentCorrectStreak = 0;
  savePlayer(player);
  return player;
}

export function xpForNextLevel(player: Player): number {
  return player.level * XP_PER_LEVEL - player.xp;
}

export function getAchievementList(player: Player): Achievement[] {
  return ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    unlockedAt: player.achievements[achievement.id],
  }));
}

export function evaluateAchievements(
  player: Player,
  context: { battleWon?: boolean; hadCombo?: boolean; perfectBattle?: boolean } = {},
): Achievement[] {
  const unlocked: Achievement[] = [];

  const unlock = (id: string): void => {
    if (player.achievements[id]) return;
    const found = ACHIEVEMENTS.find((achievement) => achievement.id === id);
    if (!found) return;
    player.achievements[id] = Date.now();
    unlocked.push({ ...found, unlockedAt: player.achievements[id] });
  };

  if (context.battleWon) unlock('first_win');
  if (context.hadCombo) unlock('combo_master');
  if (context.perfectBattle) unlock('perfect_battle');
  if (player.currentCorrectStreak >= 30) unlock('mental_math');
  if (player.totalCorrect >= 100) unlock('century');
  if (player.unlockedIslands.length >= ISLANDS.length) unlock('all_islands');

  const streak = getLoginStreak(player);
  if (streak >= 3) unlock('login_3');
  if (streak >= 7) unlock('login_7');

  if (player.coins >= 200) unlock('rich');
  if (player.level >= 5) unlock('level_5');

  if (unlocked.length) savePlayer(player);
  return unlocked;
}

export function getShopItem(itemId: string): ShopItem | undefined {
  return SHOP_ITEMS.find((item) => item.id === itemId);
}

export function purchaseShopItem(player: Player, itemId: string): { ok: boolean; message: string; player: Player } {
  const item = getShopItem(itemId);
  if (!item) return { ok: false, message: '道具不存在。', player };
  if (player.ownedItems.includes(itemId)) return { ok: false, message: '这个道具已经拥有了。', player };
  if (player.coins < item.price) return { ok: false, message: '金币不够，继续挑战赚金币吧。', player };

  player.coins -= item.price;
  player.ownedItems.push(itemId);
  savePlayer(player);
  return { ok: true, message: `已购买 ${item.name}。`, player };
}

export function equipShopItem(player: Player, itemId: string): { ok: boolean; message: string; player: Player } {
  const item = getShopItem(itemId);
  if (!item) return { ok: false, message: '道具不存在。', player };
  if (!player.ownedItems.includes(itemId)) return { ok: false, message: '请先购买这个道具。', player };

  if (item.category === 'hat') player.equippedHat = itemId;
  if (item.category === 'pet') player.equippedPet = itemId;
  if (item.category === 'skin') player.equippedSkin = itemId;

  savePlayer(player);
  return { ok: true, message: `已装备 ${item.name}。`, player };
}

export function getEquippedItem(player: Player, category: ShopItem['category']): ShopItem | undefined {
  const itemId = category === 'hat'
    ? player.equippedHat
    : category === 'pet'
      ? player.equippedPet
      : player.equippedSkin;
  return itemId ? getShopItem(itemId) : undefined;
}
