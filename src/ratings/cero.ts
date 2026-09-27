import type { RatingSystem } from './classind.js';

export const ceroSystem: RatingSystem = {
  id: 'cero',
  aliases: ['cero', 'computer entertainment rating organization'],
  name: 'CERO',
  codes: [
    {
      code: 'a',
      aliases: ['a', 'all ages'],
      label: 'A',
      description: 'All ages',
      color: '#009BDE',
      textColor: '#ffffff',
    },
    {
      code: 'b',
      aliases: ['b', '12'],
      label: 'B',
      description: 'Ages 12 and up',
      color: '#22AC38',
      textColor: '#ffffff',
    },
    {
      code: 'c',
      aliases: ['c', '15'],
      label: 'C',
      description: 'Ages 15 and up',
      color: '#F5A100',
      textColor: '#111111',
    },
    {
      code: 'd',
      aliases: ['d', '17'],
      label: 'D',
      description: 'Ages 17 and up',
      color: '#F39800',
      textColor: '#111111',
    },
    {
      code: 'z',
      aliases: ['z', '18'],
      label: 'Z',
      description: 'Ages 18 and up only',
      color: '#E60012',
      textColor: '#ffffff',
    },
  ],
};
