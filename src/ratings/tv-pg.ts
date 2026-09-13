import type { RatingSystem } from './classind.js';

export const tvPgSystem: RatingSystem = {
  id: 'tv-pg',
  aliases: [
    'tv-pg',
    'tvpg',
    'tv parental guidelines',
    'us-tv',
    'us tv',
    'fcc',
  ],
  name: 'TV Parental Guidelines',
  codes: [
    {
      code: 'tv-y',
      aliases: ['tv-y', 'tvy', 'y'],
      label: 'TV-Y',
      description: 'Designed for all children',
      color: '#2e7d32',
      textColor: '#ffffff',
    },
    {
      code: 'tv-y7',
      aliases: ['tv-y7', 'tvy7', 'y7'],
      label: 'TV-Y7',
      description: 'Directed to older children',
      color: '#558b2f',
      textColor: '#ffffff',
    },
    {
      code: 'tv-g',
      aliases: ['tv-g', 'tvg'],
      label: 'TV-G',
      description: 'General audience',
      color: '#1565c0',
      textColor: '#ffffff',
    },
    {
      code: 'tv-pg',
      aliases: ['tv-pg', 'tvpg'],
      label: 'TV-PG',
      description: 'Parental guidance suggested',
      color: '#f9a825',
      textColor: '#111111',
    },
    {
      code: 'tv-14',
      aliases: ['tv-14', 'tv14'],
      label: 'TV-14',
      description: 'Parents strongly cautioned',
      color: '#ef6c00',
      textColor: '#ffffff',
    },
    {
      code: 'tv-ma',
      aliases: ['tv-ma', 'tvma'],
      label: 'TV-MA',
      description: 'Mature audience only',
      color: '#111111',
      textColor: '#ffffff',
    },
  ],
};
