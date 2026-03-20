// Shared types for the math game

export interface Player {
  id: string;
  nickname: string;
  avatar: string; // emoji
  level: number;
  xp: number;
  coins: number;
  unlockedIslands: string[];
  wrongAnswers: WrongAnswer[];
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
}

export interface BattleResult {
  stars: number; // 1-3
  xpGained: number;
  coinsGained: number;
  questionsCorrect: number;
  questionsTotal: number;
  newLevel?: number;
  newUnlocks?: string[];
}

export type ScreenName = 'home' | 'map' | 'battle';

export interface NavigateParams {
  islandId?: string;
}
