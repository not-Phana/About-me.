import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

/* ============================================================
   PK Khmer Type — Real Interactive Keyboard & 3D Kinematic Hands
   Ported directly from E:\Code\khmer keyboard\keyboard\idk\js\keyboard.js
   Supports:
   1. Khmer NiDA Keyboard (Official Microsoft Windows Khmer Layout)
   2. English (US QWERTY)
   3. Khmer Standard Keyboard Layout
   ============================================================ */

const KEY = (id, base, ctrl, altgr, shift) => ({
  id,
  base,
  ctrl,
  altgr,
  shift,
  kind: 'glyph',
});

/* ---------- Khmer NiDA layout data (Official Microsoft Windows Khmer NiDA mapping) ---------- */
const ROW1_NIDA = [
  KEY('grave', '«', '', '\u200D', '»'),
  KEY('k1', '១', '', '\u200C', '!'),
  KEY('k2', '២', '', '@', 'ៗ'),
  KEY('k3', '៣', '', '៑', '"'),
  KEY('k4', '៤', '', '$', '៛'),
  KEY('k5', '៥', '', '€', '%'),
  KEY('k6', '៦', '', '៙', '៍'),
  KEY('k7', '៧', '', '៚', '័'),
  KEY('k8', '៨', '', '*', '៏'),
  KEY('k9', '៩', '', '{', '('),
  KEY('k0', '០', '', '}', ')'),
  KEY('minus', 'ឥ', '', '×', '៌'),
  KEY('equal', 'ឲ', '', '៎', '='),
  { id: 'backspace', kind: 'mod', label: 'Backsp.', wide: 2 },
];

const ROW2_NIDA = [
  { id: 'tab', kind: 'mod', label: 'Tab', wide: 1.5 },
  KEY('q', 'ឆ', '', '', 'ឈ'),
  KEY('w', 'ឹ', '', '', 'ឺ'),
  KEY('e', 'េ', '', 'ឯ', 'ែ'),
  KEY('r', 'រ', '', 'ឫ', 'ឬ'),
  KEY('t', 'ត', '', '', 'ទ'),
  KEY('y', 'យ', '', '', 'ួ'),
  KEY('u', 'ុ', '', '', 'ូ'),
  KEY('i', 'ិ', '', 'ឦ', 'ី'),
  KEY('o', 'ោ', '', 'ឱ', 'ៅ'),
  KEY('p', 'ផ', '', 'ឰ', 'ភ'),
  KEY('bracketL', 'ៀ', '', 'ឩ', 'ឿ'),
  KEY('bracketR', 'ឪ', '', 'ឳ', 'ឧ'),
  { ...KEY('backslash', 'ឮ', '', '\\', 'ឭ'), wide: 1.5 },
];

const ROW3_NIDA = [
  { id: 'caps', kind: 'mod', label: 'Caps', wide: 1.75 },
  KEY('a', 'ា', '', '', 'ាំ'),
  KEY('s', 'ស', '', '', 'ៃ'),
  KEY('d', 'ដ', '', '', 'ឌ'),
  KEY('f', 'ថ', '', '', 'ធ'),
  KEY('g', 'ង', '', '', 'អ'),
  KEY('h', 'ហ', '', '', 'ះ'),
  KEY('j', '្', '', '', 'ញ'),
  KEY('k', 'ក', '', '', 'គ'),
  KEY('l', 'ល', '', '', 'ឡ'),
  KEY('semicolon', 'ើ', '', '៖', 'ោះ'),
  KEY('quote', '់', '', 'ៈ', '៉'),
  { id: 'enter', kind: 'mod', label: 'Enter', wide: 2.25 },
];

const ROW4_NIDA = [
  { id: 'shiftL', kind: 'mod', label: 'Shift', cls: 'key-shift', wide: 2.25 },
  KEY('z', 'ឋ', '', '', 'ឍ'),
  KEY('x', 'ខ', '', '', 'ឃ'),
  KEY('c', 'ច', '', '', 'ជ'),
  KEY('v', 'វ', '', '', 'េះ'),
  KEY('b', 'ប', '', '', 'ព'),
  KEY('n', 'ន', '', '', 'ណ'),
  KEY('m', 'ម', '', '', 'ំ'),
  KEY('comma', 'ុំ', '', ',', 'ុះ'),
  KEY('period', '។', '', '.', '៕'),
  KEY('slash', '៊', '', '/', '?'),
  KEY('extra', '', '', '', ''),
  { id: 'shiftR', kind: 'mod', label: 'Shift', cls: 'key-shift', wide: 1.75 },
];

const ROW5_NIDA = [
  { id: 'ctrlL', kind: 'mod', label: 'Ctrl', cls: 'key-ctrl', wide: 1.5 },
  { id: 'alt', kind: 'mod', label: 'Alt', wide: 1.5 },
  { id: 'space', kind: 'mod', label: '', cls: 'space', wide: 9 },
  { id: 'altgr', kind: 'mod', label: 'AltGr', cls: 'key-altgr', wide: 1.5 },
  { id: 'ctrlR', kind: 'mod', label: 'Ctrl', cls: 'key-ctrl', wide: 1.5 },
];

/* ---------- English (US QWERTY) layout data ---------- */
const ROW1_EN = [
  KEY('grave', '`', '', '', '~'),
  KEY('k1', '1', '', '', '!'),
  KEY('k2', '2', '', '', '@'),
  KEY('k3', '3', '', '', '#'),
  KEY('k4', '4', '', '', '$'),
  KEY('k5', '5', '', '', '%'),
  KEY('k6', '6', '', '', '^'),
  KEY('k7', '7', '', '', '&'),
  KEY('k8', '8', '', '', '*'),
  KEY('k9', '9', '', '', '('),
  KEY('k0', '0', '', '', ')'),
  KEY('minus', '-', '', '', '_'),
  KEY('equal', '=', '', '', '+'),
  { id: 'backspace', kind: 'mod', label: 'Backsp.', wide: 2 },
];

const ROW2_EN = [
  { id: 'tab', kind: 'mod', label: 'Tab', wide: 1.5 },
  KEY('q', 'q', '', '', 'Q'),
  KEY('w', 'w', '', '', 'W'),
  KEY('e', 'e', '', '', 'E'),
  KEY('r', 'r', '', '', 'R'),
  KEY('t', 't', '', '', 'T'),
  KEY('y', 'y', '', '', 'Y'),
  KEY('u', 'u', '', '', 'U'),
  KEY('i', 'i', '', '', 'I'),
  KEY('o', 'o', '', '', 'O'),
  KEY('p', 'p', '', '', 'P'),
  KEY('bracketL', '[', '', '', '{'),
  KEY('bracketR', ']', '', '', '}'),
  { ...KEY('backslash', '\\', '', '', '|'), wide: 1.5 },
];

const ROW3_EN = [
  { id: 'caps', kind: 'mod', label: 'Caps', wide: 1.75 },
  KEY('a', 'a', '', '', 'A'),
  KEY('s', 's', '', '', 'S'),
  KEY('d', 'd', '', '', 'D'),
  KEY('f', 'f', '', '', 'F'),
  KEY('g', 'g', '', '', 'G'),
  KEY('h', 'h', '', '', 'H'),
  KEY('j', 'j', '', '', 'J'),
  KEY('k', 'k', '', '', 'K'),
  KEY('l', 'l', '', '', 'L'),
  KEY('semicolon', ';', '', '', ':'),
  KEY('quote', "'", '', '', '"'),
  { id: 'enter', kind: 'mod', label: 'Enter', wide: 2.25 },
];

const ROW4_EN = [
  { id: 'shiftL', kind: 'mod', label: 'Shift', cls: 'key-shift', wide: 2.25 },
  KEY('z', 'z', '', '', 'Z'),
  KEY('x', 'x', '', '', 'X'),
  KEY('c', 'c', '', '', 'C'),
  KEY('v', 'v', '', '', 'V'),
  KEY('b', 'b', '', '', 'B'),
  KEY('n', 'n', '', '', 'N'),
  KEY('m', 'm', '', '', 'M'),
  KEY('comma', ',', '', '', '<'),
  KEY('period', '.', '', '', '>'),
  KEY('slash', '/', '', '', '?'),
  KEY('extra', '', '', '', ''),
  { id: 'shiftR', kind: 'mod', label: 'Shift', cls: 'key-shift', wide: 1.75 },
];

const ROW5_EN = [
  { id: 'ctrlL', kind: 'mod', label: 'Ctrl', cls: 'key-ctrl', wide: 1.5 },
  { id: 'alt', kind: 'mod', label: 'Alt', wide: 1.5 },
  { id: 'space', kind: 'mod', label: '', cls: 'space', wide: 9 },
  { id: 'altgr', kind: 'mod', label: 'AltGr', cls: 'key-altgr', wide: 1.5 },
  { id: 'ctrlR', kind: 'mod', label: 'Ctrl', cls: 'key-ctrl', wide: 1.5 },
];

