import { act, renderHook } from "@testing-library/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSetParams from "@/hooks/useSetParams";

describe("useSetParams", () => {
  const mockRouterPush = jest.fn();
  const mockUseRouter = { push: mockRouterPush };
  const mockUsePathname = "/mock-path";
  const mockUseSearchParams = new URLSearchParams("?param1=value1&param2=value2");

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
    (usePathname as jest.Mock).mockReturnValue(mockUsePathname);
    (useSearchParams as jest.Mock).mockReturnValue(mockUseSearchParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return default values", () => {
    const { result } = renderHook(() => useSetParams());
    const [searchParams] = result.current;

    expect(searchParams).toEqual(mockUseSearchParams);
    expect(typeof result.current[1]).toBe("function");
  });

  it("should update search params and call router.push", () => {
    const { result } = renderHook(() => useSetParams());
    const [, setSearchParams] = result.current;

    act(() => {
      setSearchParams([{ name: "param3", value: "value3" }]);
    });

    expect(mockRouterPush).toHaveBeenCalledWith(
      `${mockUsePathname}?param1=value1&param2=value2&param3=value3`,
      { scroll: false },
    );
  });
});
