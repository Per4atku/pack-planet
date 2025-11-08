"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import resolvedImage from "@/lib/resolvedImage";

export default function ImageCarousel({ images }: { images: Image[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleThumbClick = React.useCallback(
    (index: number) => api?.scrollTo(index),
    [api]
  );

  if (!images || images.length == 0)
    return (
      <div className="w-full border rounded-lg max-w-xs mx-auto aspect-square flex flex-col items-center justify-center text-gray-400 space-y-2">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-lg">🖼️</span>
        </div>
        <span className="text-sm font-medium italic">Картинка отсутствует</span>
      </div>
    );
  return (
    <div className="mx-auto w-full">
      {/* Main carousel */}
      <Carousel
        opts={{ loop: true }}
        setApi={setApi}
        className="w-full max-w-xs mx-auto"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                className="object-contain w-full aspect-square"
                alt={image.alternativeText || ""}
                src={resolvedImage(image.url)}
                width={1080}
                height={1080}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length >= 2 && (
          <>
            <CarouselNext className="-right-2" />
            <CarouselPrevious className="-left-2" />
          </>
        )}
      </Carousel>

      {/* Thumbnail carousel with scrollbar */}
      <div className="mt-4 w-full max- overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 rounded-md">
        <div className="flex gap-2 p-1 w-max">
          {images.map((image, index) => (
            <Image
              src={resolvedImage(image.url)}
              width={120}
              height={120}
              alt={image.alternativeText || ""}
              key={index}
              className={cn(
                "shrink-0 w-20 h-20 rounded-md border cursor-pointer flex items-center p-4 justify-center object-contain",
                current === index + 1
                  ? "border-2 border-eco-green opacity-100"
                  : "border border-gray-300 opacity-60 hover:opacity-90"
              )}
              onClick={() => handleThumbClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
