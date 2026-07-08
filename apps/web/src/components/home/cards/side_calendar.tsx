"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState, useEffect } from "react"

function SideCalendar() {

  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className='w-full flex flex-col'>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="w-full font-sans"
      />
    </div>
  )
}

export default SideCalendar