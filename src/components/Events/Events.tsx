"use client";
import { ApiEvent } from "@/types/ticketMaster";
import { useState } from "react";
import GridView from "./GridView";
import { Layout } from "@/types/layout";
import ViewToggle from "../ViewToggle";
import TableView from "./TableView";
import Event from "@/types/event";

export default function Events({ events }: { events: ApiEvent[] }) {
  const [layout, setLayout] = useState(Layout.GRID);

  const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  const aggregatedEvents: Event[] = events.map((event) => {
    let formattedDate, formattedTime;

    // A time is not available for all events returned from the API
    if (event.dates.start.dateTime) {
      const date = new Date(event.dates.start.dateTime);
      // need to specify the locale to match SSR and client side hydration
      formattedDate = date.toLocaleDateString("en-us", dateFormat);
      formattedTime = date.toLocaleTimeString("en-us", timeFormat);
    } else {
      formattedDate = new Date(event.dates.start.localDate).toLocaleDateString("en-us", dateFormat);
      formattedTime = event.dates.start.localTime ?? "N/A";
    }

    // venue is not always provided
    const venuesExist = Boolean(event._embedded?.venues?.length);
    const venue = venuesExist ? event._embedded.venues[0].name : "N/A";

    // check if city or country is available
    const location = venuesExist
      ? (event._embedded.venues[0].city?.name ?? event._embedded.venues[0].country?.name ?? "N/A")
      : "N/A";

    return {
      id: event.id,
      name: event.name,
      date: formattedDate,
      imageUrl: event.images[0]?.url ?? "/placeholder.svg",
      venue: venue,
      time: formattedTime,
      location: location,
    };
  });

  return (
    <div className="grid gap-8 mt-6">
      <ViewToggle layout={layout} setLayout={setLayout} />
      {layout === Layout.GRID ? (
        <GridView events={aggregatedEvents} />
      ) : (
        <TableView events={aggregatedEvents} />
      )}
    </div>
  );
}
