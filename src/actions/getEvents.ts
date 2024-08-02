// specify that this module can only be executed on the server to avoid API_KEY exposure
"use server";
import { EventsApiResponse } from "@/types/ticketMaster";

const API_KEY = process.env.TICKETMASTER_API_KEY;

// Fetch events from the Ticketmaster API
export async function getEvents(startDate: string, endDate: string, city: string) {
  // Build the query strings
  const startQuery = startDate ? `&startDateTime=${startDate}` : "";
  const endQuery = endDate ? `&endDateTime=${endDate}` : "";
  const cityQuery = city ? `&city=${city}` : "";

  const endpoint = `https://app.ticketmaster.com/discovery/v2/events?&results=100&apikey=${API_KEY}`;
  const res = await fetch(endpoint + startQuery + endQuery + cityQuery);

  if (!res.ok) {
    const error = await res.text();
    console.error(error);
    throw new Error("Failed to fetch events");
  }
  const data: Promise<EventsApiResponse> = res.json();
  return data;
}
