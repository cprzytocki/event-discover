"use client";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useSetParams(): [
  ReadonlyURLSearchParams,
  (
    params: {
      name: string;
      value: string;
    }[],
  ) => void,
] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (newParams: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams);
      newParams.forEach(({ name, value }) => params.set(name, value));

      return params.toString();
    },
    [searchParams],
  );

  function setSearchParams(params: { name: string; value: string }[]): void {
    router.push(pathname + "?" + createQueryString(params), {
      scroll: false,
    });
  }

  return [searchParams, setSearchParams];
}
