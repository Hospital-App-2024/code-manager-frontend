"use client";

import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
  children: React.ReactNode;
}

// Create a client
const queryClient = new QueryClient();

export function QueryClientProvider({ children }: Props) {
  return (
    <Provider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </Provider>
  );
}
