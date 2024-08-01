"use client";
import { ApiEvent } from "@/types/ticketMaster";
import { useState } from "react";
import GridView from "./GridView";
import { Layout } from "@/types/layout";
import ViewToggle from "./ViewToggle";
import TableView from "./TableView";
import Event from "@/types/event";

export default function Events({ events }: { events: ApiEvent[] }) {
  const [layout, setLayout] = useState(Layout.GRID);

  const aggregatedEvents: Event[] = events.map((event) => {
    let formattedDate, formattedTime;

    // A time is not available for all events returned from the API
    if (event.dates.start.dateTime) {
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
    } else {
      formattedDate = new Date(event.dates.start.localDate).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      formattedTime = event.dates.start.localTime ?? "N/A";
    }

    return {
      id: event.id,
      name: event.name,
      date: formattedDate,
      imageUrl: event.images[0]?.url ?? "/placeholder.svg",
      venue: event._embedded.venues[0]?.name,
      time: formattedTime,
      location: event._embedded.venues[0]?.city?.name ?? event._embedded.venues[0].country.name,
    };
  });

  return (
    <div className="grid gap-8">
      <ViewToggle layout={layout} setLayout={setLayout} />
      {layout === Layout.GRID ? (
        <GridView events={aggregatedEvents} />
      ) : (
        <TableView events={aggregatedEvents} />
      )}
    </div>
  );
}