/* ---------- Khmer Standard layout data ---------- */
const ROW1_STD = [
  KEY('grave', '', '฿', '◎', ''),
  KEY('k1', '១', '₭', '1', '!'),
  KEY('k2', '២', '€', '2', 'ៗ'),
  KEY('k3', '៣', 'đ', '3', '"'),
  KEY('k4', '៤', '₣', '4', '៛'),
  KEY('k5', '៥', '¥', '5', '%'),
  KEY('k6', '៦', '', '6', '៍'),
  KEY('k7', '៧', '£', '7', '័'),
  KEY('k8', '៨', '', '8', '៏'),
  KEY('k9', '៩', '', '9', '៎'),
  KEY('k0', '០', '—', '0', '៌'),
  KEY('minus', '-', '•', '{', '_'),
  KEY('equal', '=', '', '}', '+'),
  { id: 'backspace', kind: 'mod', label: 'Backsp.', wide: 2 },
];

const ROW2_STD = [
  { id: 'tab', kind: 'mod', label: 'Tab', wide: 1.5 },
  KEY('q', 'ឆ', '', '*', 'ឈ'),
  KEY('w', 'ឹ', '', '', 'ឺ'),
  KEY('e', 'េ', '', 'ឯ', 'ែ'),
  KEY('r', 'រ', '', 'ឫ', 'ឬ'),
  KEY('t', 'ត', '', 'ឦ', 'ទ'),
  KEY('y', 'យ', '', '', 'ួ'),
  KEY('u', 'ុ', '', 'ឧ', 'ូ'),
  KEY('i', 'ិ', '', 'ឥ', 'ី'),
  KEY('o', 'ោ', '', 'ឱ', 'ៅ'),
  KEY('p', 'ផ', '', 'ឳ', 'ភ'),
  KEY('bracketL', 'ើ', '', '[', 'ោះ'),
  KEY('bracketR', 'ឿ', '', ']', 'ៀ'),
  { ...KEY('backslash', '\\', '/', '៚', '/'), wide: 1.5 },
];

const ROW3_STD = [
  { id: 'caps', kind: 'mod', label: 'Caps', wide: 1.75 },
  KEY('a', 'ា', '', 'ឩ', 'ៃ'),
  KEY('s', 'ស', '', 'ឪ', 'ាំ'),
  KEY('d', 'ដ', '', '', 'ឌ'),
  KEY('f', 'ថ', '', '', 'ធ'),
  KEY('g', 'ង', '', '', 'ុះ'),
  KEY('h', 'ហ', '', '', '៏'),
  KEY('j', 'ញ', '', 'ឮ', 'ុំ'),
  KEY('k', 'ក', '', 'ឭ', 'គ'),
  KEY('l', 'ល', '', 'ឰ', 'ឡ'),
  KEY('semicolon', 'ះ', ':', ';', '៖'),
  KEY('quote', '់', '«', '៝', '៉'),
  { id: 'enter', kind: 'mod', label: 'Enter', wide: 2.25 },
];

const ROW4_STD = [
  { id: 'shiftL', kind: 'mod', label: 'Shift', cls: 'key-shift', wide: 2.25 },
  KEY('z', 'ឋ', '', '#', 'ឍ'),
  KEY('x', 'ខ', '', '@', 'ឃ'),
  KEY('c', 'ច', '', '&', 'ជ'),
  KEY('v', 'វ', '', '$', 'េះ'),
  KEY('b', 'ប', '', '%', 'ព'),
  KEY('n', 'ន', '', '(', 'ណ'),
  KEY('m', 'ម', '’', ')', 'ំ'),
  KEY('comma', 'អ', '<', '‹', ','),
  KEY('period', '។', '>', '›', '.'),
  KEY('slash', '', '”', '៕', '?'),
  KEY('extra', '', '', '¶', ''),
  { id: 'shiftR', kind: 'mod', label: 'Shift', cls: 'key-shift', wide: 1.75 },
];

const ROW5_STD = [
  { id: 'ctrlL', kind: 'mod', label: 'Ctrl', cls: 'key-ctrl', wide: 1.5 },
  { id: 'alt', kind: 'mod', label: 'Alt', wide: 1.5 },
  { id: 'space', kind: 'mod', label: '', cls: 'space', wide: 9 },
  { id: 'altgr', kind: 'mod', label: 'AltGr', cls: 'key-altgr', wide: 1.5 },
  { id: 'ctrlR', kind: 'mod', label: 'Ctrl', cls: 'key-ctrl', wide: 1.5 },
];

export const KEYBOARD_LAYOUTS = {
  nida: {
    id: 'nida',
    label: 'Khmer NiDA (Microsoft)',
    shortLabel: 'Khmer NiDA',
    badge: 'MICROSOFT WINDOWS NIDA',
    rows: [ROW1_NIDA, ROW2_NIDA, ROW3_NIDA, ROW4_NIDA, ROW5_NIDA],
    spaceMap: { base: ' ', shift: ' ', ctrl: ' ', altgr: '\u00A0' },
    samplePrompt: 'សួស្តីកម្ពុជា',
    sampleMeaning: 'Hello Cambodia (Type: ស + ួ + ស + ្ [J] + ត + ី + ក + ម + ្ [J] + ព + ុ + ច + ា)',
    homeRowDesc: 'Left: ា ស ដ ថ (A S D F) · Right: ្ ក ល ើ (J K L ;)',
  },
  english: {
    id: 'english',
    label: 'English (US QWERTY)',
    shortLabel: 'English (US)',
    badge: 'ANSI US QWERTY',
    rows: [ROW1_EN, ROW2_EN, ROW3_EN, ROW4_EN, ROW5_EN],
    spaceMap: { base: ' ', shift: ' ', ctrl: ' ', altgr: ' ' },
    samplePrompt: 'Phana Kurosaki',
    sampleMeaning: 'Touch-Typing Studio // 60 FPS Kinematic Hand Rig',
    homeRowDesc: 'Left: A S D F · Right: J K L ;',
  },
  standard: {
    id: 'standard',
    label: 'Khmer Standard',
    shortLabel: 'Khmer Standard',
    badge: 'KHMER STANDARD',
    rows: [ROW1_STD, ROW2_STD, ROW3_STD, ROW4_STD, ROW5_STD],
    spaceMap: { base: '្', shift: ' ', ctrl: '្', altgr: '្' },
    samplePrompt: 'ភាសាខ្មែរ',
    sampleMeaning: 'Khmer Language (Spacebar = ្ Coeng Subscript)',
    homeRowDesc: 'Left: ា ស ដ ថ (A S D F) · Right: ញ ក ល ះ (J K L ;)',
  },
};

const CODE_MAP = {
  Backquote: 'grave',
  Digit1: 'k1',
  Digit2: 'k2',
  Digit3: 'k3',
  Digit4: 'k4',
  Digit5: 'k5',
  Digit6: 'k6',
  Digit7: 'k7',
  Digit8: 'k8',
  Digit9: 'k9',
  Digit0: 'k0',
  Minus: 'minus',
  Equal: 'equal',
  Backspace: 'backspace',
  Tab: 'tab',
  KeyQ: 'q',
  KeyW: 'w',
  KeyE: 'e',
  KeyR: 'r',
  KeyT: 't',
  KeyY: 'y',
  KeyU: 'u',
  KeyI: 'i',
  KeyO: 'o',
  KeyP: 'p',
  BracketLeft: 'bracketL',
  BracketRight: 'bracketR',
  Enter: 'enter',
  CapsLock: 'caps',
  KeyA: 'a',
  KeyS: 's',
  KeyD: 'd',
  KeyF: 'f',
  KeyG: 'g',
  KeyH: 'h',
  KeyJ: 'j',
  KeyK: 'k',
  KeyL: 'l',
  Semicolon: 'semicolon',
  Quote: 'quote',
  Backslash: 'backslash',
  ShiftLeft: 'shiftL',
  ShiftRight: 'shiftR',
  KeyZ: 'z',
  KeyX: 'x',
  KeyC: 'c',
  KeyV: 'v',
  KeyB: 'b',
  KeyN: 'n',
  KeyM: 'm',
  Comma: 'comma',
  Period: 'period',
  Slash: 'slash',
  ControlLeft: 'ctrlL',
  ControlRight: 'ctrlR',
  AltLeft: 'alt',
  AltRight: 'altgr',
  Space: 'space',
};

