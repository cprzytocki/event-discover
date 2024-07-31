import { CalendarIcon, MapPinIcon } from "lucide-react";

export default function GridView({ events }: { events: any[] }) {
return (
<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {events.map((event) => (
    <div key={event.id} className="grid gap-4 border rounded-lg overflow-hidden">
      <img
        src="/placeholder.svg"
        alt={event.name}
        width={400}
        height={300}
        className="object-cover w-full aspect-video"
      />
      <div className="p-4 space-y-2">
        <h3 className="font-semibold">{event.name}</h3>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarIcon className="w-4 h-4" />
          <span>
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span>
            {new Date(event.date).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPinIcon className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
      </div>
    </div>
  ))}
</div>
);
}