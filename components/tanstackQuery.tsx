"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function TanstackQueryClientProvider({ children }) {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>
  );
}
