import React from 'react';
import { responsiveImage } from '../../lib/images';

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & { src: string };

/**
 * Drop-in <img> that serves resized WebP variants for local photos
 * (/images/*.jpg|webp) and passes remote URLs through untouched.
 * Lazy + async decoding by default; pass loading="eager" / fetchPriority for LCP images.
 */
export const Img: React.FC<ImgProps> = ({ src, sizes, loading, decoding, ...rest }) => {
  const r = responsiveImage(src);
  return (
    <img
      {...rest}
      src={r.src}
      srcSet={r.srcSet}
      sizes={r.srcSet ? sizes ?? '100vw' : undefined}
      loading={loading ?? 'lazy'}
      decoding={decoding ?? 'async'}
    />
  );
};
