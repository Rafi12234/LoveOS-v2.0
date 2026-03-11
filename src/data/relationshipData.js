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
  'deploy hugs': {
    output: [
      '> Deploying hugs to production...',
      '',
      '  ╔══════════════════════════════════╗',
      '  ║                                  ║',
      '  ║    🤗  HUGS DEPLOYED! 🤗         ║',
      '  ║                                  ║',
      '  ║    ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥        ║',
      '  ║    Status: Warm & Fuzzy          ║',
      '  ║    Coverage: 100%                ║',
      '  ║    Uptime: Forever               ║',
      '  ║                                  ║',
      '  ╚══════════════════════════════════╝',
      '',
      '✓ Deployment successful. You are loved.',
    ],
    action: 'celebrateHugs',
  },
  'about-us': {
    output: [
      '> cat about-us.md',
      '',
      '# About Us',
      '',
      'Two developers who found love in the most',
      'beautiful pull request life ever sent.',
      '',
      'We debug problems together, commit to',
      'each other daily, and never push without',
      'checking in first.',
      '',
      `Version: 2.0 (${new Date().getFullYear()} Anniversary Edition)`,
      'License: Forever & Always',
      'Contributors: You + Me',
    ],
  },
  'date --anniversary': {
    output: [
      '> Fetching anniversary data...',
      '',
      `📅  Anniversary Date: ${ANNIVERSARY_DATE}`,
      `💝  Years together: 2`,
      `🧡  Status: Going strong`,
      '',
      `Happy Anniversary, ${HER_NAME}! 🎉`,
      'Here\'s to many more commits together.',
    ],
  },
};

// ─── Commit Timeline ──────────────────────────────
export const COMMIT_HISTORY = [
  {
    hash: 'a1b2c3d',
    author: 'destiny',
    date: '2024-03-11',
    message: 'init: first conversation initialized',
    tag: null,
    detail: {
      title: 'Where It All Began',
      description: 'A simple hello that would change everything. Neither of us knew that this conversation would become the most important thread in our lives.',
      note: 'Looking back, I\'m so grateful the universe compiled us into the same scope.',
    },
  },
  {
    hash: 'e4f5a6b',
    author: 'heart',
    date: '2024-04-02',
    message: 'feat: added first smile that stayed in memory',
    tag: null,
    detail: {
      title: 'The Smile I Can\'t Forget',
      description: 'That moment when your smile got permanently cached in my memory. No garbage collector could ever clear it.',
      note: 'Memory leak? More like a memory gift.',
    },
  },
  {
    hash: 'c7d8e9f',
    author: 'us',
    date: '2024-05-15',
    message: 'feat: implemented trust and comfort modules',
    tag: null,
    detail: {
      title: 'Comfort Zone: Expanded',
      description: 'We stopped being careful and started being real. Trust installed, walls deprecated.',
      note: 'Best dependency I ever added to my life.',
    },
  },
  {
    hash: 'f0a1b2c',
    author: 'patience',
    date: '2024-07-20',
    message: 'fix: resolved misunderstanding bug together',
    tag: 'hotfix',
    detail: {
      title: 'The Bug We Squashed',
      description: 'Every great codebase has bugs. What matters is that we debugged it together, patiently, with love.',
      note: 'We passed the test. All assertions green.',
    },
  },
  {
    hash: 'd3e4f5a',
    author: 'love',
    date: '2024-09-01',
    message: 'feat: first "I love you" pushed to main',
    tag: 'milestone',
    detail: {
      title: 'Three Words, Merged to Main',
      description: 'The most important commit message ever written. No code review needed — it was already perfect.',
      note: 'No revert. No rollback. Forever merged.',
    },
  },
  {
    hash: 'b6c7d8e',
    author: 'us',
    date: '2024-12-31',
    message: 'release: stable relationship build v1.0',
    tag: 'v1.0',
    detail: {
      title: 'Version 1.0 — Stable Release',
      description: 'After months of development, testing, laughing, and loving — our relationship hit its first stable release.',
      note: 'Production ready. Zero critical issues. All hearts passing.',
    },
  },
  {
    hash: '9f0a1b2',
    author: 'love',
    date: '2025-06-15',
    message: 'feat: added adventure module with travel support',
    tag: null,
    detail: {
      title: 'Adventures Unlocked',
      description: 'New memories compiled from new places. Every trip with you is a new branch worth exploring.',
      note: 'Favorite co-traveler. Favorite everything.',
    },
  },
  {
    hash: 'e3f4a5b',
    author: 'forever',
    date: '2026-03-11',
    message: 'release: anniversary v2.0 — two years of love',
    tag: 'v2.0',
    detail: {
      title: 'Happy Anniversary v2.0',
      description: 'Two years. 730 days. Countless moments that made this the greatest project either of us has ever worked on.',
      note: 'Here\'s to infinite more versions. I love you.',
    },
  },
];

// ─── Memory Vault ─────────────────────────────────
export const MEMORY_CATEGORIES = [
  {
    name: 'Firsts',
    emoji: '✨',
    memories: [
      {
        title: 'First Conversation',
        description: 'The day our threads first connected. A simple hello that started an infinite loop of happiness.',
        date: '2024-03-11',
        emoji: '💬',
      },
      {
        title: 'First Date',
        description: 'Nervous smiles, butterflies in the stomach, and the realization that this could be something extraordinary.',
        date: '2024-03-25',
        emoji: '🌟',
      },
      {
        title: 'First "I Love You"',
        description: 'Three words, zero hesitation. The most confident push I\'ve ever made.',
        date: '2024-09-01',
        emoji: '❤️',
      },
      {
        title: 'First Trip Together',
        description: 'New places, new memories, same wonderful person by my side. Adventure mode: activated.',
        date: '2025-02-14',
        emoji: '✈️',
      },
    ],
  },
  {
    name: 'Tiny Beautiful Things',
    emoji: '🌸',
    memories: [
      {
        title: 'Morning Texts',
        description: 'Waking up to your messages is my favorite daily deployment.',
        date: 'Ongoing',
        emoji: '☀️',
      },
      {
        title: 'Inside Jokes',
        description: 'The things only we understand. Our own private API that nobody else can call.',
        date: 'Ongoing',
        emoji: '😂',
      },
      {
        title: 'Comfortable Silence',
        description: 'Not every moment needs words. Sometimes being together in silence is the most beautiful connection.',
        date: 'Ongoing',
        emoji: '🤍',
      },
      {
        title: 'Late Night Calls',
        description: 'When the world goes quiet but we keep talking. Our own little async process that runs past midnight.',
        date: 'Ongoing',
        emoji: '🌙',
      },
    ],
  },
  {
    name: 'Funniest Moments',
    emoji: '😄',
    memories: [
      {
        title: 'The Autocorrect Incident',
        description: 'That text message autocorrect that made us both laugh for an entire day. Saved permanently in our bug tracker.',
        date: '2024-06-10',
        emoji: '📱',
      },
      {
        title: 'The Cooking Experiment',
        description: 'We tried. We really tried. The smoke alarm disagreed. But we laughed until we cried.',
        date: '2024-08-22',
        emoji: '🍳',
      },
    ],
  },
];
