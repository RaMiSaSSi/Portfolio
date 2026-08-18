"use client";

import { useEffect } from "react";

/**
 * Homepage-only scroll-snap helper. Adds the `.snap-page` class to
 * `documentElement` (see globals.css) so sections snap softly on the
 * homepage while other pages keep native scrolling.
 */
export default function ScrollSnap() {
  useEffect(() => {
    document.documentElement.classList.add("snap-page");
    return () => {
      document.documentElement.classList.remove("snap-page");
    };
  }, []);

  return null;
}