import { useEffect } from "react";

export function useLoadingCursor() {
  useEffect(() => {
    document.body.style.cursor = "wait";

    return () => {
      document.body.style.cursor = "default";
    };
  }, []);
}
