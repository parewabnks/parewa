function Navbar({ categories, links }: { categories: string[]; links: { title: string; link: string }[] }) {
  return (
    <div className='flex justify-between'>
      <ul className='flex'>
        {categories.map((category) => (
          <li
            key={category}
            className={"text-2xl p-5 cursor-pointe text-gray-700"}>
            {category}
          </li>
        ))}
      </ul>
      <ul className='flex'>
        {links.map((link) => (
          <li key={link.title} className='text-2xl p-5 cursor-pointer'>
            <a href={link.link} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Navbar