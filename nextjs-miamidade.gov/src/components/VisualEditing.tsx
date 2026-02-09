"use client";

import { useEffect } from "react";

export function VisualEditing() {
  useEffect(() => {
    // Only load the visual editing bundle in the client during development
    if (process.env.NODE_ENV === "development") {
      import("@sanity/visual-editing").then((mod) => {
        mod.enableVisualEditing({
          zIndex: 999999,
        });
        console.log("Visual editing enabled");
      });
    }
  }, []);

  return null;
}
