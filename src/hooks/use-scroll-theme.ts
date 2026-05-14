import { useEffect } from "react";

const DARK_THRESHOLD = 0.3; // fraction of page scrolled

export function useScrollTheme() {
  useEffect(() => {
    function onScroll() {
      const scrolled =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.classList.toggle("dark", scrolled > DARK_THRESHOLD);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
