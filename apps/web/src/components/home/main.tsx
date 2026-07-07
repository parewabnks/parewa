import MainStory from './cards/main_story'
import SideCalendar from './cards/side_calendar'

function Main() {
  return (
    <div className='pt-10 font-bold w-full'>
        <span className='text-4xl md:text-5xl font-heading'>
            Top Stories
        </span>

        <div className="flex justify-between my-6 gap-5 md:gap-0 flex-col md:flex-row">
            <div className='flex flex-col md:w-[58vw] gap-4'>
                <MainStory />
                
                <MainStory />
                
                <MainStory />
            </div>
            <div className='flex flex-col md:w-[20vw]'>
                <SideCalendar />
            </div>
        </div>

    </div>
  )
}
export default Main