const KEY_FINGER = {
  grave: 'lp',
  k1: 'lp',
  k2: 'lr',
  k3: 'lm',
  k4: 'li',
  k5: 'li',
  k6: 'ri',
  k7: 'ri',
  k8: 'rm',
  k9: 'rr',
  k0: 'rp',
  minus: 'rp',
  equal: 'rp',
  backspace: 'rp',
  tab: 'lp',
  q: 'lp',
  w: 'lr',
  e: 'lm',
  r: 'li',
  t: 'li',
  y: 'ri',
  u: 'ri',
  i: 'rm',
  o: 'rr',
  p: 'rp',
  bracketL: 'rp',
  bracketR: 'rp',
  enter: 'rp',
  caps: 'lp',
  a: 'lp',
  s: 'lr',
  d: 'lm',
  f: 'li',
  g: 'li',
  h: 'ri',
  j: 'ri',
  k: 'rm',
  l: 'rr',
  semicolon: 'rp',
  quote: 'rp',
  backslash: 'rp',
  shiftL: 'lp',
  z: 'lp',
  x: 'lr',
  c: 'lm',
  v: 'li',
  b: 'li',
  n: 'ri',
  m: 'ri',
  comma: 'rm',
  period: 'rr',
  slash: 'rp',
  extra: 'rp',
  shiftR: 'rp',
  ctrlL: 'lt',
  alt: 'lt',
  space: 'rt',
  altgr: 'rt',
  ctrlR: 'rp',
};

const FINGERS = [
  { id: 'lp', hand: 'L', home: 'a', kind: 'pinky', baseW: 26.5, tipW: 15.5, archPull: 0.26, archDy: 5, tipDy: 6 },
  { id: 'lr', hand: 'L', home: 's', kind: 'ring', baseW: 28.5, tipW: 17.2, archPull: 0.24, archDy: -1, tipDy: 0 },
  { id: 'lm', hand: 'L', home: 'd', kind: 'middle', baseW: 30.0, tipW: 18.2, archPull: 0.24, archDy: -5, tipDy: -5 },
  { id: 'li', hand: 'L', home: 'f', kind: 'index', baseW: 29.2, tipW: 17.8, archPull: 0.25, archDy: -1, tipDy: 1 },
  { id: 'lt', hand: 'L', home: 'space', kind: 'thumb', baseW: 30.5, tipW: 18.8, archPull: 0, archDy: 0, tipDy: 0 },
  { id: 'rt', hand: 'R', home: 'space', kind: 'thumb', baseW: 30.5, tipW: 18.8, archPull: 0, archDy: 0, tipDy: 0 },
  { id: 'ri', hand: 'R', home: 'j', kind: 'index', baseW: 29.2, tipW: 17.8, archPull: 0.25, archDy: -1, tipDy: 1 },
  { id: 'rm', hand: 'R', home: 'k', kind: 'middle', baseW: 30.0, tipW: 18.2, archPull: 0.24, archDy: -5, tipDy: -5 },
  { id: 'rr', hand: 'R', home: 'l', kind: 'ring', baseW: 28.5, tipW: 17.2, archPull: 0.24, archDy: -1, tipDy: 0 },
  { id: 'rp', hand: 'R', home: 'semicolon', kind: 'pinky', baseW: 26.5, tipW: 15.5, archPull: 0.26, archDy: 5, tipDy: 6 },
];

const HAND_COLOR_PRESETS = [
  { id: 'cyber', name: 'Cyber Cyan & Orchid', l: '#38bdf8', r: '#f472b6' },
  { id: 'emerald', name: 'Amber & Emerald', l: '#fbbf24', r: '#34d399' },
  { id: 'ruby', name: 'Ruby & Sapphire', l: '#fb7185', r: '#60a5fa' },
  { id: 'sunset', name: 'Sunset & Violet', l: '#fb923c', r: '#a78bfa' },
];

const FINGER_NAMES = {
  lp: 'Left Pinky',
  lr: 'Left Ring',
  lm: 'Left Middle',
  li: 'Left Index',
  lt: 'Left Thumb',
  rt: 'Right Thumb',
  ri: 'Right Index',
  rm: 'Right Middle',
  rr: 'Right Ring',
  rp: 'Right Pinky',
};

/* ---------- Procedural WebAudio Mechanical Key Switch Synth ---------- */
let sharedAudioCtx = null;
function playMechanicalSwitch(type = 'down') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!sharedAudioCtx) sharedAudioCtx = new AudioCtx();
    if (sharedAudioCtx.state === 'suspended') sharedAudioCtx.resume();

    const now = sharedAudioCtx.currentTime;
    const osc = sharedAudioCtx.createOscillator();
    const gain = sharedAudioCtx.createGain();
    osc.type = type === 'mod' ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(type === 'mod' ? 320 : 540, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.032);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(sharedAudioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.038);
  } catch {
    // Ignore audio context restrictions
  }
}

/* ---------- Kinematic Hand SVG Geometry Helpers (from keyboard.js) ---------- */
function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
function qPoint(o, c, t, s) {
  const m = 1 - s;
  return {
    x: m * m * o.x + 2 * m * s * c.x + s * s * t.x,
    y: m * m * o.y + 2 * m * s * c.y + s * s * t.y,
  };
}
function qTangent(o, c, t, s) {
  const m = 1 - s;
  return {
    x: 2 * m * (c.x - o.x) + 2 * s * (t.x - c.x),
    y: 2 * m * (c.y - o.y) + 2 * s * (t.y - c.y),
  };
}
function fingerFrame(origin, ctrl, tip, baseW, tipW, isThumb = false) {
  const N = 18;
  const left = [];
  const right = [];
  for (let i = 0; i <= N; i++) {
    const s = i / N;
    const p = qPoint(origin, ctrl, tip, s);
    const tan = qTangent(origin, ctrl, tip, s);
    const l = Math.hypot(tan.x, tan.y) || 1;
    const nx = tan.y / l;
    const ny = -tan.x / l;
    const wProfile = Math.pow(s, 0.76);
    let w = (baseW * (1 - wProfile) + tipW * wProfile) * 0.5;
    if (!isThumb) {
      const pipSwell = 0.7 * Math.exp(-Math.pow((s - 0.48) / 0.13, 2));
      const dipSwell = 0.35 * Math.exp(-Math.pow((s - 0.76) / 0.1, 2));
      w += pipSwell + dipSwell;
    } else {
      const mcpSwell = 1.3 * Math.exp(-Math.pow((s - 0.32) / 0.2, 2));
      const ipSwell = 0.65 * Math.exp(-Math.pow((s - 0.68) / 0.14, 2));
      w += mcpSwell + ipSwell;
    }
    left.push({ x: p.x + nx * w, y: p.y + ny * w });
    right.push({ x: p.x - nx * w, y: p.y - ny * w });
  }
  const rawTipTan = qTangent(origin, ctrl, tip, 1);
  const tipTanLen = Math.hypot(rawTipTan.x, rawTipTan.y) || 1;
  const tipTan = { x: rawTipTan.x / tipTanLen, y: rawTipTan.y / tipTanLen };
  return { left, right, origin, ctrl, tip, tipTan, baseW, tipW, isThumb };
}

function tipCapBetween(fromPt, toPt, tipTan, tipW, isThumb = false) {
  const capReach = tipW * (isThumb ? 0.52 : 0.55);
  const c1 = { x: fromPt.x + tipTan.x * capReach, y: fromPt.y + tipTan.y * capReach };
  const c2 = { x: toPt.x + tipTan.x * capReach, y: toPt.y + tipTan.y * capReach };
  return `C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${toPt.x.toFixed(1)} ${toPt.y.toFixed(1)} `;
}

function frameToPath(frame, baseW, tipW) {
  const { left, right, tipTan, isThumb } = frame;
  const startIdx = isThumb ? 7 : 4;
  const n = left.length - 1;
  let d = `M ${left[startIdx].x.toFixed(1)} ${left[startIdx].y.toFixed(1)} `;
  for (let i = startIdx + 1; i <= n; i++) d += `L ${left[i].x.toFixed(1)} ${left[i].y.toFixed(1)} `;
  d += tipCapBetween(left[n], right[n], tipTan, tipW, isThumb);
  for (let i = n - 1; i >= startIdx; i--) d += `L ${right[i].x.toFixed(1)} ${right[i].y.toFixed(1)} `;
  return d;
}

