"use server";
import { EventsApiResponse } from "@/types/ticketMaster";

const API_KEY = process.env.TICKETMASTER_API_KEY;

export async function getEvents(startDate: string, endDate: string, city: string) {
  const startQuery = startDate ? `&startDateTime=${startDate}` : "";
  const endQuery = endDate ? `&endDateTime=${endDate}` : "";
  const cityQuery = city ? `&city=${city}` : "";

  const endpoint = `https://app.ticketmaster.com/discovery/v2/events?countryCode=US&results=100&apikey=${API_KEY}`;
  const res = await fetch(endpoint + startQuery + endQuery + cityQuery);

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  const data: Promise<EventsApiResponse> = res.json();
  return data;
}
