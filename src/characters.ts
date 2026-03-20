export type CharacterId = 'fox' | 'panda' | 'tiger' | 'rabbit';
export type CharacterMood = 'idle' | 'attack' | 'hurt' | 'win' | 'lose' | 'shop';
export type CharacterSize = 'sm' | 'md' | 'lg' | 'xl';

interface CharacterConfig {
  id: CharacterId;
  name: string;
  title: string;
  emoji: string;
  accent: string;
}

const CHARACTERS: CharacterConfig[] = [
  { id: 'fox', name: '小狐狸', title: '灵巧冲刺型', emoji: '🦊', accent: '#ff9a62' },
  { id: 'panda', name: '小熊猫', title: '稳稳守护型', emoji: '🐼', accent: '#2f3f51' },
  { id: 'tiger', name: '小老虎', title: '勇猛爆发型', emoji: '🐯', accent: '#ffb347' },
  { id: 'rabbit', name: '小兔子', title: '跳跳快攻型', emoji: '🐰', accent: '#f6a7cc' },
];

const LEGACY_AVATAR_MAP: Record<string, CharacterId> = {
  '🦊': 'fox',
  '🐼': 'panda',
  '🦁': 'tiger',
  '🐯': 'tiger',
  '🐰': 'rabbit',
  '🐸': 'rabbit',
  '🐨': 'panda',
  '🐻': 'panda',
  '🐮': 'tiger',
  '🐷': 'rabbit',
  '🦄': 'rabbit',
  '🐙': 'fox',
};

export function getCharacterOptions(): CharacterConfig[] {
  return CHARACTERS;
}

export function normalizeCharacterId(value: string): CharacterId {
  const matched = CHARACTERS.find((character) => character.id === value);
  if (matched) return matched.id;
  return LEGACY_AVATAR_MAP[value] ?? 'fox';
}

export function getCharacter(characterId: string): CharacterConfig {
  const id = normalizeCharacterId(characterId);
  return CHARACTERS.find((character) => character.id === id) ?? CHARACTERS[0];
}

export function renderCharacter(
  characterId: string,
  options: {
    mood?: CharacterMood;
    size?: CharacterSize;
    hatIcon?: string;
    hatId?: string;
    petIcon?: string;
    showPet?: boolean;
  } = {},
): string {
  const character = getCharacter(characterId);
  const mood = options.mood ?? 'idle';
  const size = options.size ?? 'md';
  const hat = options.hatIcon ?? '';
  const hatId = options.hatId ?? '';
  const pet = options.showPet === false ? '' : options.petIcon ?? '';

  return `
    <div class="animal animal-${character.id} animal-${size} mood-${mood}" data-character="${character.id}" style="--animal-accent:${character.accent}">
      <div class="animal-shadow"></div>
      <div class="animal-tail"></div>
      <div class="animal-body">
        <div class="animal-ear animal-ear-left"></div>
        <div class="animal-ear animal-ear-right"></div>
        <div class="animal-head">
          <div class="animal-face-mark"></div>
          <div class="animal-eye animal-eye-left"></div>
          <div class="animal-eye animal-eye-right"></div>
          <div class="animal-blush animal-blush-left"></div>
          <div class="animal-blush animal-blush-right"></div>
          <div class="animal-nose"></div>
          <div class="animal-mouth"></div>
        </div>
        <div class="animal-belly"></div>
        <div class="animal-paw animal-paw-left"></div>
        <div class="animal-paw animal-paw-right"></div>
        <div class="animal-foot animal-foot-left"></div>
        <div class="animal-foot animal-foot-right"></div>
        ${hat ? `<div class="animal-hat" data-hat="${hatId}">${hat}</div>` : ''}
      </div>
      ${pet ? `<div class="animal-pet">${pet}</div>` : ''}
    </div>
  `;
}
