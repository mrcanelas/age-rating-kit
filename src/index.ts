import { ICON_SVGS } from './generated/svgs.js';
import { getRatingMeta, listCodes, listSystems } from './metadata/index.js';
import { normalizeRating, normalizeSystem } from './normalize/index.js';
import { RATING_SYSTEMS } from './ratings/index.js';

export type { RatingCode, RatingSystem } from './ratings/index.js';
export type { NormalizedRating } from './normalize/index.js';
export type { RatingMeta } from './metadata/index.js';
export {
  getRatingMeta,
  listCodes,
  listSystems,
  normalizeRating,
  normalizeSystem,
  RATING_SYSTEMS,
};

export const DEFAULT_ICON_BASE_URL =
  'https://cdn.jsdelivr.net/gh/mrcanelas/age-rating-kit@latest';

export interface IconUrlOptions {
  baseUrl?: string;
}

export function getIconSvg(
  system: string | undefined,
  rating: string | undefined
): string | undefined {
  const normalized = normalizeRating(system, rating);
  if (!normalized) return undefined;
  return ICON_SVGS[normalized.system]?.[normalized.code];
}

export function getIconPath(
  system: string | undefined,
  rating: string | undefined
): string | undefined {
  const normalized = normalizeRating(system, rating);
  if (!normalized) return undefined;
  return `icons/${normalized.system}/${normalized.code}.svg`;
}

export function getIconUrl(
  system: string | undefined,
  rating: string | undefined,
  options: IconUrlOptions = {}
): string | undefined {
  const iconPath = getIconPath(system, rating);
  if (!iconPath) return undefined;
  const base = (options.baseUrl ?? DEFAULT_ICON_BASE_URL).replace(/\/+$/, '');
  return `${base}/${iconPath}`;
}

