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

  it('normalizes ESRB values', () => {
    expect(normalizeRating('esrb', 'Everyone')).toEqual({
      system: 'esrb',
      code: 'e',
    });
    expect(normalizeRating('ESRB', 'E10+')).toEqual({
      system: 'esrb',
      code: 'e10-plus',
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

  it('normalizes BBFC, FSK, USK, CERO and ACB values', () => {
    expect(normalizeRating('BBFC', '12A')).toEqual({ system: 'bbfc', code: '12a' });
    expect(normalizeRating('FSK', 'ab 16')).toEqual({ system: 'fsk', code: '16' });
    expect(normalizeRating('USK', '0')).toEqual({ system: 'usk', code: '0' });
    expect(normalizeRating('CERO', 'Z')).toEqual({ system: 'cero', code: 'z' });
    expect(normalizeRating('Australia', 'MA 15+')).toEqual({
      system: 'acb',
      code: 'ma15-plus',
    });
    expect(getIconSvg('bbfc', 'U')?.startsWith('<svg ')).toBe(true);
    expect(getIconPath('acb', 'R 18+')).toBe('icons/acb/r18-plus.svg');
  });

  it('normalizes IARC, Kijkwijzer, Eirin, OFLC, RTC and GSRR values', () => {
    expect(normalizeRating('IARC', '12+')).toEqual({ system: 'iarc', code: '12-plus' });
    expect(normalizeRating('Kijkwijzer', 'AL')).toEqual({
      system: 'kijkwijzer',
      code: 'al',
    });
    expect(normalizeRating('Eirin', 'R15+')).toEqual({
      system: 'eirin',
      code: 'r15-plus',
    });
    expect(normalizeRating('New Zealand', 'RP16')).toEqual({
      system: 'oflc',
      code: 'rp16',
    });
    expect(normalizeRating('Mexico', 'AA')).toEqual({ system: 'rtc', code: 'aa' });
    expect(normalizeRating('GSRR', 'PG 15')).toEqual({ system: 'gsrr', code: 'pg15' });
    expect(getIconPath('iarc', '3+')).toBe('icons/iarc/3-plus.svg');
  });

  it('returns undefined for unknown ratings', () => {
    expect(normalizeRating('classind', '99')).toBeUndefined();
    expect(getIconUrl('unknown', '12')).toBeUndefined();
  });
});
