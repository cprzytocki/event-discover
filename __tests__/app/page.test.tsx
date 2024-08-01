import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page, { PageProps } from "@/app/page";
import { getEvents } from "@/actions/getEvents";
import { aggregateEvents } from "@/lib/utils";
import { Layout } from "@/types/layout";
import Event from "@/types/event";

// Mock functions and components as they are tested in their own files
jest.mock("@/actions/getEvents");
jest.mock("@/lib/utils", () => ({
  aggregateEvents: jest.fn(),
}));

jest.mock("@/components/SearchFilters", () => {
  const SearchFilters = () => <div>SearchFilters Component</div>;
  SearchFilters.displayName = "SearchFilters";
  return SearchFilters;
});
jest.mock("@/components/TableView", () => {
  const TableView = ({ events }: { events: Event[] }) => (
    <div>TableView Component - Events: {events.length}</div>
  );
  TableView.displayName = "TableView";
  return TableView;
});
jest.mock("@/components/GridView", () => {
  const GridView = ({ events }: { events: Event[] }) => (
    <div>GridView Component - Events: {events.length}</div>
  );
  GridView.displayName = "GridView";
  return GridView;
});
jest.mock("@/components/NoResults", () => {
  const NoResults = () => <div>NoResults Component</div>;
  NoResults.displayName = "NoResults";
  return NoResults;
});

const mockProps: PageProps = {
  searchParams: {
    startDate: "2022-01-01",
    endDate: "2022-12-31",
    city: "New York",
    layout: Layout.LIST,
  },
};

describe("Page", () => {
  //  Mock the return value of getEvents and aggregateEvents to test for the Page component's orchestration
  beforeEach(() => {
    (getEvents as jest.Mock).mockResolvedValue({
      _embedded: {
        events: [
          { id: 1, name: "Event 1" },
          { id: 2, name: "Event 2" },
        ],
      },
    });
    (aggregateEvents as jest.Mock).mockReturnValue([
      { id: 1, name: "Event 1" },
      { id: 2, name: "Event 2" },
    ]);
  });

  it("renders without errors", async () => {
    const { getByTestId } = render(await Page(mockProps));

    const header = getByTestId("page-header");
    expect(header).toBeInTheDocument();
  });

  it("renders SearchFilters component", async () => {
    render(await Page(mockProps));

    const searchFilters = screen.getByText("SearchFilters Component");
    expect(searchFilters).toBeInTheDocument();
  });

  it("renders TableView component when layout is set to list", async () => {
    render(await Page(mockProps));

    const tableView = screen.getByText("TableView Component - Events: 2");
    expect(tableView).toBeInTheDocument();
  });

  it("renders GridView component when layout is set to grid", async () => {
    render(await Page({ searchParams: { ...mockProps.searchParams, layout: Layout.GRID } }));

    const gridView = screen.getByText("GridView Component - Events: 2");
    expect(gridView).toBeInTheDocument();
  });

  it("renders GridView component when layout is not set", async () => {
    render(await Page({ searchParams: { ...mockProps.searchParams, layout: "" } }));

    const gridView = screen.getByText("GridView Component - Events: 2");
    expect(gridView).toBeInTheDocument();
  });

  it("renders NoResults component when there are no events", async () => {
    (getEvents as jest.Mock).mockResolvedValueOnce({ _embedded: { events: [] } });
    (aggregateEvents as jest.Mock).mockReturnValueOnce([]);

    render(await Page(mockProps));

    const noResults = screen.getByText("NoResults Component");
    expect(noResults).toBeInTheDocument();
  });

  it("renders error message when there is an error fetching events", async () => {
    (getEvents as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch events"));
    // Suppress expected console.error output
    const consoleSpy = jest.spyOn(console, "error").mockImplementationOnce(() => {});

    render(await Page(mockProps));

    const errorMessage = await screen.findByText("Failed to fetch events");
    expect(errorMessage).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
});
