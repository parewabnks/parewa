import Link from "next/link";
import { cn } from "@/lib/utils";

function Navbar({
  categories,
  links,
  className,
}: {
  categories: string[];
  links: { title: string; link: string }[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col md:flex-row justify-between font-heading text-xl font-extrabold", className)}>
      <ul className='flex text-center md:text-start flex-col md:flex-row'>
        {categories.map((category) => (
          <li
            key={category}
            className={"p-5 cursor-pointer text-foreground"}>
            <Link href={`/articles?category=${category.toLowerCase()}`}>
              {category.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
      <ul className='flex text-center md:text-start flex-col md:flex-row'>
        {links.slice(0, 2).map((link, index) => (
          <li
            key={link.title}
            className={`p-5 py-7 cursor-pointer ${index === 1 ? "font-bold bg-primary text-primary-foreground md:pr-20" : "bg-accent"}`}
          >
            <Link href={link.link} target="_blank" rel="noopener noreferrer">
              {link.title.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Navbar