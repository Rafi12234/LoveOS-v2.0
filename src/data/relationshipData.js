// ═══════════════════════════════════════════════════
// LoveOS v2.0 — All Relationship Data
// Edit this file to personalize your anniversary app
// ═══════════════════════════════════════════════════

// ─── Core Info ────────────────────────────────────
export const HER_NAME = 'My Love';
export const ANNIVERSARY_DATE = '2024-03-11'; // YYYY-MM-DD format
export const RELATIONSHIP_START = '2024-03-11';
export const DASHBOARD_SUBTITLE = 'A digital universe built with love';
export const DEDICATION = `Dedicated to ${HER_NAME}`;

// ─── Boot Sequence ────────────────────────────────
export const BOOT_MESSAGES = [
  'Initializing LoveOS v2.0...',
  'Loading core memories...',
  'Syncing happiness modules...',
  'Compiling love.js — no errors found ❤',
  'Checking compatibility... ',
  'Status: Perfect Match Found ✓',
  'Boot successful.',
  '',
  `Welcome back, ${HER_NAME}.`,
];

// ─── Terminal Commands ────────────────────────────
export const TERMINAL_COMMANDS = {
  help: {
    output: [
      '┌─────────────────────────────────────────────┐',
      '│  LoveOS v2.0 — Available Commands           │',
      '├─────────────────────────────────────────────┤',
      '│  help            Show this help menu         │',
      '│  whoami          Who are you to me?          │',
      '│  git log         View our commit history     │',
      '│  show memories   List our memory vault       │',
      '│  open first-meet Our origin story            │',
      '│  open love-letter  Decrypt private message   │',
      '│  run future.sh   Execute future plans        │',
      '│  deploy hugs     Deploy some hugs 🤗         │',
      '│  about-us        About this relationship     │',
      '│  date --anniversary  Anniversary info        │',
      '│  clear           Clear terminal              │',
      '└─────────────────────────────────────────────┘',
    ],
  },
  whoami: {
    output: [
      `> Querying identity for ${HER_NAME}...`,
      '',
      'You are the best thing that ever happened to me.',
      'Role: Chief Happiness Officer',
      'Permissions: full access to my heart',
      'Status: irreplaceable',
    ],
  },
  'git log': {
    output: [
      '> Loading commit history...',
      '',
      '📂 Redirecting to Commit Timeline section...',
    ],
    action: 'openTimeline',
  },
  'show memories': {
    output: [
      '> Accessing Memory Vault...',
      '',
      '📁 Firsts/',
      '   ├── first-conversation.mem',
      '   ├── first-date.mem',
      '   ├── first-laugh.mem',
      '   └── first-i-love-you.mem',
      '📁 Tiny Beautiful Things/',
      '   ├── morning-texts.mem',
      '   ├── inside-jokes.mem',
      '   └── comfortable-silence.mem',
      '📁 Funniest Moments/',
      '   ├── that-autocorrect.mem',
      '   └── cooking-disaster.mem',
      '',
      '📂 Redirecting to Memory Vault...',
    ],
    action: 'openMemories',
  },
  'open first-meet': {
    output: [
      '> Loading origin story...',
      '',
      '┌── first-meet.log ─────────────────────────┐',
      '│                                            │',
      '│  It was just another ordinary day,         │',
      '│  until you showed up and rewrote            │',
      '│  every line of my source code.              │',
      '│                                            │',
      '│  I didn\'t know it then, but that was       │',
      '│  the moment my life\'s main branch          │',
      '│  got its best feature ever merged.          │',
      '│                                            │',
      '│  And I\'d choose that same commit            │',
      '│  every single time.                         │',
      '│                                            │',
      '└────────────────────────────────────────────┘',
    ],
  },
  'open love-letter': {
    output: [
      '> Decrypting private message...',
      '> Authorization: ❤ granted',
      '',
      '📩 Opening love letter...',
    ],
    action: 'openLoveLetter',
  },
  'run future.sh': {
    output: [
      '#!/bin/bash',
      '# future.sh — Our roadmap',
      '',
      'echo "Loading future plans..."',
      'sleep 1',
      '',
      '→ More adventures together.............. [PLANNED]',
      '→ More spontaneous road trips........... [PLANNED]',
      '→ Build a home full of love............. [PLANNED]',
      '→ Travel the world together............. [PLANNED]',
      '→ Grow old, still making each other laugh [PLANNED]',
      '→ Love you forever...................... [IN PROGRESS]',
      '',
      '✓ future.sh executed successfully.',
      '  Exit code: 0 (no errors in our love)',
    ],
  },
};
