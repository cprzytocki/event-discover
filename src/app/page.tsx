"use server";
import SearchFilters from "@/components/SearchFilters";
import { getEvents } from "@/actions/getEvents";
import { Suspense } from "react";
import NoResults from "@/components/NoResults";
import { aggregateEvents } from "@/lib/utils";
import { Layout } from "@/types/layout";
import TableView from "@/components/TableView";
import GridView from "@/components/GridView";

export default async function Home({ searchParams }: { searchParams: Record<string, string> }) {
  const { startDate, endDate, city, layout } = searchParams;
  let error;

  const eventsRes = await getEvents(startDate, endDate, city).catch((err: Error) => {
    console.error(err);
    error = err.message;
    return null;
  });

  const events = eventsRes?._embedded?.events;
  const aggregatedEvents = events ? aggregateEvents(events) : null;

  return (
    <section className="w-full py-12 flex justify-center ">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Event Discover</h1>
            <p className="text-muted-foreground">Find the best events near you.</p>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchFilters />
        </Suspense>
        {error && (
          <div>
            <pre>{error}</pre>
          </div>
        )}

        {aggregatedEvents?.length ? (
          <div className="grid gap-8">
            {layout === Layout.LIST ? (
              <TableView events={aggregatedEvents} />
            ) : (
              <GridView events={aggregatedEvents} />
            )}
          </div>
        ) : (
          <NoResults />
        )}
      </div>
    </section>
  );
}
