"use server";
import SearchSection from "@/components/SearchSection";
import Events from "@/components/Events/Events";

export default async function Home() {
  const events = [
    {
      id: 1,
      name: "Coldplay Concert",
      date: "2023-07-15",
      time: "8:00 PM",
      location: "Madison Square Garden, New York",
    },
    {
      id: 2,
      name: "Taylor Swift Tour",
      date: "2023-08-20",
      time: "7:30 PM",
      location: "Gillette Stadium, Boston",
    },
    {
      id: 3,
      name: "Beyoncé Formation World Tour",
      date: "2023-09-05",
      time: "8:00 PM",
      location: "FedExField, Washington D.C.",
    },
    {
      id: 4,
      name: "Bruno Mars 24K Magic World Tour",
      date: "2023-10-10",
      time: "7:00 PM",
      location: "Staples Center, Los Angeles",
    },
    {
      id: 5,
      name: "Ed Sheeran Divide Tour",
      date: "2023-11-15",
      time: "8:30 PM",
      location: "Rogers Centre, Toronto",
    },
    {
      id: 6,
      name: "Adele 25 Tour",
      date: "2023-12-01",
      time: "8:00 PM",
      location: "O2 Arena, London",
    },
  ];

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
