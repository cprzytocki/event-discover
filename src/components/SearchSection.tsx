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

export default function SearchSection() {
  const [searchParams, setSearchParams] = useSetParams();
  const startDate =
    searchParams.get(SearchParams.StartDate) ?? new Date().toISOString().split("T")[0];
  const endDate = searchParams.get("endDate") ?? "";
  const location = searchParams.get("location") ?? "";

  return (
    <Card>
      <CardContent className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) =>
              setSearchParams([{ name: SearchParams.StartDate, value: e.target.value }])
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) =>
              setSearchParams([{ name: SearchParams.EndDate, value: e.target.value }])
            }
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
