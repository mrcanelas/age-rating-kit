import type { RatingSystem } from './classind.js';

export const esrbSystem: RatingSystem = {
  id: 'esrb',
  aliases: [
    'esrb',
    'entertainment software rating board',
  ],
  name: 'ESRB',
  codes: [
    {
      code: 'e',
      aliases: ['e', 'everyone'],
      label: 'E',
      description: 'Everyone',
      color: '#1a1818',
      textColor: '#ffffff',
    },
    {
      code: 'e10-plus',
      aliases: ['e10-plus', 'e10+', 'e10', 'everyone 10+', 'e10plus'],
      label: 'E10+',
      description: 'Everyone 10 and older',
      color: '#1a1818',
      textColor: '#ffffff',
    },
    {
      code: 't',
      aliases: ['t', 'teen'],
      label: 'T',
      description: 'Teen',
      color: '#1a1818',
      textColor: '#ffffff',
    },
    {
      code: 'm',
      aliases: ['m', 'mature'],
      label: 'M',
      description: 'Mature 17+',
      color: '#1a1818',
      textColor: '#ffffff',
    },
    {
      code: 'ao',
      aliases: ['ao', 'adults only'],
      label: 'AO',
      description: 'Adults Only 18+',
      color: '#1a1818',
      textColor: '#ffffff',
    },
  ],
};
