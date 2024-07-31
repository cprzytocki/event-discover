import { CalendarIcon, MapPinIcon } from "lucide-react";
import { Event } from "@/types/ticketMaster";
import Image from "next/image";

export default function GridView({ events }: { events: Event[] }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {events.map((event) => {
        let formattedDate, formattedTime;
        if (!event.dates.start.dateTime) {
          formattedDate = event.dates.start.localDate
            ? new Date(event.dates.start.localDate).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })
            : "N/A";

          formattedTime = event.dates.start.localTime
            ? new Date(event.dates.start.localTime).toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
              })
            : "";
        } else {
          const date = new Date(event.dates.start.dateTime);
          formattedDate = date.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
          });

          formattedTime = date.toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "numeric",
          });
        }

        const venueName = event._embedded.venues[0].name;
        const venueLocation =
          event._embedded.venues[0].city?.name || event._embedded.venues[0].country.name;

        return (
          <div key={event.id} className="grid gap-4 border rounded-lg overflow-hidden">
            <Image
              src={event.images[0]?.url || "/placeholder.svg"}
              alt={event.name}
              width={400}
              height={300}
              className="object-cover w-full aspect-video"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-semibold">{event.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="w-4 h-4" />
                <span>{formattedDate}</span>
                <span>{formattedTime}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPinIcon className="w-4 h-4" />
                <span>{`${venueName}, ${venueLocation}`}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
