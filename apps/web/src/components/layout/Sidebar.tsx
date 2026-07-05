import Link from "next/link";
import { X } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { defineQuery, groq } from "next-sanity";

import { sanityFetch } from "@/sanity/live";

import Image from "next/image";

const CATEGORY_QUERY = defineQuery(`*[_type == "menu"][0]{
  categories[]->{
    title
  }
}`);

const GENERAL_QUERY = defineQuery(`*[_type == "general"][0]{
  terms,
  siteTitle,
}`)

export async function AppSidebar() {

  const { data: menu } = await sanityFetch({ query: CATEGORY_QUERY });

  const { data: general } = await sanityFetch({ query: GENERAL_QUERY });

  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas">
      <SidebarContent>
        <div className="px-8 py-10">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-2xl font-bold flex items-center justify-between gap-3">
              <Image src="/logo.png" alt="Parewa Logo" width={64} height={64} />
              {general?.siteTitle}
            </Link>
            <SidebarTrigger>
              <X className="h-5 w-5" />
            </SidebarTrigger>
          </div>

          <div>
            {(menu !== null) && menu.categories?.map((item) => (
              <SidebarMenuItem key={item.title} className="mb-2 list-none text-lg font-medium">
                <a href={"articles?category=" + item.title}>{item.title}</a>
              </SidebarMenuItem>
            ))}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}