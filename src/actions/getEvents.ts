"use server";
import { EventsResponse } from "@/types/ticketMaster";

const API_KEY = process.env.TICKETMASTER_API_KEY;

export async function getEvents(startDate: string, endDate: string, location: string) {
  const startQuery = startDate
    ? `&startDateTime=${startDate}T00:00:00Z`
    : `&startDateTime=${new Date().toISOString().split("T")[0]}T00:00:00Z`;

  const endQuery = endDate ? `&endDateTime=${endDate}T23:59:59Z` : "";

  console.log({ startQuery, endQuery, location });
  const endpoint = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&sort=date,asc&apikey=${API_KEY}`;
  const res = await fetch(endpoint + startQuery + endQuery);

  const data: Promise<EventsResponse> = res.json();
  return data;
}
