interface EventProps {
  title: string | null;
  datetime: string | null;
}

function EventCard({ title, datetime }: EventProps) {

  const formatted = datetime
    ? new Date(datetime).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    })
    : "Date TBA";

  return (
    <div className="relative mt-4 pl-5">
      <div className="absolute h-10 w-0.5 bg-primary -translate-x-4 translate-y-1 rounded-4xl"></div>
      <div className="font-extralight text-md font-serif">{title ?? "Untitled event"}</div>
      <div className="font-extralight text-md font-serif">{formatted}</div>
    </div>
  )
}
export default EventCard