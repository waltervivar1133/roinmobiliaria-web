import { GraphQLClient } from "graphql-request";
import { ENV } from "@/constants/env";

const noStoreFetch: typeof fetch = (input, init) => {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store");
  headers.set("Pragma", "no-cache");

  return fetch(input, {
    ...init,
    headers,
    cache: "no-store",
    next: { revalidate: 0 },
  } as RequestInit & { next: { revalidate: number } });
};

export const graphqlClient = new GraphQLClient(ENV.GRAPHQL_ENDPOINT, {
  fetch: noStoreFetch,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    Pragma: "no-cache",
  },
});
