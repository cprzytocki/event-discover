"use client";
import { Event } from "@/types/ticketMaster";
import { useState } from "react";
import GridView from "./GridView";
import { Layout } from "@/types/layout";
import ViewToggle from "./ViewToggle";
import TableView from "./TableView";

export default function Events({ events }: { events: Event[] }) {
  const [layout, setLayout] = useState(Layout.GRID);

  return (
    <div className="grid gap-8">
      <ViewToggle layout={layout} setLayout={setLayout} />
      {layout === Layout.GRID ? <GridView events={events} /> : <TableView events={events} />}
    </div>
  );
}
