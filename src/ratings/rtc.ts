import type { RatingSystem } from './classind.js';

export const rtcSystem: RatingSystem = {
  id: 'rtc',
  aliases: ['rtc', 'mexico', 'méxico'],
  name: 'RTC',
  codes: [
    {
      code: 'aa',
      aliases: ['aa'],
      label: 'AA',
      description: 'Infantil',
      color: '#00A651',
      textColor: '#ffffff',
    },
    {
      code: 'a',
      aliases: ['a'],
      label: 'A',
      description: 'Todo público',
      color: '#0095DA',
      textColor: '#ffffff',
    },
    {
      code: 'b',
      aliases: ['b'],
      label: 'B',
      description: 'Adolescentes de 12 años en adelante',
      color: '#FBC115',
      textColor: '#111111',
    },
    {
      code: 'c',
      aliases: ['c'],
      label: 'C',
      description: 'Adultos de 18 años en adelante',
      color: '#F58220',
      textColor: '#ffffff',
    },
    {
      code: 'd',
      aliases: ['d'],
      label: 'D',
      description: 'Adultos, contenido explícito',
      color: '#111111',
      textColor: '#ffffff',
    },
  ],
};
