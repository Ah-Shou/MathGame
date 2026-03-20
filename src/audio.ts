let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', gain = 0.3): void {
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const gainNode = ac.createGain();
    osc.connect(gainNode);
    gainNode.connect(ac.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ac.currentTime);
    gainNode.gain.setValueAtTime(gain, ac.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + duration);
  } catch {
    // Audio not available
  }
}

export function playCorrect(): void {
  playTone(523, 0.1); // C5
  setTimeout(() => playTone(659, 0.1), 80); // E5
  setTimeout(() => playTone(784, 0.2), 160); // G5
}

export function playWrong(): void {
  playTone(200, 0.15, 'sawtooth', 0.2);
  setTimeout(() => playTone(150, 0.2, 'sawtooth', 0.15), 120);
}

export function playCombo(): void {
  playTone(523, 0.08);
  setTimeout(() => playTone(659, 0.08), 60);
  setTimeout(() => playTone(784, 0.08), 120);
  setTimeout(() => playTone(1047, 0.25), 180);
}

export function playVictory(): void {
  const notes = [523, 659, 784, 1047];
  notes.forEach((f, i) => setTimeout(() => playTone(f, 0.15), i * 100));
}

export function playDefeat(): void {
  playTone(300, 0.2, 'sawtooth', 0.2);
  setTimeout(() => playTone(250, 0.2, 'sawtooth', 0.15), 200);
  setTimeout(() => playTone(200, 0.4, 'sawtooth', 0.1), 400);
}

export function resumeAudio(): void {
  if (ctx?.state === 'suspended') ctx.resume();
}
