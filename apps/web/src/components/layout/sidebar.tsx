import Link from "next/link";
import { X } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";


import Image from "next/image";

import { GENERAL_QUERY_RESULT } from "@/sanity/types";

export function AppSidebar({ general }: { general: GENERAL_QUERY_RESULT }) {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="absolute z-100"
      >
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
            {(general !== null) && general.categories?.map((item) => (
              <SidebarMenuItem key={item.title} className="mb-2 list-none text-lg font-medium">
                <Link href={`articles?category=${item.title}`}>
                  {item.title}
                </Link>
              </SidebarMenuItem>
            ))}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}