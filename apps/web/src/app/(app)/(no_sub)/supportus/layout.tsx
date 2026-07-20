import "@/app/globals.css";
export { metadata } from "@/lib/site-config";
import { oswald, inter, notoSerif, robotoMono, roboto } from "@/lib/fonts";
import { SanityLive } from "@/sanity/live";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} ${notoSerif.variable} ${robotoMono.variable} ${roboto.variable} h-full antialiased`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Parewa" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
