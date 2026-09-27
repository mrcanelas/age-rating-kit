import type { RatingSystem } from './classind.js';

export const acbSystem: RatingSystem = {
  id: 'acb',
  aliases: ['acb', 'australian classification board', 'australia'],
  name: 'ACB',
  codes: [
    {
      code: 'g',
      aliases: ['g', 'general'],
      label: 'G',
      description: 'General',
      color: '#00A651',
      textColor: '#ffffff',
    },
    {
      code: 'pg',
      aliases: ['pg', 'parental guidance'],
      label: 'PG',
      description: 'Parental guidance recommended',
      color: '#FFD200',
      textColor: '#111111',
    },
    {
      code: 'm',
      aliases: ['m', 'mature'],
      label: 'M',
      description: 'Recommended for mature audiences',
      color: '#00A0E2',
      textColor: '#ffffff',
    },
    {
      code: 'ma15-plus',
      aliases: ['ma15-plus', 'ma15+', 'ma 15+', 'ma15'],
      label: 'MA 15+',
      description: 'Not suitable for people under 15',
      color: '#E60012',
      textColor: '#ffffff',
    },
    {
      code: 'r18-plus',
      aliases: ['r18-plus', 'r18+', 'r 18+', 'r18'],
      label: 'R 18+',
      description: 'Restricted to adults 18 and over',
      color: '#111111',
      textColor: '#ffffff',
    },
    {
      code: 'x18-plus',
      aliases: ['x18-plus', 'x18+', 'x 18+', 'x18'],
      label: 'X 18+',
      description: 'Restricted to adults 18 and over, sexually explicit',
      color: '#111111',
      textColor: '#ffffff',
    },
  ],
};
