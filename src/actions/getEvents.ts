"use server";
import { EventsApiResponse } from "@/types/ticketMaster";

const API_KEY = process.env.TICKETMASTER_API_KEY;

export async function getEvents(startDate: string, endDate: string, city: string) {
  const startQuery = startDate ? `&startDateTime=${startDate}` : "";
  const endQuery = endDate ? `&endDateTime=${endDate}` : "";
  const cityQuery = city ? `&city=${city}` : "";

  console.log({ startQuery, endQuery, cityQuery });
  const endpoint = `https://app.ticketmaster.com/discovery/v2/events?countryCode=US&sort=date,asc&apikey=${API_KEY}`;
  const res = await fetch(endpoint + startQuery + endQuery + cityQuery);

  const data: Promise<EventsApiResponse> = res.json();
  return data;
}
