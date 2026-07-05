import { Roboto, Lato, Oswald, Bebas_Neue } from "next/font/google";
import "@/app/globals.css";

export { metadata } from "@/config/site-config";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner"

import { AppSidebar } from "@/components/layout/Sidebar";
import { SanityLive } from "@/sanity/live";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-roboto",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-oswald",
});

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas_neue",
});

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lato',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${lato.variable} ${oswald.variable} ${bebas_neue.variable} h-full antialiased`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Parewa" />

      </head>

      <body className="min-h-full flex flex-col">

        <SidebarProvider defaultOpen={false}>

          <AppSidebar />
          
          <SidebarInset>

            {children}

            <SanityLive />

            <Toaster />

          </SidebarInset>

        </SidebarProvider>

      </body>
    </html>
  );
}
