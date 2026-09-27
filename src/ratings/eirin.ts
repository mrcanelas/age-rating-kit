import type { RatingSystem } from './classind.js';

export const eirinSystem: RatingSystem = {
  id: 'eirin',
  aliases: ['eirin', 'film classification and rating organization'],
  name: 'Eirin',
  codes: [
    {
      code: 'g',
      aliases: ['g', 'general'],
      label: 'G',
      description: 'General, suitable for all ages',
      color: '#009B4C',
      textColor: '#ffffff',
    },
    {
      code: 'pg12',
      aliases: ['pg12', 'pg-12', 'pg 12'],
      label: 'PG12',
      description: 'Parental guidance for under 12s',
      color: '#F5A100',
      textColor: '#111111',
    },
    {
      code: 'r15-plus',
      aliases: ['r15-plus', 'r15+', 'r15'],
      label: 'R15+',
      description: 'Restricted to ages 15 and over',
      color: '#E87722',
      textColor: '#ffffff',
    },
    {
      code: 'r18-plus',
      aliases: ['r18-plus', 'r18+', 'r18'],
      label: 'R18+',
      description: 'Restricted to ages 18 and over',
      color: '#E10600',
      textColor: '#ffffff',
    },
  ],
};
