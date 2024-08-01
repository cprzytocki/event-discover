import { CalendarIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Event from "@/types/event";

interface GridViewProps {
  events: Event[];
}

export default function GridView({ events }: GridViewProps) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {events.map((event) => {
        return (
          <div
            key={event.id}
            className="bg-primary-foreground grid gap-4 border rounded-lg overflow-hidden"
          >
            <Image
              src={event.imageUrl}
              alt={event.name}
              width={400}
              height={300}
              className="object-cover w-full aspect-video"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-semibold">{event.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="w-4 h-4" />
                <span>{event.date}</span>
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPinIcon className="w-4 h-4" />
                <span>{`${event.venue}, ${event.location}`}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
