# age-rating-kit

SVG age-rating icons and helpers for ClassInd, MPA, TV Parental Guidelines, PEGI, ESRB, BBFC, FSK, USK, CERO and the Australian Classification Board.

Each rating is one SVG file from [Wikimedia Commons](https://commons.wikimedia.org/).

These marks belong to the rating bodies. This project is not affiliated with them. Use the icons to identify a rating, and credit ClassInd / SNJ–DJCTQ when showing Brazilian ratings.

<br/><img src="https://cdn.jsdelivr.net/gh/mrcanelas/age-rating-kit@latest/icons/classind/l.svg" width="48"> <img src="https://cdn.jsdelivr.net/gh/mrcanelas/age-rating-kit@latest/icons/classind/6.svg" width="48"> <img src="https://cdn.jsdelivr.net/gh/mrcanelas/age-rating-kit@latest/icons/classind/10.svg" width="48"> <img src="https://cdn.jsdelivr.net/gh/mrcanelas/age-rating-kit@latest/icons/classind/12.svg" width="48"> <img src="https://cdn.jsdelivr.net/gh/mrcanelas/age-rating-kit@latest/icons/classind/14.svg" width="48"> <img src="https://cdn.jsdelivr.net/gh/mrcanelas/age-rating-kit@latest/icons/classind/16.svg" width="48"> <img src="https://cdn.jsdelivr.net/gh/mrcanelas/age-rating-kit@latest/icons/classind/18.svg" width="48">

## Usage

```tsx
import { AgeRating } from 'age-rating-kit/react'

<AgeRating system="classind" rating="14" />
<AgeRating system="mpa" rating="PG-13" />
<AgeRating system="DJCTQ" rating="Livre" />
```

```ts
import { getIconUrl, normalizeRating } from 'age-rating-kit'

normalizeRating('ClassInd', 'Livre')
// { system: 'classind', code: 'l' }

getIconUrl('classind', '14')
// https://cdn.jsdelivr.net/gh/mrcanelas/age-rating-kit@latest/icons/classind/14.svg
```

CDN:

```text
https://cdn.jsdelivr.net/gh/mrcanelas/age-rating-kit@latest/icons/{system}/{code}.svg
https://mrcanelas.github.io/age-rating-kit/icons/classind/12.svg
```

`react` is an optional peer. The root entry does not import React.

## Systems

| `system` | Folder | Aliases | Codes |
|----------|--------|---------|--------|
| `classind` | `icons/classind/` | ClassInd, DJCTQ, BR | `l`, `6`, `10`, `12`, `14`, `16`, `18` |
| `mpa` | `icons/mpa/` | mpaa, MPAA, MPA | `g`, `pg`, `pg-13`, `r`, `nc-17` |
| `tv-pg` | `icons/tv-pg/` | TV Parental Guidelines | `tv-y`, `tv-y7`, `tv-g`, `tv-pg`, `tv-14`, `tv-ma` |
| `pegi` | `icons/pegi/` | PEGI | `3`, `7`, `12`, `16`, `18` |
| `esrb` | `icons/esrb/` | ESRB | `e`, `e10-plus`, `t`, `m`, `ao` |
| `bbfc` | `icons/bbfc/` | British Board of Film Classification | `u`, `pg`, `12a`, `12`, `15`, `18`, `r18` |
| `fsk` | `icons/fsk/` | Freiwillige Selbstkontrolle der Filmwirtschaft | `0`, `6`, `12`, `16`, `18` |
| `usk` | `icons/usk/` | Unterhaltungssoftware Selbstkontrolle | `0`, `6`, `12`, `16`, `18` |
| `cero` | `icons/cero/` | Computer Entertainment Rating Organization | `a`, `b`, `c`, `d`, `z` |
| `acb` | `icons/acb/` | Australian Classification Board, Australia | `g`, `pg`, `m`, `ma15-plus`, `r18-plus`, `x18-plus` |

Gallery: <https://mrcanelas.github.io/age-rating-kit/>

## License

MIT for the kit source. The SVG marks are trademarks of the rating bodies and keep the license of their Wikimedia Commons files.
