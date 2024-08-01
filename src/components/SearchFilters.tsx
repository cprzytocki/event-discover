"use client";
import useSetParams from "@/hooks/useSetParams";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SearchParams } from "@/types/searchParams";
import { debounce } from "@/lib/utils";

function formatToISO(dateString: string, time = "") {
  if (!dateString) return "";
  const date = new Date(`${dateString} ${time}`);
  return date.toISOString().replace(".000Z", "Z");
}

function formatToDate(isoString: string | null) {
  if (!isoString) return "";
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0"); // padStart ensures 2 digits

  return `${year}-${month}-${day}`;
}

export default function SearchFilters() {
  const [searchParams, setSearchParams] = useSetParams();
  const startDate = formatToDate(searchParams.get(SearchParams.StartDate));
  const endDate = formatToDate(searchParams.get(SearchParams.EndDate));
  const city = searchParams.get(SearchParams.City) ?? "";

  const handleStartDateChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams([
      { name: SearchParams.StartDate, value: formatToISO(e.target.value, "00:00:00") },
    ]);
  });

  const handleEndDateChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams([
      { name: SearchParams.EndDate, value: formatToISO(e.target.value, "23:59:59") },
    ]);
  });

  const handleCityChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams([{ name: SearchParams.City, value: e.target.value.trim() }]);
  });

  return (
    <Card className="pt-4 bg-primary-foreground">
      <CardContent className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            defaultValue={startDate}
            onChange={handleStartDateChange}
            className="text-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" type="date" defaultValue={endDate} onChange={handleEndDateChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" type="text" defaultValue={city} onChange={handleCityChange} />
        </div>
      </CardContent>
    </Card>
  );
}
