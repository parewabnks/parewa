import "@/app/globals.css";
export { metadata } from "@/lib/site-config";
import { oswald, inter, notoSerif, robotoMono, roboto } from "@/lib/fonts";

import { Toaster } from "@/components/ui/sonner"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/layout/Sidebar";
import { sanityFetch, SanityLive } from "@/sanity/live";
import { defineQuery } from "next-sanity";
import Footer from "@/components/layout/Footer";


const HOME_LAYOUT_QUERY = defineQuery(`
  *[_type == "general"][0]{
    logoText,
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { data: general } = await sanityFetch({ query: HOME_LAYOUT_QUERY });

  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} ${notoSerif.variable} ${robotoMono.variable} ${roboto.variable} h-full antialiased`}
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
            <Toaster richColors position="bottom-right" />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
