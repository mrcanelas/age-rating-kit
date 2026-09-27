import type { RatingSystem } from './classind.js';

export const krritSystem: RatingSystem = {
  id: 'krrit',
  aliases: ['krrit', 'polish tv', 'poland', 'krajowa rada radiofonii i telewizji'],
  name: 'KRRiT',
  codes: [
    {
      code: 'bo',
      aliases: ['bo', 'bez ograniczen', 'bez ograniczeń', '0', 'all'],
      label: 'BO',
      description: 'Bez ograniczeń wiekowych',
      color: '#6FB858',
      textColor: '#ffffff',
    },
    {
      code: '7',
      aliases: ['7', 'od 7', 'od lat 7'],
      label: '7',
      description: 'Od lat 7',
      color: '#4C8FB9',
      textColor: '#ffffff',
    },
    {
      code: '12',
      aliases: ['12', 'od 12', 'od lat 12'],
      label: '12',
      description: 'Od lat 12',
      color: '#D0D154',
      textColor: '#ffffff',
    },
    {
      code: '16',
      aliases: ['16', 'od 16', 'od lat 16'],
      label: '16',
      description: 'Od lat 16, tylko 20:00–6:00',
      color: '#EA9C30',
      textColor: '#ffffff',
    },
    {
      code: '18',
      aliases: ['18', 'od 18', 'od lat 18'],
      label: '18',
      description: 'Od lat 18, tylko 23:00–6:00',
      color: '#D54E4D',
      textColor: '#ffffff',
    },
  ],
};
