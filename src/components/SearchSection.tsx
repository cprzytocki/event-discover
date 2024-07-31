"use client";
import useSetParams from "@/hooks/useSetParams";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

enum SearchParams {
  StartDate = "startDate",
  EndDate = "endDate",
  Location = "location",
}

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
  const location = searchParams.get(SearchParams.Location) ?? "";

  return (
    <Card className="pt-4">
      <CardContent className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
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
            value={endDate}
            onChange={(e) => {
              setSearchParams([
                { name: SearchParams.EndDate, value: formatToISO(e.target.value, "23:59:59") },
              ]);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            type="text"
            value={location}
            onChange={(e) =>
              setSearchParams([{ name: SearchParams.Location, value: e.target.value }])
            }
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => {}}>Search</Button>
      </CardFooter>
    </Card>
  );
}
