import { type ApiEvent } from "@/types/ticketMaster";
import { type ClassValue, clsx } from "clsx";
import type Event from "@/types/event";
import { twMerge } from "tailwind-merge";

// Used to merge Tailwind classes with clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Debounce to limit number of function calls
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number = 250,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

//  Aggregate events from the Ticketmaster API into a more app friendly data structure
export function aggregateEvents(events: ApiEvent[]): Event[] {
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
    const eventDateTime = event.dates.start.dateTime;

    // A time is not available for all events returned from the API
    if (eventDateTime) {
      const date = new Date(eventDateTime);
      // need to specify the locale to match SSR and client side hydration
      formattedDate = date.toLocaleDateString("en-us", dateFormat);
      formattedTime = date.toLocaleTimeString("en-us", timeFormat);
    } else {
      formattedDate = new Date(event.dates.start.localDate + "T00:00:00").toLocaleDateString(
        "en-us",
        dateFormat,
      );
      formattedTime = "N/A";
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

  return aggregatedEvents;
}
