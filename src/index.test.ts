import { describe, expect, it } from 'vitest';
import {
  DEFAULT_ICON_BASE_URL,
  getIconPath,
  getIconSvg,
  getIconUrl,
  getRatingMeta,
  normalizeRating,
} from './index.js';

describe('age-rating-kit', () => {
  it('normalizes ClassInd aliases', () => {
    expect(normalizeRating('ClassInd', 'Livre')).toEqual({
      system: 'classind',
      code: 'l',
    });
    expect(normalizeRating('DJCTQ', '12 anos')).toEqual({
      system: 'classind',
      code: '12',
    });
    expect(normalizeRating('br', '14')).toEqual({
      system: 'classind',
      code: '14',
    });
  });

  it('normalizes MPA and TV-PG values', () => {
    expect(normalizeRating('mpaa', 'PG-13')).toEqual({
      system: 'mpa',
      code: 'pg-13',
    });
    expect(normalizeRating('TV Parental Guidelines', 'TV-MA')).toEqual({
      system: 'tv-pg',
      code: 'tv-ma',
    });
  });

  it('builds CDN URLs and inline SVGs', () => {
    expect(getIconPath('classind', '14')).toBe('icons/classind/14.svg');
    expect(getIconUrl('classind', '14')).toBe(
      `${DEFAULT_ICON_BASE_URL}/icons/classind/14.svg`
    );
    expect(getIconUrl('mpa', 'PG-13', { baseUrl: 'https://cdn.example' })).toBe(
      'https://cdn.example/icons/mpa/pg-13.svg'
    );
    expect(getIconSvg('classind', 'L')?.startsWith('<svg ')).toBe(true);
    expect(getRatingMeta('classind', '14')?.description).toMatch(/14 anos/);
  });

  it('returns undefined for unknown ratings', () => {
    expect(normalizeRating('classind', '99')).toBeUndefined();
    expect(getIconUrl('unknown', '12')).toBeUndefined();
  });
});
