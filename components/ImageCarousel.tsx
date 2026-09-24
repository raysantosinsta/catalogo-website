"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ImageCarousel({ images, altPrefix, title, titleColor }: { images: string[], altPrefix: string, title?: string, titleColor?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden border border-[var(--border)] group bg-black/20">
      <div 
        className="absolute inset-0 transition-transform duration-500 ease-in-out flex" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full h-full relative flex-shrink-0">
            <Image src={img} alt={`${altPrefix} ${i+1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button 
            onClick={prevSlide} 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--accent)] hover:text-black border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide} 
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--accent)] hover:text-black border border-white/10"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? 'bg-[var(--accent)]' : 'bg-white/40'}`} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
