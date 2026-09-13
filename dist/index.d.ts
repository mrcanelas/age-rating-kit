interface RatingCode {
    code: string;
    aliases: string[];
    label: string;
    description: string;
    color: string;
    textColor: string;
}
interface RatingSystem {
    id: string;
    aliases: string[];
    name: string;
    codes: RatingCode[];
}

declare const RATING_SYSTEMS: readonly [RatingSystem, RatingSystem, RatingSystem, RatingSystem, RatingSystem];

interface RatingMeta {
    system: string;
    systemName: string;
    code: string;
    label: string;
    description: string;
    color: string;
    textColor: string;
}
declare function listSystems(): RatingSystem[];
declare function getRatingMeta(system: string | undefined, rating: string | undefined): RatingMeta | undefined;
declare function listCodes(system: string): RatingCode[] | undefined;

interface NormalizedRating {
    system: string;
    code: string;
}
declare function normalizeSystem(system?: string): RatingSystem | undefined;
declare function normalizeRating(system: string | undefined, rating: string | undefined): NormalizedRating | undefined;

declare const DEFAULT_ICON_BASE_URL = "https://cdn.jsdelivr.net/gh/mrcanelas/age-rating-kit@latest";
interface IconUrlOptions {
    baseUrl?: string;
}
declare function getIconSvg(system: string | undefined, rating: string | undefined): string | undefined;
declare function getIconPath(system: string | undefined, rating: string | undefined): string | undefined;
declare function getIconUrl(system: string | undefined, rating: string | undefined, options?: IconUrlOptions): string | undefined;

export { DEFAULT_ICON_BASE_URL, type IconUrlOptions, type NormalizedRating, RATING_SYSTEMS, type RatingCode, type RatingMeta, type RatingSystem, getIconPath, getIconSvg, getIconUrl, getRatingMeta, listCodes, listSystems, normalizeRating, normalizeSystem };
