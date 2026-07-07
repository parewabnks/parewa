import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";


import Image from "next/image";

import { GENERAL_QUERY_RESULT } from "@/sanity/types";

import { Search } from "lucide-react";

export function AppSidebar({ general }: { general: GENERAL_QUERY_RESULT }) {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="flixed z-100 bg-background"
    >
      <SidebarContent>
        <div className="px-8 py-10">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-3xl font-extrabold flex items-center justify-between gap-3">
              <Image src="/logo.png" alt="Parewa Logo" width={64} height={64} />
              {general?.siteTitle}
            </Link>
            <SidebarTrigger className="text-foreground hover:bg-transparent hover:text-foreground cursor-pointer" />
          </div>
          <div className="mt-10 px-5 pr-10">
            <Search size={22} className="text-accent-foreground" />
            <div className="mt-5">
              {(general !== null) && general.categories?.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-3 list-none text-md font-extrabold ">
                  <Link href={`articles?category=${item.title?.toLowerCase()}`}>
                    {item.title?.toUpperCase()}
                  </Link>
                </SidebarMenuItem>
              ))}
            </div>
            <div className="">
              {general !== null && general.links?.[1] && (
                <Link href={general.links[1].link || ""} target="_blank">
                  <SidebarMenuItem
                    key={general.links[1].title}
                    className="mb-3 list-none text-md font-extrabold p-4 cursor-pointer bg-primary text-primary-foreground"
                  >
                    {general.links[1].title?.toUpperCase()}
                  </SidebarMenuItem>
                </Link>
              )}
            </div>

            {general !== null && general.links?.[0] && (
              <Link href={general.links[0].link || ""} target="_blank">
                <SidebarMenuItem
                  key={general.links[0].title}
                  className="mb-3 list-none text-md font-extrabold p-4 cursor-pointer text-foreground bg-accent border-2 border-foreground"
                >
                  {general.links[0].title?.toUpperCase()}
                </SidebarMenuItem>
              </Link>
            )}

            {general !== null && general.links?.[2] && (
              <Link href={general.links[2].link || ""} target="_blank">
                <SidebarMenuItem
                  key={general.links[2].title}
                  className="mb-3 list-none text-md font-extrabold p-4 cursor-pointer text-foreground bg-accent border-2 border-foreground"
                >
                  {general.links[2].title?.toUpperCase()}
                </SidebarMenuItem>
              </Link>
            )}

          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}