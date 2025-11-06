"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import resolvedImage from "@/lib/resolvedImage";

interface ProductCarouselProps {
  images: { url: string; alternativeText?: string }[];
}

export function ImageCarousel({ images }: { images: Image[] }) {
  console.log(images);
  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-200 h-[500px] w-full">
        🥺
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      orientation="horizontal"
      className="w-full max-w-xs "
    >
      <CarouselContent className=" h-[400px]">
        {images.map((image) => (
          <CarouselItem className="h-full" key={image.documentId}>
            <Image
              className="w-full object-fit"
              width={150}
              height={150}
              alt={image.alternativeText || ""}
              src={resolvedImage(image.url)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="cursor-pointer" />
      <CarouselNext className="cursor-pointer" />
    </Carousel>
  );
}
