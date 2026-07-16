import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";

import Navbar from "@/components/layout/Navbar";
import Slider from "@/components/home/Slider";
import { Header } from "@/components/layout/Header";
import { urlFor } from "@/sanity/image";
import { categoriesSchema, rlinkSchema, slideSchema } from "@/schemas/backend_schemas/homePageSchema";
import Main from "@/components/home/main";
import ArticlesSection from "@/components/cards/ArticlesSection";

const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "general"][0]{
    logoText,
    sliders[]->{
      title,
      author,
      image
    },
    categories[]->{
    "slug": slug.current,
     title 
    },
    supportUs->{
      label,
      openInNewTab,
      url
    },
    about->{
      label,
      openInNewTab,
      url
    },
  }
`)

export default async function Home() {

  const { data: home } = await sanityFetch({ query: HOME_PAGE_QUERY });

  const slides = home?.sliders?.flatMap((slide) => {
    const parsed = slideSchema.safeParse(slide);
    if (!parsed.success) return [];

    return [{
      title: parsed.data.title,
      author: parsed.data.author,
      image: slide.image ? urlFor(slide.image).url() : "https://placehold.co/1920x1080/png"
    }];
  }) || [];

  const categories = home?.categories?.flatMap((category) => {
    const parsed = categoriesSchema.safeParse(category);
    if (!parsed.success) return [];

    return [{
      slug: parsed.data.slug,
      title: parsed.data.title
    }];
  }) || [];

  const supportUsParsed = rlinkSchema.safeParse(home?.supportUs);

  const aboutParsed = rlinkSchema.safeParse(home?.about);

  const supportUs = supportUsParsed.success
    ? supportUsParsed.data
    : {
      label: "Support Us",
      openInNewTab: false,
      url: "/support-us",
    };

  const about = aboutParsed.success
    ? aboutParsed.data
    : {
      label: "About Us",
      openInNewTab: false,
      url: "/about",
    };

  return (
    <div className="h-full">
      <Header title={home?.logoText ?? ""} />

      <Slider slides={slides} />

      <div className="px-2 md:px-[5%] xl:px-[9%]">
        <Navbar
          categories={categories}
          supportUs={supportUs}
          about={about}
          className="3xl:mx-auto max-w-7xl"
        />
        <div className="px-5">
          <Main />

          {categories.slice(0, 4).map((category) => (
            <ArticlesSection key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}