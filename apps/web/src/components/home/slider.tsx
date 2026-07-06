"use client"

import * as React from "react"

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card"

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"

import Autoplay from 'embla-carousel-autoplay';

import { SLIDER_QUERY_RESULT } from "@/sanity/types";

interface Slide {
  title: string
  author: string
  image: string
}

interface SliderProps {
  slides: Slide[]
}

export default function Slider({ data }: { data: SliderProps }) {

  const autoplayPlugin = React.useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));

  return (
    <Carousel
      className="overflow-hidden w-full h-[30vh] md:h-110 relative"
      plugins={[autoplayPlugin.current]}
      onMouseEnter={autoplayPlugin.current.stop}
      onMouseLeave={autoplayPlugin.current.reset}
    >
      <CarouselContent className="h-full">
        {data?.slides?.map((slide, index) => (
          <CarouselItem key={index} className="h-full">
            <div className="relative h-full w-full">
              <Image
                src={slide?.image}
                alt={slide.title || "Slider Image"}
                className="object-cover"
                fill
                priority={index === 0}
              />
              <Card className="relative rounded-none h-full bg-transparent">
                <CardContent className="flex items-end justify-start p-12 h-full">
                  <div className="max-w-4xl pl-10">
                    <div className="text-7xl font-extrabold text-primary-foreground font-heading">{slide.title.toUpperCase()}</div>
                    <div className="text-lg italic mt-3 text-primary-foreground font-sans"> - {slide.author}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  )
}
