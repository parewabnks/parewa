import "@/app/globals.css";

export { metadata } from "@/config/site-config";

import { Oswald, Inter, Noto_Serif, Roboto_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/layout/sidebar";

import { sanityFetch, SanityLive } from "@/sanity/live";

import { defineQuery } from "next-sanity";

import Footer from "@/components/layout/footer";

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

const GENERAL_QUERY = defineQuery(`*[_type == "general"][0]{
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

  const { data: general } = await sanityFetch({ query: GENERAL_QUERY });

  return (
    <html
      lang="en"
      className={`${oswald.variable} ${robotoMono.variable} ${notoSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Parewa" />

      </head>

      <body className="min-h-full flex flex-col">

        <SidebarProvider defaultOpen={false}>

          <AppSidebar general={general} />

          <SidebarInset>

            {children}

            <Footer />

            <SanityLive />

            <Toaster />

          </SidebarInset>

        </SidebarProvider>

      </body>
    </html>
  );
}
