import type { RatingSystem } from './classind.js';

export const uskSystem: RatingSystem = {
  id: 'usk',
  aliases: ['usk', 'unterhaltungssoftware selbstkontrolle'],
  name: 'USK',
  codes: [
    {
      code: '0',
      aliases: ['0', 'usk 0'],
      label: '0',
      description: 'Approved without age restriction',
      color: '#ffffff',
      textColor: '#111111',
    },
    {
      code: '6',
      aliases: ['6', 'usk 6'],
      label: '6',
      description: 'Approved for ages 6 and above',
      color: '#FFED00',
      textColor: '#111111',
    },
    {
      code: '12',
      aliases: ['12', 'usk 12'],
      label: '12',
      description: 'Approved for ages 12 and above',
      color: '#39B54A',
      textColor: '#ffffff',
    },
    {
      code: '16',
      aliases: ['16', 'usk 16'],
      label: '16',
      description: 'Approved for ages 16 and above',
      color: '#0072BC',
      textColor: '#ffffff',
    },
    {
      code: '18',
      aliases: ['18', 'usk 18'],
      label: '18',
      description: 'Not approved for young persons',
      color: '#E60012',
      textColor: '#ffffff',
    },
  ],
};
