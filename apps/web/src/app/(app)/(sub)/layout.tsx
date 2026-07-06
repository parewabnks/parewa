import { Oswald, Inter } from "next/font/google";
import "@/app/globals.css";

export { metadata } from "@/config/site-config";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner"

import { AppSidebar } from "@/components/layout/sidebar";

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
      className={`${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Parewa" />

      </head>

      <body className="min-h-full flex flex-col">

        <SidebarProvider defaultOpen={false}>

          <AppSidebar general={general} />

          <SidebarInset>

            <div className="flex items-start relative">
              <SubHeader
                title={general?.siteTitle ?? ""}
                contribute={{
                  title: general?.links?.[1]?.title ?? "",
                  link: general?.links?.[1]?.link ?? "",
                }}
              />
              <div className="">
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
