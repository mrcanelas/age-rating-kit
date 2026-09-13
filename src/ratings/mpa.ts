import type { RatingSystem } from './classind.js';

export const mpaSystem: RatingSystem = {
  id: 'mpa',
  aliases: ['mpa', 'mpaa', 'motion picture association', 'us-movie', 'us movie'],
  name: 'MPA',
  codes: [
    {
      code: 'g',
      aliases: ['g'],
      label: 'G',
      description: 'General Audiences',
      color: '#2e7d32',
      textColor: '#ffffff',
    },
    {
      code: 'pg',
      aliases: ['pg'],
      label: 'PG',
      description: 'Parental Guidance Suggested',
      color: '#f9a825',
      textColor: '#111111',
    },
    {
      code: 'pg-13',
      aliases: ['pg-13', 'pg13', 'pg 13'],
      label: 'PG-13',
      description: 'Parents Strongly Cautioned',
      color: '#ef6c00',
      textColor: '#ffffff',
    },
    {
      code: 'r',
      aliases: ['r'],
      label: 'R',
      description: 'Restricted',
      color: '#c62828',
      textColor: '#ffffff',
    },
    {
      code: 'nc-17',
      aliases: ['nc-17', 'nc17', 'nc 17'],
      label: 'NC-17',
      description: 'Adults Only',
      color: '#111111',
      textColor: '#ffffff',
    },
  ],
};
