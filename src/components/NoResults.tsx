import { CalendarMinusIcon } from "lucide-react";
import React from "react";

export default function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CalendarMinusIcon className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          No Events Found
        </h1>
        <p className="mt-4 text-muted-foreground">
          Try adjusting your date filters or city selection to find upcoming events.
        </p>
      </div>
    </div>
  );
}
