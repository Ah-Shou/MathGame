import type { Question } from '../types';

type IslandType = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'geometry' | 'logic';

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

function generateDivision(difficulty: number): Question {
  let divisor: number, quotient: number;
  if (difficulty === 1) {
    divisor = rand(2, 5); quotient = rand(1, 5);
  } else if (difficulty === 2) {
    divisor = rand(2, 9); quotient = rand(1, 9);
  } else {
    divisor = rand(3, 9); quotient = rand(2, 12);
  }
  const dividend = divisor * quotient;
  return { text: `${dividend} ÷ ${divisor} = ?`, answer: quotient, operands: [dividend, divisor], operator: '÷', difficulty };
}

// Geometry: perimeter and area of rectangles/squares
function generateGeometry(difficulty: number): Question {
  const shapes = difficulty === 1
    ? generateSquarePerimeter()
    : difficulty === 2
    ? (Math.random() < 0.5 ? generateRectPerimeter() : generateSquareArea())
    : (Math.random() < 0.5 ? generateRectArea() : generateRectPerimeter());
  return shapes;
}

function generateSquarePerimeter(): Question {
  const side = rand(2, 9);
  const answer = side * 4;
  return { text: `正方形边长${side}，周长=?`, answer, operands: [side, 4], operator: '?', difficulty: 1 };
}

function generateRectPerimeter(): Question {
  const w = rand(3, 12), h = rand(2, 8);
  const answer = (w + h) * 2;
  return { text: `长方形长${w}宽${h}，周长=?`, answer, operands: [w, h], operator: '?', difficulty: 2 };
}

function generateSquareArea(): Question {
  const side = rand(2, 9);
  const answer = side * side;
  return { text: `正方形边长${side}，面积=?`, answer, operands: [side, side], operator: '?', difficulty: 2 };
}

function generateRectArea(): Question {
  const w = rand(3, 12), h = rand(2, 9);
  const answer = w * h;
  return { text: `长方形长${w}宽${h}，面积=?`, answer, operands: [w, h], operator: '?', difficulty: 3 };
}

// Logic: number sequences with a missing term
function generateLogic(difficulty: number): Question {
  if (difficulty === 1) return generateArithSeq(2, 5, 4);
  if (difficulty === 2) return generateArithSeq(3, 10, 5);
  return generateArithSeq(5, 20, 6);
}

function generateArithSeq(minStep: number, maxStep: number, length: number): Question {
  const step = rand(minStep, maxStep);
  const start = rand(1, 10);
  const seq = Array.from({ length }, (_, i) => start + i * step);
  // Pick a random position (not first) to blank out
  const blankIdx = rand(1, length - 1);
  const answer = seq[blankIdx];
  const display = seq.map((v, i) => i === blankIdx ? '?' : String(v)).join(', ');
  return { text: `${display}`, answer, operands: [start, step], operator: '?', difficulty: 1 };
}

export function generateQuestion(islandType: string, difficulty: number): Question {
  const d = Math.max(1, Math.min(3, difficulty));
  switch (islandType as IslandType) {
    case 'addition': return generateAddition(d);
    case 'subtraction': return generateSubtraction(d);
    case 'multiplication': return generateMultiplication(d);
    case 'division': return generateDivision(d);
    case 'geometry': return generateGeometry(d);
    case 'logic': return generateLogic(d);
    default: return generateAddition(d);
  }
}
