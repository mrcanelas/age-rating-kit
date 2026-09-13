export type { RatingCode, RatingSystem } from './classind.js';
export { classindSystem } from './classind.js';
export { mpaSystem } from './mpa.js';
export { tvPgSystem } from './tv-pg.js';
export { pegiSystem } from './pegi.js';
export { esrbSystem } from './esrb.js';

import { classindSystem } from './classind.js';
import { mpaSystem } from './mpa.js';
import { tvPgSystem } from './tv-pg.js';
import { pegiSystem } from './pegi.js';
import { esrbSystem } from './esrb.js';

export const RATING_SYSTEMS = [
  classindSystem,
  mpaSystem,
  tvPgSystem,
  pegiSystem,
  esrbSystem,
] as const;
