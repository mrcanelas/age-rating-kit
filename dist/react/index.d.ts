import * as react from 'react';

interface AgeRatingProps {
    system: string;
    rating: string;
    size?: number;
    className?: string;
    title?: string;
}
declare function AgeRating({ system, rating, size, className, title, }: AgeRatingProps): react.JSX.Element | null;

export { AgeRating, type AgeRatingProps };
