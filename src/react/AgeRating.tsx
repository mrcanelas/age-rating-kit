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
  const { width, height } = iconDimensions(svg, size);

  return (
    <span
      className={className}
      role="img"
      aria-label={label}
      title={label}
      style={{
        display: 'inline-flex',
        width,
        height,
        lineHeight: 0,
      }}
      dangerouslySetInnerHTML={{ __html: sizedSvg(svg, width, height) }}
    />
  );
}

function iconDimensions(svg: string, size: number) {
  const viewBox = svg.match(/viewBox="([^"]+)"/);
  const parts = viewBox?.[1].trim().split(/[\s,]+/).map(Number);
  const vbWidth = parts?.[2];
  const vbHeight = parts?.[3];
  if (!vbWidth || !vbHeight) return { width: size, height: size };
  return {
    width: Math.max(1, Math.round((size * vbWidth) / vbHeight)),
    height: size,
  };
}

function sizedSvg(svg: string, width: number, height: number) {
  return svg.replace(/<svg\b([^>]*)>/, (_match, attrs: string) => {
    const cleaned = attrs.replace(/\s(?:width|height)="[^"]*"/g, '');
    return `<svg width="${width}" height="${height}" role="presentation"${cleaned}>`;
  });
}
