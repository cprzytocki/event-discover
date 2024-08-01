"use client";
import useSetParams from "@/hooks/useSetParams";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SearchParams } from "@/types/searchParams";

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

export default function SearchSection() {
  const [searchParams, setSearchParams] = useSetParams();
  const startDate = formatToDate(searchParams.get(SearchParams.StartDate));
  const endDate = formatToDate(searchParams.get(SearchParams.EndDate));
  const city = searchParams.get(SearchParams.City) ?? "";

  return (
    <Card className="pt-4">
      <CardContent className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            defaultValue={startDate}
            onChange={(e) => {
              setSearchParams([
                { name: SearchParams.StartDate, value: formatToISO(e.target.value, "00:00:00") },
              ]);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            defaultValue={endDate}
            onChange={(e) => {
              setSearchParams([
                { name: SearchParams.EndDate, value: formatToISO(e.target.value, "23:59:59") },
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
            onChange={(e) =>
              setSearchParams([{ name: SearchParams.City, value: e.target.value.trim() }])
            }
            placeholder="Enter city name"
          />
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
