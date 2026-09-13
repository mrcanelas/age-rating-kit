import type { RatingSystem } from './classind.js';

export const pegiSystem: RatingSystem = {
  id: 'pegi',
  aliases: ['pegi', 'pan european game information'],
  name: 'PEGI',
  codes: [
    {
      code: '3',
      aliases: ['3', 'pegi 3'],
      label: 'PEGI 3',
      description: 'Suitable for all ages',
      color: '#8dc53e',
      textColor: '#ffffff',
    },
    {
      code: '7',
      aliases: ['7', 'pegi 7'],
      label: 'PEGI 7',
      description: 'Not suitable for children under 7',
      color: '#f3b23e',
      textColor: '#111111',
    },
    {
      code: '12',
      aliases: ['12', 'pegi 12'],
      label: 'PEGI 12',
      description: 'Not suitable for children under 12',
      color: '#e98c2f',
      textColor: '#ffffff',
    },
    {
      code: '16',
      aliases: ['16', 'pegi 16'],
      label: 'PEGI 16',
      description: 'Not suitable for children under 16',
      color: '#e25727',
      textColor: '#ffffff',
    },
    {
      code: '18',
      aliases: ['18', 'pegi 18'],
      label: 'PEGI 18',
      description: 'Not suitable for children under 18',
      color: '#cc1f2f',
      textColor: '#ffffff',
    },
  ],
};
