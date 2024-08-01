"use client";
import useSetParams from "@/hooks/useSetParams";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SearchParams } from "@/types/searchParams";
import { debounce } from "@/lib/utils";
import { DatePickerWithRange } from "./ui/datepicker";
import { DateRange } from "react-day-picker";

function formatToISO(date?: Date, time?: "start" | "end") {
  if (!date) return "";
  const newDate = new Date(date);
  if (time === "start") newDate.setHours(0, 0, 0);
  if (time === "end") newDate.setHours(23, 59, 59);

  return newDate.toISOString().replace(".000Z", "Z");
}

export default function SearchFilters() {
  const [searchParams, setSearchParams] = useSetParams();
  const startDate = searchParams.get(SearchParams.StartDate);
  const endDate = searchParams.get(SearchParams.EndDate);
  const city = searchParams.get(SearchParams.City) ?? "";

  const handleCityChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams([{ name: SearchParams.City, value: e.target.value.trim() }]);
  });

  const handleDateChange = debounce((date?: DateRange) => {
    setSearchParams([
      { name: SearchParams.StartDate, value: formatToISO(date?.from, "start") },
      { name: SearchParams.EndDate, value: formatToISO(date?.to, "end") },
    ]);
  });

  const defaultDate = startDate
    ? { from: new Date(startDate), to: endDate ? new Date(endDate) : undefined }
    : undefined;

  return (
    <Card className="p-0 max-w-[650px] border-0">
      <CardContent className="grid md:grid-cols-2 gap-4 p-0">
        <div className="space-y-2">
          <Label htmlFor="datePicker">Date Range</Label>
          <DatePickerWithRange
            id="datePicker"
            defaultValue={defaultDate}
            onChange={handleDateChange}
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
      </CardContent>
    </Card>
  );
}
