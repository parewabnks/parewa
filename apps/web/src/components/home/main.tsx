import React from 'react'
import MainStory from './cards/main_story'
import SideCalendar from './cards/side_calendar'

function Main() {
  return (
    <div className='pt-10 font-bold'>
        <span className='text-5xl font-heading'>
            Top Stories
        </span>

        <div className="flex justify-between my-6 gap-0">
            <div className='flex flex-col w-[58vw] gap-4'>
                <MainStory />
                
                <MainStory />
                
                <MainStory />
            </div>
            <div className='flex flex-col w-[20vw]'>
                <SideCalendar />
            </div>
        </div>

    </div>
  )
}
export default Main