export interface RatingCode {
  code: string;
  aliases: string[];
  label: string;
  description: string;
  color: string;
  textColor: string;
}

export interface RatingSystem {
  id: string;
  aliases: string[];
  name: string;
  codes: RatingCode[];
}

export const classindSystem: RatingSystem = {
  id: 'classind',
  aliases: [
    'classind',
    'class-ind',
    'djctq',
    'br',
    'brazil',
    'classificação indicativa',
    'classificacao indicativa',
  ],
  name: 'ClassInd',
  codes: [
    {
      code: 'l',
      aliases: ['l', 'livre', 'al', 'g', 'all'],
      label: 'Livre',
      description: 'Livre para todos os públicos',
      color: '#338933',
      textColor: '#ffffff',
    },
    {
      code: '6',
      aliases: ['6', '6 anos', 'a6'],
      label: '6',
      description: 'Não recomendado para menores de 6 anos',
      color: '#00aeef',
      textColor: '#ffffff',
    },
    {
      code: '10',
      aliases: ['10', '10 anos', 'a10'],
      label: '10',
      description: 'Não recomendado para menores de 10 anos',
      color: '#2474b9',
      textColor: '#ffffff',
    },
    {
      code: '12',
      aliases: ['12', '12 anos', 'a12'],
      label: '12',
      description: 'Não recomendado para menores de 12 anos',
      color: '#f2c400',
      textColor: '#111111',
    },
    {
      code: '14',
      aliases: ['14', '14 anos', 'a14'],
      label: '14',
      description: 'Não recomendado para menores de 14 anos',
      color: '#e87722',
      textColor: '#111111',
    },
    {
      code: '16',
      aliases: ['16', '16 anos', 'a16'],
      label: '16',
      description: 'Não recomendado para menores de 16 anos',
      color: '#c8102e',
      textColor: '#ffffff',
    },
    {
      code: '18',
      aliases: ['18', '18 anos', 'a18'],
      label: '18',
      description: 'Não recomendado para menores de 18 anos',
      color: '#111111',
      textColor: '#ffffff',
    },
  ],
};
