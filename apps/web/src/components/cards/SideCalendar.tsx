"use client"

import React, { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import EventCard from "./EventCard"

interface Event {
  title: string
  datetime: string
  slug: string
}

interface ApiEvent {
  title?: string
  date?: string
}

function SideCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    if (!date) return

    const fetchEvents = async () => {
      try {
        const formattedDate = date.toLocaleDateString("en-CA")
        const params = new URLSearchParams({ date: formattedDate })
        const res = await fetch(`/api/get_events?${params.toString()}`)

        if (!res.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await res.json()
        const normalizedEvents = Array.isArray(data.events)
          ? data.events.map((event: ApiEvent) => ({
            title: event.title ?? "",
            datetime: event.date ?? "",
          }))
          : []
        setEvents(normalizedEvents)
      } catch (error) {
        console.error("Failed to fetch events:", error)
        setEvents([])
      }
    }
    fetchEvents()
  }, [date])

  return (
    <div className='flex flex-col md:w-[23vw] gap-5'>
      <div className='w-full flex flex-col max-w-100 mx-auto'>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full font-sans"
        />
      </div>
      <div className='px-10 flex flex-col gap-3'>
        <div className="title font-heading text-2xl w-full text-center text-primary-foreground p-2 relative isolate">
          <div
            className="absolute inset-0 bg-primary -z-10 w-2/3 min-w-25 max-w-50 mx-auto"
            style={{ clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)" }}
          ></div>
          Events
        </div>

        <div className="cards flex flex-col gap-3">
          {events.length === 0 ? (
            <p className="text-center text-lg mt-6 text-muted-foreground ">No events</p>
          ) : (
            events.map((event) => (
              <EventCard key={event.slug} title={event.title} datetime={event.datetime} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SideCalendar