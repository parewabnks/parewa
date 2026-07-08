import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity"
import EventCard from "./event_card";

const EVENTS_QUERY = defineQuery(`*[_type == "event"] {
  title,
  datetime
}`)

async function Events() {

  const { data } = await sanityFetch({ query: EVENTS_QUERY });

  return (
    <div className='px-10 flex flex-col gap-7'>
      <div className="title font-heading text-2xl w-full text-center text-primary-foreground p-2 relative isolate">
        <div
          className="absolute w-2/3 h-full -z-10 bg-secondary translate-x-10 translate-y-px"
          style={{ clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)" }}
        ></div>
        <div
          className="absolute inset-0 bg-primary -z-10 w-2/3 mx-auto"
          style={{ clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)" }}
        ></div>
        Events
      </div>

      <div className="cards">
        {data.map((event, i) => (
          <EventCard key={i} title={event.title} datetime={event.datetime} />
        ))}
      </div>
    </div>
  )
}

export default Events