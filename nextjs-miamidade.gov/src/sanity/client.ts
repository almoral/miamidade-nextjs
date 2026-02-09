import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "utfnpzzo",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  stega: {
    enabled: process.env.NODE_ENV === "development",
    studioUrl: "http://localhost:3333",
  },
});

// Client for draft content with token
export const clientWithToken = createClient({
  projectId: "utfnpzzo",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "previewDrafts",
  stega: {
    enabled: true,
    studioUrl: "http://localhost:3333",
  },
});