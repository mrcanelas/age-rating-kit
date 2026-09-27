import type { RatingSystem } from './classind.js';

export const gsrrSystem: RatingSystem = {
  id: 'gsrr',
  aliases: ['gsrr', 'taiwan'],
  name: 'GSRR',
  codes: [
    {
      code: 'g',
      aliases: ['g', 'general'],
      label: 'G',
      description: 'General audiences',
      color: '#0095DA',
      textColor: '#ffffff',
    },
    {
      code: 'p',
      aliases: ['p', 'protected'],
      label: 'P',
      description: 'Protected, not suitable for children under 6',
      color: '#00A651',
      textColor: '#ffffff',
    },
    {
      code: 'pg12',
      aliases: ['pg12', 'pg-12', 'pg 12'],
      label: 'PG 12',
      description: 'Parental guidance for under 12s',
      color: '#FBC115',
      textColor: '#111111',
    },
    {
      code: 'pg15',
      aliases: ['pg15', 'pg-15', 'pg 15'],
      label: 'PG 15',
      description: 'Parental guidance for under 15s',
      color: '#F58220',
      textColor: '#ffffff',
    },
    {
      code: 'r',
      aliases: ['r', 'restricted'],
      label: 'R',
      description: 'Restricted to ages 18 and over',
      color: '#E30613',
      textColor: '#ffffff',
    },
  ],
};
