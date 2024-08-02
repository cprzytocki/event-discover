import { ApiEvent } from "@/types/ticketMaster";

export const mockEventsMissingLocationData: ApiEvent[] = [
  {
    id: "1",
    name: "Event 1",
    dates: {
      start: {
        dateTime: "2023-01-03T20:00:00Z",
        localDate: "2023-01-03",
        localTime: "20:00:00",
      },
    },
    images: [],
    _embedded: {
      venues: [
        {
          name: "Venue 1",
        },
      ],
    },
  },
  {
    id: "2",
    name: "Event 2",
    dates: {
      start: {
        dateTime: "2023-01-01T18:00:00Z",
        localDate: "2023-01-01",
        localTime: "18:00:00",
      },
    },
    images: [],
    _embedded: {
      venues: [
        {
          name: "Venue 2",
        },
      ],
    },
  },
  {
    id: "3",
    name: "Event 3",
    dates: {
      start: {
        dateTime: "2023-01-01T18:00:00Z",
        localDate: "2023-01-01",
        localTime: "18:00:00",
      },
    },
    images: [],
    _embedded: {},
  },
] as unknown as ApiEvent[]; // Type assertion as the data returned from API is too cumbersome to mock fully

export const mockEventsMissingTimeData: ApiEvent[] = [
  {
    id: "1",
    name: "Event 1",
    dates: {
      start: {
        dateTime: "2023-01-01T18:00:00Z",
        localDate: "2023-01-01",
        localTime: "18:00:00",
      },
    },
    images: [{ url: "https://example.com/image1.jpg" }],
    _embedded: {
      venues: [
        {
          name: "Venue 1",
          city: { name: "City 1" },
          country: { name: "Country 1" },
        },
      ],
    },
  },
  {
    id: "2",
    name: "Event 2",
    dates: {
      start: {
        dateTime: null,
        localDate: "2023-01-02",
        localTime: null,
      },
    },
    images: [],
    _embedded: {
      venues: [
        {
          name: "Venue 2",
          country: { name: "Country 2" },
        },
      ],
    },
  },
] as unknown as ApiEvent[]; // Type assertion as the data returned from API is too cumbersome to mock fully
