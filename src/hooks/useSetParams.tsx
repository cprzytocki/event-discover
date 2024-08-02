"use client";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type SetSearchParams = (params: { name: string; value: string }[]) => void;

// Reusable hook to get/set URL search params using Next navigation methods more conveniently
export default function useSetParamsSearch(): [ReadonlyURLSearchParams, SetSearchParams] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Create a string of search params using the current search params and new params passed in
  const createQueryString = useCallback(
    (newParams: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams);
      newParams.forEach(({ name, value }) => params.set(name, value));

      return params.toString();
    },
    [searchParams],
  );

  const setSearchParams: SetSearchParams = (params: { name: string; value: string }[]): void => {
    // Trigger a soft reload to update the URL and rerender app components with new search params, without requiring a full page refresh
    router.push(pathname + "?" + createQueryString(params), {
      scroll: false,
    });
  };

  return [searchParams, setSearchParams];
}
