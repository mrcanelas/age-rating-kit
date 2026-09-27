export type { RatingCode, RatingSystem } from './classind.js';
export { classindSystem } from './classind.js';
export { mpaSystem } from './mpa.js';
export { tvPgSystem } from './tv-pg.js';
export { pegiSystem } from './pegi.js';
export { esrbSystem } from './esrb.js';
export { bbfcSystem } from './bbfc.js';
export { fskSystem } from './fsk.js';
export { uskSystem } from './usk.js';
export { ceroSystem } from './cero.js';
export { acbSystem } from './acb.js';

import { classindSystem } from './classind.js';
import { mpaSystem } from './mpa.js';
import { tvPgSystem } from './tv-pg.js';
import { pegiSystem } from './pegi.js';
import { esrbSystem } from './esrb.js';
import { bbfcSystem } from './bbfc.js';
import { fskSystem } from './fsk.js';
import { uskSystem } from './usk.js';
import { ceroSystem } from './cero.js';
import { acbSystem } from './acb.js';

export const RATING_SYSTEMS = [
  classindSystem,
  mpaSystem,
  tvPgSystem,
  pegiSystem,
  esrbSystem,
  bbfcSystem,
  fskSystem,
  uskSystem,
  ceroSystem,
  acbSystem,
] as const;
