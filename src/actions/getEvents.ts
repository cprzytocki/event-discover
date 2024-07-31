"use server";
import { EventsApiResponse } from "@/types/ticketMaster";

const API_KEY = process.env.TICKETMASTER_API_KEY;

export async function getEvents(startDate: string, endDate: string, location: string) {
  const startQuery = startDate ? `&startDateTime=${startDate}` : "";
  const endQuery = endDate ? `&endDateTime=${endDate}` : "";

  console.log({ startQuery, endQuery, location });
  const endpoint = `https://app.ticketmaster.com/discovery/v2/events?countryCode=US&sort=date,asc&apikey=${API_KEY}`;
  const res = await fetch(endpoint + startQuery + endQuery);

  const data: Promise<EventsApiResponse> = res.json();
  return data;
}
