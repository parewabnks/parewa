import "@/app/globals.css";

export { metadata } from "@/config/site-config";

import { Oswald, Inter, Noto_Serif, Roboto_Mono } from "next/font/google";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Toaster } from "@/components/ui/sonner"

import { AppSidebar } from "@/components/layout/sidebar";

import Navbar from '@/components/layout/navbar'

import { sanityFetch, SanityLive } from "@/sanity/live";

import { defineQuery } from "next-sanity";

import Footer from "@/components/layout/footer";

import SubHeader from "@/components/layout/sub_header";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"]
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "500", "600", "700"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  weight: ["400", "500", "600", "700"],
});

const SUB_GENERAL_QUERY = defineQuery(`*[_type == "general"][0]{
  terms,
  siteTitle,
  categories[]->{
    title
  },
  links[]->{
    title,
    link
  }
}`)

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { data: general } = await sanityFetch({ query: SUB_GENERAL_QUERY });

  const categories =
    general?.categories
      ?.map((category) => category.title)
      .filter((title): title is string => title != null) ?? [];

  const links =
    general?.links
      ?.map((link) => ({ title: link.title, link: link.link }))
      .filter((link):
        link is { title: string; link: string } => link.title != null && link.link != null) ?? [];

  return (
    <html
      lang="en"
      className={`${oswald.variable} ${robotoMono.variable} ${notoSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Parewa" />

      </head>

      <body className="min-h-full">

        <SidebarProvider defaultOpen={false}>

          <AppSidebar general={general} />

          <SidebarInset>

            <div className="flex flex-col md:flex-row md:items-start">
              <SubHeader
                title={general?.siteTitle ?? ""}
                contribute={{
                  title: general?.links?.[1]?.title ?? "",
                  link: general?.links?.[1]?.link ?? "",
                }}
              />
              <div className="w-full border-l">
                <Navbar categories={categories} links={links} className='max-w-5xl' />
                {children}
              </div>
            </div>

            <Footer />

            <SanityLive />

            <Toaster />

          </SidebarInset>

        </SidebarProvider>
      </body>
    </html>
  );
}