function buildNailPath(frame) {
  const { tip, tipTan, tipW, isThumb } = frame;
  const nx = -tipTan.y;
  const ny = tipTan.x;
  const nw = tipW * (isThumb ? 0.33 : 0.31);
  const nl = tipW * (isThumb ? 0.55 : 0.62);
  const center = {
    x: tip.x - tipTan.x * (nl * 0.22),
    y: tip.y - tipTan.y * (nl * 0.22),
  };
  const top = { x: center.x + tipTan.x * (nl * 0.56), y: center.y + tipTan.y * (nl * 0.56) };
  const bot = { x: center.x - tipTan.x * (nl * 0.44), y: center.y - tipTan.y * (nl * 0.44) };

  const tl = { x: top.x - nx * (nw * 0.88), y: top.y - ny * (nw * 0.88) };
  const tr = { x: top.x + nx * (nw * 0.88), y: top.y + ny * (nw * 0.88) };
  const bl = { x: bot.x - nx * (nw * 0.94), y: bot.y - ny * (nw * 0.94) };
  const br = { x: bot.x + nx * (nw * 0.94), y: bot.y + ny * (nw * 0.94) };

  const topCtrlL = { x: top.x - nx * (nw * 0.44) + tipTan.x * 2, y: top.y - ny * (nw * 0.44) + tipTan.y * 2 };
  const topCtrlR = { x: top.x + nx * (nw * 0.44) + tipTan.x * 2, y: top.y + ny * (nw * 0.44) + tipTan.y * 2 };
  const botCtrlR = { x: bot.x + nx * (nw * 0.46) - tipTan.x * 1.5, y: bot.y + ny * (nw * 0.46) - tipTan.y * 1.5 };
  const botCtrlL = { x: bot.x - nx * (nw * 0.46) - tipTan.x * 1.5, y: bot.y - ny * (nw * 0.46) - tipTan.y * 1.5 };

  return `M ${bl.x.toFixed(1)} ${bl.y.toFixed(1)} L ${tl.x.toFixed(1)} ${tl.y.toFixed(1)} C ${topCtrlL.x.toFixed(1)} ${topCtrlL.y.toFixed(1)} ${topCtrlR.x.toFixed(1)} ${topCtrlR.y.toFixed(1)} ${tr.x.toFixed(1)} ${tr.y.toFixed(1)} L ${br.x.toFixed(1)} ${br.y.toFixed(1)} C ${botCtrlR.x.toFixed(1)} ${botCtrlR.y.toFixed(1)} ${botCtrlL.x.toFixed(1)} ${botCtrlL.y.toFixed(1)} ${bl.x.toFixed(1)} ${bl.y.toFixed(1)} Z`;
}

