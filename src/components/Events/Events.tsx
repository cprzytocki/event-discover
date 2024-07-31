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
    let formattedDate;

    // A time is not available for all events
    if (event.dates.start.dateTime) {
      const date = new Date(event.dates.start.dateTime);
      formattedDate = date.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    } else {
      formattedDate = new Date(event.dates.start.localDate).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }

    return {
      id: event.id,
      name: event.name,
      date: formattedDate,
      imageUrl: event.images[0]?.url || "/placeholder.svg",
      venue: event._embedded.venues[0].name,
      time: event.dates.start.localTime || "N/A",
      location: event._embedded.venues[0].city?.name ?? event._embedded.venues[0].country.name,
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

// let formattedDate, formattedTime;
// if (!event.dates.start.dateTime) {
//   formattedDate = event.dates.start.localDate
//     ? new Date(event.dates.start.localDate).toLocaleDateString(undefined, {
//         weekday: "short",
//         month: "short",
//         day: "numeric",
//       })
//     : "N/A";

//   formattedTime = event.dates.start.localTime
//     ? new Date(event.dates.start.localTime).toLocaleTimeString(undefined, {
//         hour: "numeric",
//         minute: "numeric",
//       })
//     : "";
// } else {
//   const date = new Date(event.dates.start.dateTime);
//   formattedDate = date.toLocaleDateString(undefined, {
//     weekday: "short",
//     month: "short",
//     day: "numeric",
//   });

//   formattedTime = date.toLocaleTimeString(undefined, {
//     hour: "numeric",
//     minute: "numeric",
//   });
// }

// const venueName = event._embedded.venues[0].name;
// const venueLocation =
//   event._embedded.venues[0].city?.name || event._embedded.venues[0].country.name;
