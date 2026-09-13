import { findRatingCode } from '../normalize/index.js';
import { RATING_SYSTEMS } from '../ratings/index.js';
import type { RatingCode, RatingSystem } from '../ratings/index.js';

export interface RatingMeta {
  system: string;
  systemName: string;
  code: string;
  label: string;
  description: string;
  color: string;
  textColor: string;
}

export function listSystems(): RatingSystem[] {
  return [...RATING_SYSTEMS];
}

export function getRatingMeta(
  system: string | undefined,
  rating: string | undefined
): RatingMeta | undefined {
  const match = findRatingCode(system, rating);
  if (!match) return undefined;
  return {
    system: match.system.id,
    systemName: match.system.name,
    code: match.code.code,
    label: match.code.label,
    description: match.code.description,
    color: match.code.color,
    textColor: match.code.textColor,
  };
}

export function listCodes(system: string): RatingCode[] | undefined {
  return RATING_SYSTEMS.find((item) => item.id === system)?.codes.slice();
}
