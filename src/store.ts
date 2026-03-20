import type { Player, WrongAnswer } from './types';

const STORAGE_KEY = 'mathgame_player';

const XP_PER_LEVEL = 100;

export const ISLANDS = [
  { id: 'addition', name: '加法海滩', emoji: '🏖️', type: 'addition' as const, requiredLevel: 1, color: '#FFB830', description: '10~100以内加法' },
  { id: 'subtraction', name: '减法森林', emoji: '🌲', type: 'subtraction' as const, requiredLevel: 2, color: '#6BCB77', description: '退位减法挑战' },
  { id: 'multiplication', name: '乘法峡谷', emoji: '⛰️', type: 'multiplication' as const, requiredLevel: 4, color: '#4A90D9', description: '乘法口诀大冒险' },
  { id: 'division', name: '除法洞穴', emoji: '🕳️', type: 'division' as const, requiredLevel: 6, color: '#9B59B6', description: '即将开放' },
  { id: 'geometry', name: '几何乐园', emoji: '🔷', type: 'geometry' as const, requiredLevel: 8, color: '#E74C3C', description: '即将开放' },
  { id: 'logic', name: '逻辑迷宫', emoji: '🧩', type: 'logic' as const, requiredLevel: 10, color: '#1ABC9C', description: '即将开放' },
];

function defaultPlayer(): Player {
  return {
    id: crypto.randomUUID(),
    nickname: '',
    avatar: '🦊',
    level: 1,
    xp: 0,
    coins: 0,
    unlockedIslands: ['addition'],
    wrongAnswers: [],
  };
}

export function loadPlayer(): Player | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Player;
  } catch {
    return null;
  }
}

export function savePlayer(player: Player): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
}

export function createPlayer(nickname: string, avatar: string): Player {
  const p = defaultPlayer();
  p.nickname = nickname;
  p.avatar = avatar;
  savePlayer(p);
  return p;
}

export function addXP(player: Player, xp: number): { player: Player; newLevel?: number; newUnlocks?: string[] } {
  player.xp += xp;
  const newUnlocks: string[] = [];
  let newLevel: number | undefined;

  const oldLevel = player.level;
  player.level = Math.floor(player.xp / XP_PER_LEVEL) + 1;

  if (player.level > oldLevel) {
    newLevel = player.level;
    // Check for new island unlocks
    for (const island of ISLANDS) {
      if (island.requiredLevel <= player.level && !player.unlockedIslands.includes(island.id)) {
        player.unlockedIslands.push(island.id);
        newUnlocks.push(island.id);
      }
    }
  }

  savePlayer(player);
  return { player, newLevel, newUnlocks: newUnlocks.length > 0 ? newUnlocks : undefined };
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

export function xpForNextLevel(player: Player): number {
  return player.level * XP_PER_LEVEL - player.xp;
}
