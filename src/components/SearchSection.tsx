import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface SearchSectionProps {
  searchParams: {
    startDate: string;
    endDate: string;
    location: string;
  };
  setSearchParams: (searchParams: { startDate: string; endDate: string; location: string }) => void;
  handleSearch: () => void;
}

export default function SearchSection({
  searchParams,
  setSearchParams,
  handleSearch,
}: SearchSectionProps) {
  return (
    <Card>
      <CardContent className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={searchParams.startDate}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                startDate: e.target.value,
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={searchParams.endDate}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                endDate: e.target.value,
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            type="text"
            value={searchParams.location}
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                location: e.target.value,
              })
            }
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSearch}>Search</Button>
      </CardFooter>
    </Card>
  );
}
