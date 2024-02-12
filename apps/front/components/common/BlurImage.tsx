'use client';
import { cn } from '@repo/utils';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface Props extends ImageProps {
  zoomIn?: boolean;
}

const BlurImage = ({ alt, zoomIn, className, ...rest }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Image
      {...rest}
      alt={alt}
      className={cn(
        `w-full h-full object-cover transition-all duration-300`,
        zoomIn && 'hover:scale-110',
        isLoading
          ? 'scale-110 blur-2xl grayscale'
          : 'scale-100 blur-0 grayscale-0',
        className
      )}
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
};

export default BlurImage;
