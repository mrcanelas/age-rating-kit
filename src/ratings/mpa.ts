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
      color: '#006838',
      textColor: '#ffffff',
    },
    {
      code: 'pg',
      aliases: ['pg'],
      label: 'PG',
      description: 'Parental Guidance Suggested',
      color: '#F15A29',
      textColor: '#ffffff',
    },
    {
      code: 'pg-13',
      aliases: ['pg-13', 'pg13', 'pg 13'],
      label: 'PG-13',
      description: 'Parents Strongly Cautioned',
      color: '#7F3F98',
      textColor: '#ffffff',
    },
    {
      code: 'r',
      aliases: ['r'],
      label: 'R',
      description: 'Restricted',
      color: '#D71920',
      textColor: '#ffffff',
    },
    {
      code: 'nc-17',
      aliases: ['nc-17', 'nc17', 'nc 17'],
      label: 'NC-17',
      description: 'Adults Only',
      color: '#21409A',
      textColor: '#ffffff',
    },
  ],
};
