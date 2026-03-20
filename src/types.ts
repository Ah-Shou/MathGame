// Shared types for the math game

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  icon: string;
  unlockedAt?: number; // timestamp
}

export interface ShopItem {
  id: string;
  name: string;
  icon: string;
  price: number;
  category: 'hat' | 'pet' | 'skin';
}

export interface Player {
  id: string;
  nickname: string;
  avatar: string; // emoji
  level: number;
  xp: number;
  coins: number;
  unlockedIslands: string[];
  wrongAnswers: WrongAnswer[];
  achievements: Record<string, number>; // id -> unlockedAt timestamp
  ownedItems: string[];       // shop item ids
  equippedHat: string;        // item id or ''
  equippedPet: string;        // item id or ''
  equippedSkin: string;       // item id or ''
  totalCorrect: number;       // cumulative correct answers
  currentCorrectStreak: number;
  loginDates: string[];       // 'YYYY-MM-DD' strings, last 30 days
}

export interface WrongAnswer {
  question: string;
  correctAnswer: number;
  timestamp: number;
}

export interface Island {
  id: string;
  name: string;
  emoji: string;
  type: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'geometry' | 'logic';
  requiredLevel: number;
  color: string;
  description: string;
}

export interface Monster {
  name: string;
  emoji: string;
  maxHp: number;
  currentHp: number;
  level: number;
}

export interface Question {
  text: string;
  answer: number;
  operands: [number, number];
  operator: '+' | '-' | '×' | '÷' | '?';
  difficulty: number; // 1-3
}

export interface BattleState {
  islandId: string;
  monster: Monster;
  playerHp: number;
  playerMaxHp: number;
  currentQuestion: Question | null;
  timeLeft: number; // ms
  timeLimit: number; // ms per question
  combo: number;
  score: number;
  questionsAnswered: number;
  questionsCorrect: number;
  startTime: number;
  totalTime: number; // ms for whole battle
  timeUsed: number; // ms used so far
  consecutiveWrong: number;
  difficulty: number; // 1-3, auto-adjusts
  hadCombo: boolean;
}

export interface BattleResult {
  stars: number; // 1-3
  xpGained: number;
  coinsGained: number;
  questionsCorrect: number;
  questionsTotal: number;
  newLevel?: number;
  newUnlocks?: string[];
  newAchievements?: Achievement[];
}

export type ScreenName = 'home' | 'map' | 'battle' | 'profile';

export interface NavigateParams {
  islandId?: string;
}
