import type { RatingSystem } from './classind.js';

export const fskSystem: RatingSystem = {
  id: 'fsk',
  aliases: ['fsk', 'freiwillige selbstkontrolle der filmwirtschaft'],
  name: 'FSK',
  codes: [
    {
      code: '0',
      aliases: ['0', 'fsk 0', 'ohne altersbeschränkung', 'ohne altersbeschrankung'],
      label: '0',
      description: 'Freigegeben ohne Altersbeschränkung',
      color: '#ffffff',
      textColor: '#111111',
    },
    {
      code: '6',
      aliases: ['6', 'fsk 6', 'ab 6'],
      label: '6',
      description: 'Freigegeben ab 6 Jahren',
      color: '#FFED00',
      textColor: '#111111',
    },
    {
      code: '12',
      aliases: ['12', 'fsk 12', 'ab 12'],
      label: '12',
      description: 'Freigegeben ab 12 Jahren',
      color: '#009640',
      textColor: '#ffffff',
    },
    {
      code: '16',
      aliases: ['16', 'fsk 16', 'ab 16'],
      label: '16',
      description: 'Freigegeben ab 16 Jahren',
      color: '#005CA9',
      textColor: '#ffffff',
    },
    {
      code: '18',
      aliases: ['18', 'fsk 18', 'keine jugendfreigabe'],
      label: '18',
      description: 'Keine Jugendfreigabe',
      color: '#E30613',
      textColor: '#ffffff',
    },
  ],
};
