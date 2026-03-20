import type { Question } from '../types';

type IslandType = 'addition' | 'subtraction' | 'multiplication';

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAddition(difficulty: number): Question {
  let a: number, b: number;
  if (difficulty === 1) {
    a = rand(1, 10); b = rand(1, 10);
  } else if (difficulty === 2) {
    a = rand(5, 20); b = rand(5, 20);
  } else {
    a = rand(10, 50); b = rand(10, 50);
  }
  return { text: `${a} + ${b} = ?`, answer: a + b, operands: [a, b], operator: '+', difficulty };
}

function generateSubtraction(difficulty: number): Question {
  let a: number, b: number;
  if (difficulty === 1) {
    b = rand(1, 9); a = rand(b, 10);
  } else if (difficulty === 2) {
    b = rand(5, 15); a = rand(b, 25);
  } else {
    b = rand(10, 40); a = rand(b, 80);
  }
  return { text: `${a} - ${b} = ?`, answer: a - b, operands: [a, b], operator: '-', difficulty };
}

function generateMultiplication(difficulty: number): Question {
  let a: number, b: number;
  if (difficulty === 1) {
    a = rand(2, 5); b = rand(2, 5);
  } else if (difficulty === 2) {
    a = rand(2, 9); b = rand(2, 9);
  } else {
    a = rand(3, 9); b = rand(3, 12);
  }
  return { text: `${a} × ${b} = ?`, answer: a * b, operands: [a, b], operator: '×', difficulty };
}

export function generateQuestion(islandType: string, difficulty: number): Question {
  const d = Math.max(1, Math.min(3, difficulty));
  switch (islandType as IslandType) {
    case 'addition': return generateAddition(d);
    case 'subtraction': return generateSubtraction(d);
    case 'multiplication': return generateMultiplication(d);
    default: return generateAddition(d);
  }
}
