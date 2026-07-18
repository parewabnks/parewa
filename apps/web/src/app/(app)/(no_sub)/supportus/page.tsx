import DonationControls from "@/components/misc/DonationControls";
import { sanityFetch } from "@/sanity/live";
import Link from "next/link";

import { defineQuery } from "next-sanity";

const SUPPORTUS_QUERY = defineQuery(`
  *[_type == "general"][0]{
    logoText,
    siteTitle,
    supportUsText,
    announcement->{
      _id
    },
    categories[]->{
      "slug": slug.current,
       title 
    },
    socials[]->{
      "icon": icon.name,
      label,
      platform,
      url
    },
    privacy,
    terms,
    donorPrivacy,
    sebsdb->{
      label,
      openInNewTab,
      url
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
    links[]->{
      label,
      openInNewTab,
      url
    }
  }
`);

export default async function Page() {

  const { data: general } = await sanityFetch({ query: SUPPORTUS_QUERY });

  return (
    <main className="flex min-h-screen items-center bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col px-6 py-10 sm:px-10 lg:py-1">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div className="max-w-2xl">
            <h1 className="mb-8 font-heading text-5xl leading-[0.95] tracking-tight sm:text-6xl">
              Become a Member of
              <br />
              {general?.siteTitle}
            </h1>

            <div className="flex items-start gap-5">
              <span className="mt-3 h-5 w-20 bg-foreground" />
              <div className="flex flex-col">
                <p className="font-serif text-2xl leading-tight text-foreground/95 sm:text-4xl">
                  {general?.supportUsText}
                </p>
                <Link
                  href="/categories"
                  className="text-sm text-muted-foreground underline-offset-4 underline mt-2"
                >
                  Learn more about each donation category here
                </Link>
              </div>
            </div>
          </div>

          <DonationControls />
        </div>

        <footer className="mt-16 border-t border-border pt-6 text-sm text-muted-foreground sm:text-base">
          <p className="font-mono tracking-wide">
            © {new Date().getFullYear()} {general?.siteTitle?.toUpperCase()}
            {general?.terms ? (
              <>
                {" | "}
                <Link href={general.terms} className="underline-offset-4 hover:underline">
                  TERMS OF USE
                </Link>
              </>
            ) : null}
            {general?.donorPrivacy ? (
              <>
                {" | "}
                <Link href={general.donorPrivacy} className="underline-offset-4 hover:underline">
                  DONOR PRIVACY
                </Link>
              </>
            ) : null}
            {general?.privacy ? (
              <>
                {" | "}
                <Link href={general.privacy} className="underline-offset-4 hover:underline">
                  PRIVACY POLICY
                </Link>
              </>
            ) : null}
            {general?.about?.url ? (
              <>
                {" | "}
                <Link
                  href={general.about.url}
                  target={general.about.openInNewTab ? "_blank" : undefined}
                  rel={general.about.openInNewTab ? "noopener noreferrer" : undefined}
                  className="underline-offset-4 hover:underline"
                >
                  {general.about.label?.toUpperCase()}
                </Link>
              </>
            ) : null}
          </p>
        </footer>
      </section>
    </main>
  );
}