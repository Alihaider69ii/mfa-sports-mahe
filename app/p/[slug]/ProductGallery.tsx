'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImagePaths } from '@/lib/types';

interface ProductGalleryProps {
  images: ProductImagePaths[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square rounded bg-pitch-card border border-pitch-border flex items-center justify-center">
        <Image
          src="/img/logo.png"
          alt={productName}
          width={200}
          height={80}
          className="object-contain"
        />
      </div>
    );
  }

  const currentImg = images[selectedIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-square rounded-sm overflow-hidden bg-pitch-card border border-pitch-border shadow-pitch-card">
        <Image
          src={currentImg.w800 || currentImg.w640 || currentImg.w360}
          alt={`${productName} view ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center transition-all duration-300"
        />
      </div>

      {/* Gallery Thumbnails (Only if more than one image exists) */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xs overflow-hidden border-2 shrink-0 transition-all ${
                selectedIndex === idx
                  ? 'border-volt shadow-volt-glow'
                  : 'border-pitch-border opacity-70 hover:opacity-100 hover:border-slate-400'
              }`}
            >
              <Image
                src={img.w360}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
