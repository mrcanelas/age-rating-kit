import type { RatingSystem } from './classind.js';

export const iarcSystem: RatingSystem = {
  id: 'iarc',
  aliases: ['iarc', 'international age rating coalition'],
  name: 'IARC',
  codes: [
    {
      code: '3-plus',
      aliases: ['3-plus', '3+', '3'],
      label: '3+',
      description: 'Ages 3 and over',
      color: '#8DC53E',
      textColor: '#ffffff',
    },
    {
      code: '7-plus',
      aliases: ['7-plus', '7+', '7'],
      label: '7+',
      description: 'Ages 7 and over',
      color: '#F3B23E',
      textColor: '#111111',
    },
    {
      code: '12-plus',
      aliases: ['12-plus', '12+', '12'],
      label: '12+',
      description: 'Ages 12 and over',
      color: '#E98C2F',
      textColor: '#ffffff',
    },
    {
      code: '16-plus',
      aliases: ['16-plus', '16+', '16'],
      label: '16+',
      description: 'Ages 16 and over',
      color: '#E25727',
      textColor: '#ffffff',
    },
    {
      code: '18-plus',
      aliases: ['18-plus', '18+', '18'],
      label: '18+',
      description: 'Ages 18 and over',
      color: '#CC1F2F',
      textColor: '#ffffff',
    },
  ],
};
