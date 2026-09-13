# age-rating-kit

SVG age-rating icons and helpers for ClassInd, MPA, TV Parental Guidelines, PEGI and ESRB.

Icons are original redraws of the official shapes (same idea as [circle-flags](https://github.com/HatScripts/circle-flags)): one file per code, `viewBox="0 0 512 512"`, no external fonts. Wikimedia Commons and each board’s style guide were used only as visual reference.

These marks belong to the rating bodies. This project is not affiliated with SNJ/DJCTQ, MPA, the FCC, PEGI or ESRB. Use the icons to identify a rating, and credit ClassInd / SNJ–DJCTQ when showing Brazilian ratings.

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

Gallery: <https://mrcanelas.github.io/age-rating-kit/>

## License

MIT for the kit source and generated SVGs.
