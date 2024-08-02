import { cn, debounce, aggregateEvents } from "@/lib/utils";
import Event from "@/types/event";
import { mockEventsMissingLocationData, mockEventsMissingTimeData } from "./utils.test.data";

describe("Utility Functions", () => {
  describe("cn", () => {
    it("merges class names correctly", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
      expect(cn("class1", false && "class2", "class3")).toBe("class1 class3");
      expect(cn("class1", undefined, "class3")).toBe("class1 class3");
      expect(cn("class1", null, "class3")).toBe("class1 class3");
    });
  });

  describe("debounce", () => {
    jest.useFakeTimers();

    it("debounces function calls", () => {
      const mockFunction = jest.fn();
      const debouncedFunction = debounce(mockFunction, 250);

      debouncedFunction();
      debouncedFunction();
      debouncedFunction();

      jest.advanceTimersByTime(200);
      expect(mockFunction).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
  });

  describe("aggregateEvents", () => {
    it("handles missing time data correctly", () => {
      const expectedEvents: Event[] = [
        {
          id: "1",
          name: "Event 1",
          date: "Sun, Jan 1",
          imageUrl: "https://example.com/image1.jpg",
          venue: "Venue 1",
          time: "1:00 PM",
          location: "City 1",
        },
        {
          id: "2",
          name: "Event 2",
          date: "Mon, Jan 2",
          imageUrl: "/placeholder.svg",
          venue: "Venue 2",
          time: "N/A",
          location: "Country 2",
        },
      ];

      const result = aggregateEvents(mockEventsMissingTimeData);
      expect(result).toEqual(expectedEvents);
    });

    it("handles missing venues and location correctly", () => {
      const expectedEventsMissingData: Event[] = [
        {
          id: "1",
          name: "Event 1",
          date: "Tue, Jan 3",
          imageUrl: "/placeholder.svg",
          venue: "Venue 1",
          time: "3:00 PM",
          location: "N/A",
        },
        {
          id: "2",
          name: "Event 2",
          date: "Sun, Jan 1",
          imageUrl: "/placeholder.svg",
          venue: "Venue 2",
          time: "1:00 PM",
          location: "N/A",
        },
        {
          id: "3",
          name: "Event 3",
          date: "Sun, Jan 1",
          imageUrl: "/placeholder.svg",
          venue: "N/A",
          time: "1:00 PM",
          location: "N/A",
        },
      ];

      const result = aggregateEvents(mockEventsMissingLocationData);
      expect(result).toEqual(expectedEventsMissingData);
    });
  });
});
