'use client'

import { useEffect, useState } from 'react'

import { SidebarTrigger2 } from '../ui/sidebar'
import Link from 'next/link'

function SubHeader({ title, contribute }: { title: string, contribute: { title: string, link: string } }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50) // threshold before it appears
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='sticky top-0 z-50 flex flex-col items-end'>
      <div className="flex bg-tertiary w-full lg:w-100 h-30 p-5 items-center gap-5 z-10">
        <SidebarTrigger2 className='text-primary-foreground hover:bg-transparent hover:text-primary-foreground cursor-pointer' />
        <div className="title w-20 text-primary-foreground text-3xl md:text-4xl font-bold font-sans">
          <Link href="/">
            {title}
          </Link>
        </div>
      </div>
      <div
        className={`support flex justify-center items-center lg:w-40 bg-primary h-15 text-primary-foreground font-heading text-2xl p-2 transition-transform duration-300 ease-in-out ${scrolled ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <span>
          {contribute.title.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

export default SubHeader