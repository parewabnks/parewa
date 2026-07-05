"use client"

import { useState } from "react"

function Navbar({ categories, links }: { categories: string[]; links: { title: string; link: string }[] }) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  return (
    <div className='flex justify-between'>
      <ul className='flex'>
        {categories.map((category) => (
          <li
            key={category}
            className={`text-2xl p-5 cursor-pointer ${activeCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`} onClick={() => setActiveCategory(category)}
          >
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