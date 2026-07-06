import Link from "next/link";

function Navbar({ categories, links }: { categories: string[]; links: { title: string; link: string }[] }) {
  return (
    <div className='flex w-5xl justify-between font-heading text-xl font-extrabold'>
      <ul className='flex'>
        {categories.map((category) => (
          <li
            key={category}
            className={"p-5 cursor-pointer text-foreground"}>
            <Link href={`/articles?category=${category}`} target="_blank">
              {category.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
      <ul className='flex'>
        {links.map((link, index) => (
          <li
            key={link.title}
            className={`p-5 py-7 cursor-pointer ${index === 1 ? "font-bold bg-primary text-primary-foreground pr-20" : "bg-accent"}`}
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