function creaseAt(frame, s) {
  const { origin, ctrl, tip, baseW, tipW } = frame;
  const pt = qPoint(origin, ctrl, tip, s);
  const rawTan = qTangent(origin, ctrl, tip, s);
  const len = Math.hypot(rawTan.x, rawTan.y) || 1;
  const tan = { x: rawTan.x / len, y: rawTan.y / len };
  const nx = -tan.y;
  const ny = tan.x;
  const w = (baseW * (1 - s) + tipW * s) * 0.25;
  const p1 = { x: pt.x - nx * w, y: pt.y - ny * w };
  const p2 = { x: pt.x + nx * w, y: pt.y + ny * w };
  const cp = { x: pt.x - tan.x * 1.2, y: pt.y - tan.y * 1.2 };
  return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Q ${cp.x.toFixed(1)} ${cp.y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
}

function buildUnifiedHandSVG(hand, order, thumbF, frames, bases) {
  const isLeft = hand === 'L';
  const dir = isLeft ? 1 : -1;
  const n = 18;

  const fingerList = order.map((f) => {
    const fr = frames[f.id];
    return {
      f,
      fr,
      outerPts: isLeft ? fr.left : fr.right,
      innerPts: isLeft ? fr.right : fr.left,
    };
  });

  const thumbFr = frames[thumbF.id];
  const thumbInnerPts = isLeft ? thumbFr.left : thumbFr.right;
  const thumbOuterPts = isLeft ? thumbFr.right : thumbFr.left;

  const pinkyBase = bases[order[0].id];
  const indexBase = bases[order[3].id];

  const cmds = [];
  const p0 = fingerList[0].outerPts[2];
  cmds.push(`M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)}`);

  for (let fIdx = 0; fIdx < 4; fIdx++) {
    const curr = fingerList[fIdx];
    const { outerPts, innerPts, fr, f } = curr;
    const startI = fIdx === 0 ? 2 : 4;
    for (let i = startI + 1; i <= n; i++) {
      cmds.push(`L ${outerPts[i].x.toFixed(1)} ${outerPts[i].y.toFixed(1)}`);
    }
    cmds.push(tipCapBetween(outerPts[n], innerPts[n], fr.tipTan, f.tipW, false));

    const endI = 4;
    for (let i = n - 1; i >= endI; i--) {
      cmds.push(`L ${innerPts[i].x.toFixed(1)} ${innerPts[i].y.toFixed(1)}`);
    }

    if (fIdx < 3) {
      const next = fingerList[fIdx + 1];
      const nextStartI = 4;
      const pA = innerPts[endI];
      const pB = next.outerPts[nextStartI];
      const crotchDepth = 6.5;
      const midX = (pA.x + pB.x) * 0.5;
      const midY = Math.max(pA.y, pB.y) + crotchDepth;
      const wc1 = { x: pA.x + (midX - pA.x) * 0.35, y: midY };
      const wc2 = { x: pB.x - (pB.x - midX) * 0.35, y: midY };
      cmds.push(`C ${wc1.x.toFixed(1)} ${wc1.y.toFixed(1)} ${wc2.x.toFixed(1)} ${wc2.y.toFixed(1)} ${pB.x.toFixed(1)} ${pB.y.toFixed(1)}`);
    }
  }

  const idxInnerEnd = fingerList[3].innerPts[4];
  const thumbInnerStartIdx = 8;
  const thumbInnerStart = thumbInnerPts[thumbInnerStartIdx];
  const webMidY = Math.max(idxInnerEnd.y, thumbInnerStart.y) + 5;
  const webC1 = { x: idxInnerEnd.x + dir * 2, y: webMidY - 2 };
  const webC2 = { x: thumbInnerStart.x - dir * 8, y: webMidY + 2 };
  cmds.push(
    `C ${webC1.x.toFixed(1)} ${webC1.y.toFixed(1)} ${webC2.x.toFixed(1)} ${webC2.y.toFixed(1)} ${thumbInnerStart.x.toFixed(1)} ${thumbInnerStart.y.toFixed(1)}`
  );

  for (let i = thumbInnerStartIdx + 1; i <= n; i++) {
    cmds.push(`L ${thumbInnerPts[i].x.toFixed(1)} ${thumbInnerPts[i].y.toFixed(1)}`);
  }
  cmds.push(tipCapBetween(thumbInnerPts[n], thumbOuterPts[n], thumbFr.tipTan, thumbF.tipW, true));

  const thumbOuterEndIdx = 2;
  for (let i = n - 1; i >= thumbOuterEndIdx; i--) {
    cmds.push(`L ${thumbOuterPts[i].x.toFixed(1)} ${thumbOuterPts[i].y.toFixed(1)}`);
  }

  const thumbOuterBase = thumbOuterPts[thumbOuterEndIdx];
  const wristCenterX = (pinkyBase.x + indexBase.x) * 0.5 + dir * 3;
  const wristY = indexBase.y + 68;

  const wristInner = { x: wristCenterX + dir * 36, y: wristY - 2 };
  const wristOuter = { x: wristCenterX - dir * 44, y: wristY };

  const radC1 = { x: thumbOuterBase.x - dir * 8, y: thumbOuterBase.y + 8 };
  const radC2 = { x: wristInner.x + dir * 6, y: wristInner.y - 8 };
  cmds.push(
    `C ${radC1.x.toFixed(1)} ${radC1.y.toFixed(1)} ${radC2.x.toFixed(1)} ${radC2.y.toFixed(1)} ${wristInner.x.toFixed(1)} ${wristInner.y.toFixed(1)}`
  );

  const wristCtrl1 = { x: wristInner.x - dir * 22, y: wristY + 5 };
  const wristCtrl2 = { x: wristOuter.x + dir * 22, y: wristY + 5 };
  cmds.push(
    `C ${wristCtrl1.x.toFixed(1)} ${wristCtrl1.y.toFixed(1)} ${wristCtrl2.x.toFixed(1)} ${wristCtrl2.y.toFixed(1)} ${wristOuter.x.toFixed(1)} ${wristOuter.y.toFixed(1)}`
  );

  const ulnC1 = { x: wristOuter.x - dir * 6, y: wristOuter.y - 22 };
  const ulnC2 = { x: p0.x - dir * 3, y: p0.y + 22 };
  cmds.push(`C ${ulnC1.x.toFixed(1)} ${ulnC1.y.toFixed(1)} ${ulnC2.x.toFixed(1)} ${ulnC2.y.toFixed(1)} ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} Z`);

  const shadePath = [0, 1, 2, 3]
    .map((idx) => {
      const kb = bases[order[idx].id];
      const ex = kb.x + (wristCenterX - kb.x) * 0.42;
      const ey = kb.y + 28;
      return `M ${kb.x.toFixed(1)} ${(kb.y + 3).toFixed(1)} L ${ex.toFixed(1)} ${ey.toFixed(1)}`;
    })
    .join(' ');

  return {
    palmPath: cmds.join(' '),
    shadePath,
    highlight: {
      cx: wristCenterX,
      cy: (pinkyBase.y + wristY) * 0.48,
      rx: 34,
      ry: 22,
    },
  };
}

export default function RealKhmerKeyboard({
  activeLayoutId = 'nida',
  customPrompt,
  onLayoutChange,
  liveUrl = 'https://not-phana.github.io/PK-Khmer-Type/',
}) {
  const [layoutId, setLayoutId] = useState(activeLayoutId || 'nida');
  const [lockedLayer, setLockedLayer] = useState('base'); // 'base' | 'shift' | 'altgr' | 'ctrl'
  const [hoverLayer, setHoverLayer] = useState(null);
  const [physicalLayer, setPhysicalLayer] = useState(null);
  const [handsOn, setHandsOn] = useState(true);
  const [autoPilot, setAutoPilot] = useState(false);
  const [colorPresetIdx, setColorPresetIdx] = useState(0);
  const [typedText, setTypedText] = useState(customPrompt || 'សួស្តីកម្ពុជា');
  const [pressedKeyId, setPressedKeyId] = useState(null);
  const [hoveredKeyId, setHoveredKeyId] = useState(null);
  const [lastKeystrokeInfo, setLastKeystrokeInfo] = useState({
    keyId: 'j',
    glyph: '្',
    finger: 'ri',
    codepoint: 'U+17D2',
  });
  const [keystrokeCount, setKeystrokeCount] = useState(14);
  const [handGeometry, setHandGeometry] = useState(null);

  const boardWrapRef = useRef(null);
  const keyElsRef = useRef({});

  // Sync external prop changes (e.g., from bottom layout selector buttons in FeaturedProjects)
  useEffect(() => {
    if (activeLayoutId && KEYBOARD_LAYOUTS[activeLayoutId] && activeLayoutId !== layoutId) {
      setLayoutId(activeLayoutId);
      setTypedText(customPrompt || KEYBOARD_LAYOUTS[activeLayoutId].samplePrompt);
      setLockedLayer('base');
    }
  }, [activeLayoutId, layoutId, customPrompt]);

  useEffect(() => {
    if (customPrompt) {
      setTypedText('');
      setAutoPilot(true);
    }
  }, [customPrompt]);

  const handleSwitchLayout = useCallback(
    (nextId) => {
      if (!KEYBOARD_LAYOUTS[nextId]) return;
      setLayoutId(nextId);
      setTypedText(KEYBOARD_LAYOUTS[nextId].samplePrompt);
      setLockedLayer('base');
      playMechanicalSwitch('mod');
      if (onLayoutChange) onLayoutChange(nextId);
    },
    [onLayoutChange]
  );

  const currentLayout = KEYBOARD_LAYOUTS[layoutId] || KEYBOARD_LAYOUTS.nida;
  const targetPhrase = customPrompt || currentLayout.samplePrompt;
  const activeLayer = physicalLayer || hoverLayer || lockedLayer || 'base';
  const handColors = HAND_COLOR_PRESETS[colorPresetIdx] || HAND_COLOR_PRESETS[0];

  // Build flat lookup of all glyphs in current layout to highlight next target key
  const glyphLookup = useMemo(() => {
    const map = {};
    currentLayout.rows.forEach((row) => {
      row.forEach((k) => {
        if (k.kind === 'glyph') {
          if (k.base && !map[k.base]) map[k.base] = { keyId: k.id, layer: 'base' };
          if (k.shift && !map[k.shift]) map[k.shift] = { keyId: k.id, layer: 'shift' };
          if (k.altgr && !map[k.altgr]) map[k.altgr] = { keyId: k.id, layer: 'altgr' };
          if (k.ctrl && !map[k.ctrl]) map[k.ctrl] = { keyId: k.id, layer: 'ctrl' };
        }
      });
    });
    return map;
  }, [currentLayout]);

  // Determine the next target key if the user is typing targetPhrase or hovering/pressing a key
  const activeTarget = useMemo(() => {
    if (pressedKeyId) {
      return { keyId: pressedKeyId, layer: activeLayer };
    }
    if (hoveredKeyId) {
      return { keyId: hoveredKeyId, layer: activeLayer };
    }
    if (targetPhrase && typedText.length < targetPhrase.length && targetPhrase.startsWith(typedText)) {
      const nextChar = targetPhrase[typedText.length];
      if (nextChar === ' ') return { keyId: 'space', layer: 'base' };
      if (glyphLookup[nextChar]) return glyphLookup[nextChar];
    }
    // Default showcase target: highlight J ('្' Coeng in NiDA, 'j' in English, 'ញ' in Standard)
    return { keyId: 'j', layer: 'base' };
  }, [pressedKeyId, hoveredKeyId, targetPhrase, typedText, glyphLookup, activeLayer]);

  // Auto-Pilot 3D Hand Typing Loop
  useEffect(() => {
    if (!autoPilot) return undefined;
    const interval = setInterval(() => {
      setTypedText((prev) => {
        if (!targetPhrase) return prev;
        if (prev.length >= targetPhrase.length || !targetPhrase.startsWith(prev)) {
          return '';
        }
        const nextChar = targetPhrase[prev.length];
        const nextLookup =
          nextChar === ' ' ? { keyId: 'space', layer: 'base' } : glyphLookup[nextChar];
        if (nextLookup) {
          setPressedKeyId(nextLookup.keyId);
          setLockedLayer(nextLookup.layer || 'base');
          setTimeout(() => setPressedKeyId(null), 180);
          setKeystrokeCount((c) => c + 1);
          setLastKeystrokeInfo({
            keyId: nextLookup.keyId,
            glyph: nextChar === ' ' ? 'Space' : nextChar,
            finger: KEY_FINGER[nextLookup.keyId] || 'ri',
            codepoint:
              'U+' + nextChar.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'),
          });
        }
        return prev + nextChar;
      });
    }, 340);
    return () => clearInterval(interval);
  }, [autoPilot, targetPhrase, glyphLookup]);

  const activeFingerId = activeTarget?.keyId ? KEY_FINGER[activeTarget.keyId] : null;
  const activeModifierTarget = useMemo(() => {
    const keyId = activeTarget?.keyId;
    const lyr = activeTarget?.layer;
    if (!keyId || !lyr || lyr === 'base') return null;
    const fid = KEY_FINGER[keyId];
    const fObj = FINGERS.find((f) => f.id === fid);
    const isLeftHand = fObj ? fObj.hand === 'L' : false;
    if (lyr === 'shift') {
      if (keyId === 'shiftL' || keyId === 'shiftR') return null;
      return {
        fingerId: isLeftHand ? 'rp' : 'lp',
        targetKey: isLeftHand ? 'shiftR' : 'shiftL',
      };
    }
    if (lyr === 'altgr') {
      return { fingerId: 'rt', targetKey: 'altgr' };
    }
    if (lyr === 'ctrl') {
      return {
        fingerId: isLeftHand ? 'rp' : 'lp',
        targetKey: isLeftHand ? 'ctrlR' : 'ctrlL',
      };
    }
    return null;
  }, [activeTarget]);

  const triggerKeyInput = useCallback(
    (keyDef) => {
      if (!keyDef) return;
      setPressedKeyId(keyDef.id);
      setTimeout(() => {
        setPressedKeyId((prev) => (prev === keyDef.id ? null : prev));
      }, 160);

      if (keyDef.kind === 'mod') {
        playMechanicalSwitch('mod');
        if (keyDef.id === 'backspace') {
          setTypedText((prev) => Array.from(prev).slice(0, -1).join(''));
          setKeystrokeCount((c) => c + 1);
          return;
        }
        if (keyDef.id === 'space') {
          const spChar = currentLayout.spaceMap[activeLayer] || ' ';
          setTypedText((prev) => prev + spChar);
          setKeystrokeCount((c) => c + 1);
          setLastKeystrokeInfo({
            keyId: 'space',
            glyph: spChar === '្' ? '្ (Coeng)' : 'Space',
            finger: 'rt',
            codepoint:
              spChar === '្'
                ? 'U+17D2'
                : 'U+0020',
          });
          return;
        }
        if (keyDef.id === 'enter') {
          setTypedText((prev) => prev + ' ');
          return;
        }
        if (keyDef.cls === 'key-shift') {
          setLockedLayer((prev) => (prev === 'shift' ? 'base' : 'shift'));
          return;
        }
        if (keyDef.cls === 'key-altgr') {
          setLockedLayer((prev) => (prev === 'altgr' ? 'base' : 'altgr'));
          return;
        }
        if (keyDef.cls === 'key-ctrl') {
          setLockedLayer((prev) => (prev === 'ctrl' ? 'base' : 'ctrl'));
          return;
        }
        return;
      }

      playMechanicalSwitch('down');
      const val =
        keyDef[activeLayer] !== undefined && keyDef[activeLayer] !== ''
          ? keyDef[activeLayer]
          : keyDef.base;

      if (val) {
        setTypedText((prev) => (prev.length > 48 ? val : prev + val));
        setKeystrokeCount((c) => c + 1);
        const cp = val
          .split('')
          .map((ch) => 'U+' + ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'))
          .join(' ');
        setLastKeystrokeInfo({
          keyId: keyDef.id,
          glyph: val,
          finger: KEY_FINGER[keyDef.id] || 'ri',
          codepoint: cp,
        });
      }

      if (lockedLayer === 'shift') {
        setLockedLayer('base');
      }
    },
    [activeLayer, currentLayout, lockedLayer]
  );

  // Compute 3D kinematic hand SVG geometry whenever layout, active target, or window size changes
  const computeHands = useCallback(() => {
    const wrapEl = boardWrapRef.current;
    if (!wrapEl) return;
    const wrapRect = wrapEl.getBoundingClientRect();
    if (!wrapRect.width || !wrapRect.height) return;

    const keyCenter = (id) => {
      const el = keyElsRef.current[id];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - wrapRect.left,
        y: r.top + r.height / 2 - wrapRect.top,
      };
    };

    const buildSingleHand = (handSide, fingersList, primaryFId, primaryKey, modFId, modKey) => {
      const inward = handSide === 'L' ? 1 : -1;
      const homes = {};
      fingersList.forEach((f) => {
        if (f.kind === 'thumb') return;
        const c = keyCenter(f.home);
        if (c) homes[f.id] = c;
      });
      const order = ['pinky', 'ring', 'middle', 'index'].map((k) =>
        fingersList.find((f) => f.kind === k)
      );
      if (order.some((f) => !f || !homes[f.id])) return null;

      const activeF =
        fingersList.find((f) => f.id === primaryFId) ||
        fingersList.find((f) => f.id === modFId);
      const targetKey =
        activeF && activeF.id === primaryFId
          ? primaryKey
          : activeF && activeF.id === modFId
          ? modKey
          : null;

      let shiftX = 0;
      let shiftY = 0;
      if (activeF && activeF.kind !== 'thumb' && targetKey) {
        const targetPt = keyCenter(targetKey);
        const homePt = keyCenter(activeF.home);
        if (targetPt && homePt) {
          const reachDx = targetPt.x - homePt.x;
          const reachDy = targetPt.y - homePt.y;
          const factorY = activeF.kind === 'pinky' ? 0.68 : reachDy < 0 ? 0.6 : 0.42;
          const factorX = activeF.kind === 'pinky' ? 0.58 : 0.42;
          shiftY = reachDy * factorY;
          shiftX = reachDx * factorX;
        }
      }

      const homeXs = order.map((f) => homes[f.id].x);
      const homeYs = order.map((f) => homes[f.id].y);
      const homeSpanCenterX = (homeXs[0] + homeXs[3]) * 0.5 + inward * 3;
      const homeAvgY = homeYs.reduce((a, b) => a + b, 0) / 4;
      const palmArchBaseY = homeAvgY + 56;

      const bases = {};
      order.forEach((f) => {
        const h = homes[f.id];
        bases[f.id] = {
          x: h.x + (homeSpanCenterX - h.x) * f.archPull + shiftX,
          y: palmArchBaseY + f.archDy + shiftY,
        };
      });

      const indexBase = bases[order[3].id];
      const thumbF = fingersList.find((f) => f.kind === 'thumb');
      bases[thumbF.id] = {
        x: indexBase.x - inward * 5,
        y: indexBase.y + 48,
      };

      const frames = {};
      const fingerRenderList = [];

      fingersList.forEach((f) => {
        const origin = bases[f.id];
        const isPrimary = f.id === primaryFId;
        const isMod = f.id === modFId;
        const isActive = isPrimary || isMod;
        const tKey = isPrimary ? primaryKey : isMod ? modKey : null;

        let tip;
        if (f.kind === 'thumb') {
          const defaultThumbTip = {
            x: indexBase.x + inward * 48,
            y: indexBase.y + 14,
          };
          if (isActive && tKey && tKey !== 'space') {
            const rawTip = keyCenter(tKey);
            tip = rawTip || defaultThumbTip;
          } else if (isActive && tKey === 'space') {
            tip = { x: defaultThumbTip.x + inward * 4, y: defaultThumbTip.y - 4 };
          } else {
            tip = defaultThumbTip;
          }
        } else {
          const homeCenter = homes[f.id];
          const restTip = {
            x: homeCenter.x + shiftX,
            y: homeCenter.y + (f.tipDy || 0) + shiftY,
          };
          if (isActive && tKey) {
            const rawTarget = keyCenter(tKey);
            tip = rawTarget ? { x: rawTarget.x, y: rawTarget.y + 1 } : restTip;
          } else {
            tip = restTip;
          }
        }

        const maxLen = f.kind === 'thumb' ? 85 : f.kind === 'pinky' ? 98 : 112;
        const d = dist(origin, tip);
        if (d > maxLen) {
          const scale = maxLen / d;
          tip = {
            x: origin.x + (tip.x - origin.x) * scale,
            y: origin.y + (tip.y - origin.y) * scale,
          };
        }

        const mid =
          f.kind === 'thumb'
            ? {
                x: (origin.x + tip.x) * 0.5 + inward * 8,
                y: (origin.y + tip.y) * 0.5 - 4,
              }
            : {
                x: (origin.x + tip.x) * 0.5 + (tip.x - origin.x) * 0.12,
                y: (origin.y + tip.y) * 0.5 - 2,
              };

        const frame = fingerFrame(origin, mid, tip, f.baseW, f.tipW, f.kind === 'thumb');
        frames[f.id] = frame;
        const nailPt = qPoint(origin, mid, tip, 0.87);

        fingerRenderList.push({
          id: f.id,
          isActive,
          shapeD: frameToPath(frame, f.baseW, f.tipW),
          crease1D: creaseAt(frame, f.kind === 'thumb' ? 0.64 : 0.46),
          crease2D: f.kind === 'thumb' ? '' : creaseAt(frame, 0.75),
          nailD: buildNailPath(frame),
          tipPt: nailPt,
        });
      });

      const unified = buildUnifiedHandSVG(handSide, order, thumbF, frames, bases);
      return {
        unified,
        fingers: fingerRenderList,
      };
    };

    const leftFingers = FINGERS.filter((f) => f.hand === 'L');
    const rightFingers = FINGERS.filter((f) => f.hand === 'R');

    const leftHand = buildSingleHand(
      'L',
      leftFingers,
      activeFingerId,
      activeTarget?.keyId,
      activeModifierTarget?.fingerId,
      activeModifierTarget?.targetKey
    );
    const rightHand = buildSingleHand(
      'R',
      rightFingers,
      activeFingerId,
      activeTarget?.keyId,
      activeModifierTarget?.fingerId,
      activeModifierTarget?.targetKey
    );

    setHandGeometry({
      width: wrapRect.width,
      height: wrapRect.height,
      leftHand,
      rightHand,
    });
  }, [activeFingerId, activeTarget, activeModifierTarget]);

  useEffect(() => {
    const timer = requestAnimationFrame(computeHands);
    window.addEventListener('resize', computeHands);
    return () => {
      cancelAnimationFrame(timer);
      window.removeEventListener('resize', computeHands);
    };
  }, [computeHands, layoutId, handsOn]);

  return (
    <div
      className="border border-line bg-[#0b0d13] text-ink select-none flex flex-col justify-between overflow-hidden"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Shift') {
          setPhysicalLayer('shift');
          return;
        }
        if (e.key === 'AltGraph') {
          setPhysicalLayer('altgr');
          return;
        }
        if (e.key === 'Control') {
          setPhysicalLayer('ctrl');
          return;
        }
        const mappedId = CODE_MAP[e.code];
        if (mappedId) {
          e.preventDefault();
          for (const row of currentLayout.rows) {
            const found = row.find((k) => k.id === mappedId);
            if (found) {
              triggerKeyInput(found);
              break;
            }
          }
        }
      }}
      onKeyUp={(e) => {
        if (e.key === 'Shift' || e.key === 'AltGraph' || e.key === 'Control') {
          setPhysicalLayer(null);
        }
      }}
    >
      {/* Top Studio Header Bar */}
      <div className="border-b border-line bg-[#10131c] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-6 border border-accent bg-accentDim flex items-center justify-center font-mono text-[11px] font-bold text-accent">
            PK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold text-ink">
                PK Khmer Type // Live Keyboard Engine
              </span>
              <span className="border border-[#4ade80]/50 bg-[#4ade80]/10 px-1.5 py-0.5 font-mono text-[9.5px] text-[#4ade80]">
                {currentLayout.badge}
              </span>
            </div>
          </div>
        </div>

        {/* Layout Switcher Pills: Khmer NiDA (Microsoft) / English (US) / Khmer Standard */}
        <div className="flex flex-wrap items-center gap-1.5">
          {Object.values(KEYBOARD_LAYOUTS).map((lyt) => {
            const isActive = lyt.id === layoutId;
            return (
              <button
                key={lyt.id}
                type="button"
                onClick={() => handleSwitchLayout(lyt.id)}
                className={`px-2.5 py-1 border font-mono text-[10.5px] transition-colors ${
                  isActive
                    ? 'border-accent bg-accent text-[#0b0b0c] font-bold'
                    : 'border-line bg-[#0b0d13] text-muted hover:text-ink hover:border-accent/60'
                }`}
              >
                {lyt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Interactive Manuscript & Telemetry Strip */}
      <div className="border-b border-line bg-[#0e111a] px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted mb-1">
            <span className="text-accent font-semibold whitespace-nowrap shrink-0">
              LIVE MANUSCRIPT BUFFER
            </span>
            <span className="shrink-0">·</span>
            <span className="truncate">{currentLayout.sampleMeaning}</span>
          </div>
          <div className="flex items-center gap-2 border border-line bg-[#080a0f] px-3 py-1.5">
            <span
              className="font-sans text-base sm:text-lg text-ink tracking-wide truncate"
              style={{ fontFamily: "'Noto Sans Khmer', 'JetBrains Mono', sans-serif" }}
            >
              {typedText || '\u00A0'}
            </span>
            <span className="inline-block w-1.5 h-4 bg-accent animate-pulse shrink-0" />
            <div className="ml-auto flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() =>
                  setTypedText(currentLayout.samplePrompt)
                }
                className="border border-line bg-[#121622] px-2 py-0.5 font-mono text-[9.5px] text-muted hover:text-ink"
                title="Reset sample phrase"
              >
                Sample
              </button>
              <button
                type="button"
                onClick={() => setTypedText('')}
                className="border border-line bg-[#121622] px-2 py-0.5 font-mono text-[9.5px] text-muted hover:text-ink"
                title="Clear manuscript buffer"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Modifier Layer & 3D Hands Controls */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          <div className="flex items-center border border-line bg-[#080a0f] p-0.5 font-mono text-[10px]">
            {['base', 'shift', 'altgr'].map((lyr) => (
              <button
                key={lyr}
                type="button"
                onClick={() =>
                  setLockedLayer((prev) => (prev === lyr ? 'base' : lyr))
                }
                className={`px-2 py-1 uppercase transition-colors ${
                  activeLayer === lyr
                    ? 'bg-accent text-[#0b0b0c] font-bold'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {lyr}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setAutoPilot((v) => {
                if (!v && typedText.length >= targetPhrase.length) {
                  setTypedText('');
                }
                return !v;
              });
            }}
            className={`px-2.5 py-1.5 border font-mono text-[10px] transition-colors ${
              autoPilot
                ? 'border-[#4ade80] bg-[#4ade80]/15 text-[#4ade80] font-semibold'
                : 'border-line bg-[#080a0f] text-muted hover:text-ink'
            }`}
          >
            Auto-Type: {autoPilot ? 'ON' : 'OFF'}
          </button>

          <button
            type="button"
            onClick={() => setHandsOn((v) => !v)}
            className={`px-2.5 py-1.5 border font-mono text-[10px] transition-colors ${
              handsOn
                ? 'border-[#38bdf8] bg-[#38bdf8]/15 text-[#38bdf8] font-semibold'
                : 'border-line bg-[#080a0f] text-muted hover:text-ink'
            }`}
          >
            3D Hands: {handsOn ? 'ON' : 'OFF'}
          </button>

          <button
            type="button"
            onClick={() =>
              setColorPresetIdx((i) => (i + 1) % HAND_COLOR_PRESETS.length)
            }
            title={`Hand Palette: ${handColors.name}`}
            className="px-2 py-1.5 border border-line bg-[#080a0f] hover:border-ink flex items-center gap-1"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: handColors.l }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: handColors.r }}
            />
          </button>
        </div>
      </div>

      {/* Physical 5-Row Keyboard Chassis + 3D Kinematic Hands Overlay */}
      <div
        ref={boardWrapRef}
        className="relative px-3 pt-3 pb-7 sm:px-5 sm:pt-4 sm:pb-9 bg-gradient-to-b from-[#111522] to-[#0a0c14]"
      >
        <div className="flex flex-col gap-1.5">
          {currentLayout.rows.map((row, rIdx) => (
            <div key={rIdx} className="flex w-full gap-1.5">
              {row.map((k) => {
                const u = k.wide || 1;
                const finger = KEY_FINGER[k.id];
                const isPressed = pressedKeyId === k.id;
                const isTarget = activeTarget?.keyId === k.id;
                const isModTarget = activeModifierTarget?.targetKey === k.id;
                const isModLocked =
                  (k.cls === 'key-shift' && activeLayer === 'shift') ||
                  (k.cls === 'key-altgr' && activeLayer === 'altgr') ||
                  (k.cls === 'key-ctrl' && activeLayer === 'ctrl');

                const glyphText =
                  k.kind === 'glyph'
                    ? k[activeLayer] !== undefined && k[activeLayer] !== ''
                      ? k[activeLayer]
                      : k.base
                    : k.label;

                // Finger-zone keycap tint matching E:\Code\khmer keyboard\keyboard\idk\css\keyboard.css
                let fingerStyle =
                  'bg-gradient-to-b from-[#1e2436] to-[#141826] border-[#2c344d] border-b-[3px] border-b-[#0d101b] text-[#f3f4f6]';
                if (k.kind !== 'mod') {
                  if (finger === 'lp' || finger === 'rp') {
                    fingerStyle =
                      'bg-gradient-to-b from-[#f43f5e]/20 to-[#f43f5e]/10 border-[#f43f5e]/45 border-b-[3px] border-b-[#e11d48] text-[#f8fafc]';
                  } else if (finger === 'lr' || finger === 'rr') {
                    fingerStyle =
                      'bg-gradient-to-b from-[#f59e0b]/20 to-[#f59e0b]/10 border-[#f59e0b]/45 border-b-[3px] border-b-[#d97706] text-[#f8fafc]';
                  } else if (finger === 'lm' || finger === 'rm') {
                    fingerStyle =
                      'bg-gradient-to-b from-[#10b981]/20 to-[#10b981]/10 border-[#10b981]/45 border-b-[3px] border-b-[#059669] text-[#f8fafc]';
                  } else if (finger === 'li') {
                    fingerStyle =
                      'bg-gradient-to-b from-[#3b82f6]/25 to-[#3b82f6]/10 border-[#3b82f6]/50 border-b-[3px] border-b-[#2563eb] text-[#f8fafc]';
                  } else if (finger === 'ri') {
                    fingerStyle =
                      'bg-gradient-to-b from-[#8b5cf6]/25 to-[#8b5cf6]/10 border-[#8b5cf6]/50 border-b-[3px] border-b-[#7c3aed] text-[#f8fafc]';
                  }
                }

                if (isTarget || isPressed) {
                  fingerStyle =
                    'bg-gradient-to-b from-[#7c3aed] to-[#5b21b6] border-[#a78bfa] border-b-[3px] border-b-[#2e1065] text-white shadow-[0_0_16px_rgba(139,92,246,0.65)] scale-[1.03] z-10';
                } else if (isModTarget || isModLocked) {
                  fingerStyle =
                    'bg-gradient-to-b from-[#0284c7] to-[#0369a1] border-[#38bdf8] border-b-[3px] border-b-[#0c4a6e] text-white shadow-[0_0_12px_rgba(56,189,248,0.5)] z-10';
                }

                return (
                  <button
                    key={k.id}
                    ref={(el) => {
                      if (el) keyElsRef.current[k.id] = el;
                    }}
                    type="button"
                    onMouseEnter={() => {
                      setHoveredKeyId(k.id);
                      if (k.cls === 'key-shift') setHoverLayer('shift');
                      else if (k.cls === 'key-altgr') setHoverLayer('altgr');
                      else if (k.cls === 'key-ctrl') setHoverLayer('ctrl');
                    }}
                    onMouseLeave={() => {
                      setHoveredKeyId((prev) => (prev === k.id ? null : prev));
                      if (
                        k.cls === 'key-shift' ||
                        k.cls === 'key-altgr' ||
                        k.cls === 'key-ctrl'
                      ) {
                        setHoverLayer(null);
                      }
                    }}
                    onClick={() => {
                      setAutoPilot(false);
                      triggerKeyInput(k);
                    }}
                    style={{
                      flexGrow: u,
                      flexBasis: `calc((${u} - 1) * 6px)`,
                      fontFamily:
                        k.kind === 'mod'
                          ? "'JetBrains Mono', monospace"
                          : "'Noto Sans Khmer', 'JetBrains Mono', sans-serif",
                    }}
                    className={`relative min-w-0 h-10 sm:h-11 rounded-[7px] border flex items-center justify-center transition-all duration-100 cursor-pointer ${fingerStyle}`}
                  >
                    {/* Shift-layer corner preview badge */}
                    {k.kind === 'glyph' && k.shift && activeLayer === 'base' && (
                      <span
                        className="pointer-events-none absolute top-0.5 right-1 text-[9px] leading-none text-[#e5b842] opacity-80"
                        style={{
                          fontFamily: "'Noto Serif Khmer', 'Noto Sans Khmer', sans-serif",
                        }}
                      >
                        {k.shift}
                      </span>
                    )}

                    {/* Main Keycap Glyph or Spacebar Label */}
                    {k.id === 'space' ? (
                      <div className="flex items-center gap-2 text-xs">
                        {layoutId === 'standard' && activeLayer !== 'shift' ? (
                          <>
                            <span className="font-bold text-[#e5b842] text-sm">្</span>
                            <span className="font-mono text-[10px] text-muted">
                              ជើង (Coeng) · Space
                            </span>
                          </>
                        ) : layoutId === 'nida' ? (
                          <span className="font-mono text-[10px] text-muted">
                            ដកឃ្លា · Spacebar (Khmer NiDA)
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] text-muted">
                            Spacebar
                          </span>
                        )}
                      </div>
                    ) : (
                      <span
                        className={
                          k.kind === 'mod'
                            ? 'text-[10px] font-mono tracking-tight text-ink/80'
                            : 'text-sm sm:text-base font-medium leading-none'
                        }
                      >
                        {glyphText}
                      </span>
                    )}

                    {/* Tactile Home-Row Homing Bars on F and J */}
                    {(k.id === 'f' || k.id === 'j') && (
                      <span className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-[2px] rounded-full bg-current opacity-65" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* 3D Kinematic Hands SVG Overlay (Ported from keyboard.js) */}
        {handsOn && handGeometry && (
          <svg
            viewBox={`0 0 ${handGeometry.width} ${handGeometry.height}`}
            className="pointer-events-none absolute inset-0 w-full h-full z-20 overflow-visible opacity-80"
          >
            <defs>
              <linearGradient id="pkPalmGradL" x1="0" y1="1" x2="0.18" y2="0">
                <stop offset="0%" stopColor={handColors.l} stopOpacity="0.14" />
                <stop offset="45%" stopColor={handColors.l} stopOpacity="0.34" />
                <stop offset="88%" stopColor={handColors.l} stopOpacity="0.52" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.65" />
              </linearGradient>
              <linearGradient id="pkPalmGradR" x1="0" y1="1" x2="0.18" y2="0">
                <stop offset="0%" stopColor={handColors.r} stopOpacity="0.14" />
                <stop offset="45%" stopColor={handColors.r} stopOpacity="0.34" />
                <stop offset="88%" stopColor={handColors.r} stopOpacity="0.52" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.65" />
              </linearGradient>
              <linearGradient id="pkFingerActiveL" x1="0" y1="1" x2="0.15" y2="0">
                <stop offset="0%" stopColor={handColors.l} stopOpacity="0.05" />
                <stop offset="30%" stopColor={handColors.l} stopOpacity="0.65" />
                <stop offset="82%" stopColor="#ffd166" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="pkFingerActiveR" x1="0" y1="1" x2="0.15" y2="0">
                <stop offset="0%" stopColor={handColors.r} stopOpacity="0.05" />
                <stop offset="30%" stopColor={handColors.r} stopOpacity="0.65" />
                <stop offset="82%" stopColor="#ffd166" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Left Hand */}
            {handGeometry.leftHand && (
              <g>
                <path
                  d={handGeometry.leftHand.unified.palmPath}
                  fill="url(#pkPalmGradL)"
                  stroke={handColors.l}
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d={handGeometry.leftHand.unified.shadePath}
                  fill="none"
                  stroke={handColors.l}
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  opacity="0.35"
                />
                {handGeometry.leftHand.fingers.map((fg) => (
                  <g key={fg.id}>
                    {fg.isActive && (
                      <path
                        d={fg.shapeD}
                        fill="url(#pkFingerActiveL)"
                        stroke="#ffffff"
                        strokeWidth="1.4"
                      />
                    )}
                    <path
                      d={fg.crease1D}
                      fill="none"
                      stroke={fg.isActive ? '#ffffff' : handColors.l}
                      strokeWidth="0.85"
                      opacity="0.6"
                    />
                    {fg.crease2D && (
                      <path
                        d={fg.crease2D}
                        fill="none"
                        stroke={fg.isActive ? '#ffffff' : handColors.l}
                        strokeWidth="0.85"
                        opacity="0.6"
                      />
                    )}
                    <path
                      d={fg.nailD}
                      fill={fg.isActive ? '#ffffff' : `${handColors.l}44`}
                      stroke={fg.isActive ? '#ffffff' : handColors.l}
                      strokeWidth="0.9"
                    />
                    {fg.isActive && (
                      <circle
                        cx={fg.tipPt.x}
                        cy={fg.tipPt.y}
                        r="4.5"
                        fill="#ffd166"
                        stroke="#ffffff"
                        strokeWidth="1.4"
                      />
                    )}
                  </g>
                ))}
              </g>
            )}

            {/* Right Hand */}
            {handGeometry.rightHand && (
              <g>
                <path
                  d={handGeometry.rightHand.unified.palmPath}
                  fill="url(#pkPalmGradR)"
                  stroke={handColors.r}
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d={handGeometry.rightHand.unified.shadePath}
                  fill="none"
                  stroke={handColors.r}
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  opacity="0.35"
                />
                {handGeometry.rightHand.fingers.map((fg) => (
                  <g key={fg.id}>
                    {fg.isActive && (
                      <path
                        d={fg.shapeD}
                        fill="url(#pkFingerActiveR)"
                        stroke="#ffffff"
                        strokeWidth="1.4"
                      />
                    )}
                    <path
                      d={fg.crease1D}
                      fill="none"
                      stroke={fg.isActive ? '#ffffff' : handColors.r}
                      strokeWidth="0.85"
                      opacity="0.6"
                    />
                    {fg.crease2D && (
                      <path
                        d={fg.crease2D}
                        fill="none"
                        stroke={fg.isActive ? '#ffffff' : handColors.r}
                        strokeWidth="0.85"
                        opacity="0.6"
                      />
                    )}
                    <path
                      d={fg.nailD}
                      fill={fg.isActive ? '#ffffff' : `${handColors.r}44`}
                      stroke={fg.isActive ? '#ffffff' : handColors.r}
                      strokeWidth="0.9"
                    />
                    {fg.isActive && (
                      <circle
                        cx={fg.tipPt.x}
                        cy={fg.tipPt.y}
                        r="4.5"
                        fill="#ffd166"
                        stroke="#ffffff"
                        strokeWidth="1.4"
                      />
                    )}
                  </g>
                ))}
              </g>
            )}
          </svg>
        )}
      </div>

      {/* Bottom Keyboard Telemetry & Action Strip */}
      <div className="border-t border-line bg-[#10131c] px-4 py-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px]">
        <div className="flex flex-wrap items-center gap-2.5 text-muted">
          <span className="inline-flex items-center gap-1.5 text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            <span>{currentLayout.homeRowDesc}</span>
          </span>
          <span className="hidden sm:inline text-line">|</span>
          <span>
            FINGER:{' '}
            <strong className="text-accent">
              {FINGER_NAMES[activeFingerId] || FINGER_NAMES[lastKeystrokeInfo.finger]}
            </strong>
          </span>
          <span className="hidden xl:inline text-line">|</span>
          <span className="hidden xl:inline">
            GLYPH: <strong className="text-ink">{lastKeystrokeInfo.glyph}</strong> (
            {lastKeystrokeInfo.codepoint})
          </span>
        </div>

        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-invertBg text-invertFg px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0"
        >
          Open Full Desktop Studio -&gt;
        </a>
      </div>
    </div>
  );
}
