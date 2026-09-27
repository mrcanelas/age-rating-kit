import classindL from '../icons/classind/l.svg';
import classind6 from '../icons/classind/6.svg';
import classind10 from '../icons/classind/10.svg';
import classind12 from '../icons/classind/12.svg';
import classind14 from '../icons/classind/14.svg';
import classind16 from '../icons/classind/16.svg';
import classind18 from '../icons/classind/18.svg';
import mpaG from '../icons/mpa/g.svg';
import mpaPg from '../icons/mpa/pg.svg';
import mpaPg13 from '../icons/mpa/pg-13.svg';
import mpaR from '../icons/mpa/r.svg';
import mpaNc17 from '../icons/mpa/nc-17.svg';
import tvY from '../icons/tv-pg/tv-y.svg';
import tvY7 from '../icons/tv-pg/tv-y7.svg';
import tvG from '../icons/tv-pg/tv-g.svg';
import tvPg from '../icons/tv-pg/tv-pg.svg';
import tv14 from '../icons/tv-pg/tv-14.svg';
import tvMa from '../icons/tv-pg/tv-ma.svg';
import pegi3 from '../icons/pegi/3.svg';
import pegi7 from '../icons/pegi/7.svg';
import pegi12 from '../icons/pegi/12.svg';
import pegi16 from '../icons/pegi/16.svg';
import pegi18 from '../icons/pegi/18.svg';
import esrbE from '../icons/esrb/e.svg';
import esrbE10Plus from '../icons/esrb/e10-plus.svg';
import esrbT from '../icons/esrb/t.svg';
import esrbM from '../icons/esrb/m.svg';
import esrbAo from '../icons/esrb/ao.svg';

export const ICON_SVGS: Record<string, Record<string, string>> = {
  classind: {
    l: classindL,
    '6': classind6,
    '10': classind10,
    '12': classind12,
    '14': classind14,
    '16': classind16,
    '18': classind18,
  },
  mpa: {
    g: mpaG,
    pg: mpaPg,
    'pg-13': mpaPg13,
    r: mpaR,
    'nc-17': mpaNc17,
  },
  'tv-pg': {
    'tv-y': tvY,
    'tv-y7': tvY7,
    'tv-g': tvG,
    'tv-pg': tvPg,
    'tv-14': tv14,
    'tv-ma': tvMa,
  },
  pegi: {
    '3': pegi3,
    '7': pegi7,
    '12': pegi12,
    '16': pegi16,
    '18': pegi18,
  },
  esrb: {
    e: esrbE,
    'e10-plus': esrbE10Plus,
    t: esrbT,
    m: esrbM,
    ao: esrbAo,
  },
};
