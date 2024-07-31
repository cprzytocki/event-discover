"use server";
import { EventsResponse } from "@/types/ticketMaster";

const API_KEY = process.env.TICKETMASTER_API_KEY;

export async function getEvents() {
  const res = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=${API_KEY}`,
  );
  const data: Promise<EventsResponse> = res.json();
  return data;
}
