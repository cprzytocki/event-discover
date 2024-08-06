"use client";
import useSetParams from "@/hooks/useSetParams";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SearchParams } from "@/types/searchParams";
import { debounce } from "@/lib/utils";
import { DatePickerWithRange } from "./ui/datepicker";
import { DateRange } from "react-day-picker";
import ViewToggle from "./ViewToggle";
import { Layout } from "@/types/layout";

// Convert a date to an API friendly format
function formatToISO(date?: Date, time?: "start" | "end"): string {
  if (!date) return "";
  const newDate = new Date(date);

  // Time is used to set the date start or end of the day for correct date filtering
  if (time === "start") newDate.setHours(0, 0, 0);
  if (time === "end") newDate.setHours(23, 59, 59);

  // API requirement
  return newDate.toISOString().replace(".000Z", "Z");
}

// Test if the date is valid and format it for the date picker
function handleDefaultDate(startString: string, endString: string): DateRange | undefined {
  const startDate = isFinite(+new Date(startString)) ? new Date(startString) : undefined;
  const endDate = isFinite(+new Date(endString)) ? new Date(endString) : undefined;

  return startDate ? { from: startDate, to: endDate } : undefined;
}

export default function SearchFilters() {
  const [searchParams, setSearchParams] = useSetParams();
  // Get the search params from the URL
  const startDate = searchParams.get(SearchParams.StartDate);
  const endDate = searchParams.get(SearchParams.EndDate);
  const city = searchParams.get(SearchParams.City) ?? "";
  const layout = (searchParams.get(SearchParams.Layout) as Layout) ?? Layout.GRID;

  // Debounce city input to reduce api calls
  const handleCityChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams([{ name: SearchParams.City, value: e.target.value.trim() }]);
  });

  const defaultDateRange = handleDefaultDate(startDate ?? "", endDate ?? "");

  return (
    <Card className="p-0 border-0">
      <CardContent className="grid md:grid-cols-3 gap-4 p-0">
        <div className="space-y-2">
          <Label htmlFor="datePicker">Date Range</Label>
          <DatePickerWithRange
            id="datePicker"
            defaultValue={defaultDateRange}
            onChange={(date?: DateRange) => {
              setSearchParams([
                { name: SearchParams.StartDate, value: formatToISO(date?.from, "start") },
                { name: SearchParams.EndDate, value: formatToISO(date?.to, "end") },
              ]);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            type="text"
            defaultValue={city}
            onChange={handleCityChange}
            className="bg-primary-foreground"
            placeholder="Enter a city"
          />
        </div>
        <div className="space-y-2 mt-auto ml-auto">
          <ViewToggle
            layout={layout}
            setLayout={(layout) => setSearchParams([{ name: SearchParams.Layout, value: layout }])}
          />
        </div>
      </CardContent>
    </Card>
  );
}
