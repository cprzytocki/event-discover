interface Image {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

interface PublicSales {
  startDateTime: string;
  startTBD: boolean;
  startTBA: boolean;
  endDateTime: string;
}

interface Sales {
  public: PublicSales;
  presales: object[]; // Assuming presales contains a list of objects
}

interface StartDate {
  localDate: string;
  localTime: string;
  dateTime: string;
  dateTBD: boolean;
  dateTBA: boolean;
  timeTBA: boolean;
  noSpecificTime: boolean;
}

interface Dates {
  start: StartDate;
  timezone: string;
  status: { code: string };
  spanMultipleDays: boolean;
}

interface Classification {
  primary: boolean;
  segment: object; // Assuming segment contains an object
  genre: object; // Assuming genre contains an object
  subGenre: object; // Assuming subGenre contains an object
  type: object; // Assuming type contains an object
  subType: object; // Assuming subType contains an object
  family: boolean;
}

interface Promoter {
  id: string;
  name: string;
  description: string;
}

interface PriceRange {
  type: string;
  currency: string;
  min: number;
  max: number;
}

interface Product {
  name: string;
  id: string;
  url: string;
  type: string;
  classifications: object[]; // Assuming classifications contains a list of objects
}

interface Seatmap {
  staticUrl: string;
  id: string;
}

interface Accessibility {
  ticketLimit: number;
  id: string;
}

interface TicketLimit {
  info: string;
  id: string;
}

interface AgeRestrictions {
  legalAgeEnforced: boolean;
  id: string;
}

interface SafeTix {
  enabled: boolean;
  inAppOnlyEnabled: boolean;
}

interface AllInclusivePricing {
  enabled: boolean;
}

interface Ticketing {
  safeTix: SafeTix;
  allInclusivePricing: AllInclusivePricing;
  id: string;
}

interface Link {
  href: string;
}

interface VenueImage {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

interface City {
  name: string;
}

interface State {
  name: string;
  stateCode: string;
}

interface Country {
  name: string;
  countryCode: string;
}

interface Address {
  line1: string;
}

interface Location {
  longitude: string;
  latitude: string;
}

interface Market {
  name: string;
  id: string;
}

interface DMA {
  id: number;
}

interface UpcomingEvents {
  archtics: number;
  ticketmaster: number;
  _total: number;
  _filtered: number;
}

interface VenueLinks {
  self: { href: string };
}

interface Venue {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: VenueImage[];
  postalCode: string;
  timezone: string;
  city: City;
  state: State;
  country: Country;
  address: Address;
  location: Location;
  markets: Market[];
  dmas: DMA[];
  upcomingEvents: UpcomingEvents;
  _links: VenueLinks;
}

interface Links {
  self: Link;
  attractions: object[]; // Assuming attractions contains a list of objects
  venues: object[]; // Assuming venues contains a list of objects
}

interface Embedded {
  venues: Venue[]; // Assuming venues contains a list of objects
  attractions: object[]; // Assuming attractions contains a list of objects
}

export interface Event {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  sales: Sales;
  dates: Dates;
  classifications: Classification[];
  promoter: Promoter;
  promoters: Promoter[];
  priceRanges: PriceRange[];
  products: Product[];
  seatmap: Seatmap;
  accessibility: Accessibility;
  ticketLimit: TicketLimit;
  ageRestrictions: AgeRestrictions;
  ticketing: Ticketing;
  _links: Links;
  _embedded: Embedded;
}

interface PaginationLinks {
  first: { href: string };
  self: { href: string };
  next: { href: string };
  last: { href: string };
}

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface EventsResponse {
  _embedded: { events: Event[] };
  _links: PaginationLinks;
  page: Page;
}
