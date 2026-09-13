import { getIconSvg, getRatingMeta } from '../index.js';

export interface AgeRatingProps {
  system: string;
  rating: string;
  size?: number;
  className?: string;
  title?: string;
}

export function AgeRating({
  system,
  rating,
  size = 32,
  className,
  title,
}: AgeRatingProps) {
  const svg = getIconSvg(system, rating);
  const meta = getRatingMeta(system, rating);
  if (!svg) return null;

  const label = title ?? meta?.description ?? meta?.label ?? `${system} ${rating}`;
  const markup = svg.replace(
    '<svg ',
    `<svg width="${size}" height="${size}" role="presentation" `
  );

  return (
    <span
      className={className}
      role="img"
      aria-label={label}
      title={label}
      style={{
        display: 'inline-flex',
        width: size,
        height: size,
        lineHeight: 0,
      }}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
