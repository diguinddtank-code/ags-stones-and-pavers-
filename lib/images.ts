/**
 * Responsive image helpers. Every photo in public/images has WebP variants in
 * public/images/opt/<name>-<width>.webp (made by scripts/optimize-images.mjs,
 * which runs at the start of `npm run build`).
 */
export const IMAGE_WIDTHS = [480, 828, 1200, 1680] as const;

const LOCAL_PHOTO = /^\/images\/([^/]+)\.(?:jpe?g|png|webp)$/i;

export function responsiveImage(src: string, fallbackWidth = 1200) {
  const match = src.match(LOCAL_PHOTO);
  if (!match) return { src, srcSet: undefined as string | undefined };
  const base = match[1];
  return {
    src: `/images/opt/${base}-${fallbackWidth}.webp`,
    srcSet: IMAGE_WIDTHS.map((w) => `/images/opt/${base}-${w}.webp ${w}w`).join(', '),
  };
}
