import "@/app/globals.css";
export { metadata } from "@/lib/site-config";
import { Oswald, Inter, Noto_Serif, Roboto_Mono, Roboto } from "next/font/google";

import { Toaster } from "@/components/ui/sonner"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/layout/Sidebar";
import { sanityFetch, SanityLive } from "@/sanity/live";
import { defineQuery } from "next-sanity";

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

const roboto = Roboto({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-roboto',
});


const HOME_PAGE_QUERY = defineQuery(`
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
  
  const { data: general } = await sanityFetch({ query: HOME_PAGE_QUERY });

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
            <SanityLive />
            <Toaster richColors position="bottom-right" />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
