import Image from "next/image";

import {
  SidebarTrigger2,
} from "@/components/ui/sidebar";

import { defineQuery } from "next-sanity";

import { sanityFetch } from "@/sanity/live";

import Slider from "@/components/home/slider";

import { Header } from "@/components/layout/header";

import { urlFor } from "@/sanity/image";

const SLIDER_QUERY = defineQuery(`*[_type == "general"][0]{
  siteTitle,
  sliders[]->{
    title,
    author,
    image
  }
}`)

export default async function Home() {

  const { data } = await sanityFetch({ query: SLIDER_QUERY });

  const slides = data?.sliders?.map((slide) => ({
    title: slide.title || "",
    author: slide.author || "",
    image: slide.image ? urlFor(slide.image).url() : "https://placehold.co/1920x1080/png"
  })) ?? [];

  return (
    <div className="h-full">

      <Header title={data?.siteTitle} />

      <Slider data={{ slides }} />

    </div>
  );
}
