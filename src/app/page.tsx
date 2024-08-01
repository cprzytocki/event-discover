"use server";
import SearchSection from "@/components/SearchSection";
import Events from "@/components/Events/Events";
import { getEvents } from "@/actions/getEvents";
import { Suspense } from "react";
import NoResults from "@/components/NoResults";

export default async function Home({ searchParams }: { searchParams: Record<string, string> }) {
  const { startDate, endDate, city } = searchParams;
  let error;

  const eventsRes = await getEvents(startDate, endDate, city).catch((err: Error) => {
    console.error(err);
    error = err.message;
    return null;
  });

  const events = eventsRes?._embedded?.events;

  return (
    <section className="w-full py-12">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Event Discover</h1>
            <p className="text-muted-foreground">Find the best events near you.</p>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchSection />
        </Suspense>
        {error ? (
          <div>
            <pre>{error}</pre>
          </div>
        ) : events?.length ? (
          <Events events={events} />
        ) : (
          <NoResults />
        )}
      </div>
    </section>
  );
}
