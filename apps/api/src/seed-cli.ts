import { resetStore, getStore } from './store/memory.js';

resetStore();
const s = getStore();
console.log(
  `Seeded Harbor Studio: ${s.users.length} people, ${s.projects.length} projects, ${s.issues.length} issues, ${s.wiki.length} wiki pages.`,
);
