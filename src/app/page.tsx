"use server";
import SearchSection from "@/components/SearchSection";
import Events from "@/components/Events/Events";
import { getEvents } from "@/actions/getEvents";

export default async function Home({ searchParams }: { searchParams: Record<string, string> }) {
  console.log(searchParams);

  const eventsTest = await getEvents();
  const events = eventsTest._embedded.events;

  return (
    <section className="w-full py-12">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Event Discover</h1>
            <p className="text-muted-foreground">Find the best events near you.</p>
          </div>
        </div>
        <SearchSection />
        <Events events={events} />
      </div>
    </section>
  );
}
