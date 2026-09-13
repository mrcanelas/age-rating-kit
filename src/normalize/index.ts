import { RATING_SYSTEMS, type RatingCode, type RatingSystem } from '../ratings/index.js';

export interface NormalizedRating {
  system: string;
  code: string;
}

function key(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .trim()
    .toLowerCase()
    .replace(/[_/]+/g, ' ')
    .replace(/\s+/g, ' ');
}

const systemsByAlias = new Map<string, RatingSystem>();
const codesBySystemAlias = new Map<string, Map<string, RatingCode>>();

for (const system of RATING_SYSTEMS) {
  const codeMap = new Map<string, RatingCode>();
  for (const alias of system.aliases) {
    systemsByAlias.set(key(alias), system);
  }
  systemsByAlias.set(key(system.id), system);
  systemsByAlias.set(key(system.name), system);
  for (const code of system.codes) {
    codeMap.set(key(code.code), code);
    codeMap.set(key(code.label), code);
    for (const alias of code.aliases) {
      codeMap.set(key(alias), code);
    }
  }
  codesBySystemAlias.set(system.id, codeMap);
}

export function normalizeSystem(system?: string): RatingSystem | undefined {
  if (!system?.trim()) return undefined;
  return systemsByAlias.get(key(system));
}

export function normalizeRating(
  system: string | undefined,
  rating: string | undefined
): NormalizedRating | undefined {
  if (!rating?.trim()) return undefined;
  const resolved = normalizeSystem(system);
  if (!resolved) return undefined;
  const code = codesBySystemAlias.get(resolved.id)?.get(key(rating));
  if (!code) return undefined;
  return { system: resolved.id, code: code.code };
}

export function findRatingCode(
  system: string | undefined,
  rating: string | undefined
): { system: RatingSystem; code: RatingCode } | undefined {
  const normalized = normalizeRating(system, rating);
  if (!normalized) return undefined;
  const resolved = RATING_SYSTEMS.find((item) => item.id === normalized.system);
  const code = resolved?.codes.find((item) => item.code === normalized.code);
  if (!resolved || !code) return undefined;
  return { system: resolved, code };
}
