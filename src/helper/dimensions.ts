import { useState, useEffect, MutableRefObject } from "react";

export function useDimensions(divRef: MutableRefObject<HTMLDivElement>) {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const getDimensions = () => ({
      width: divRef.current.offsetWidth,
      height: divRef.current.offsetHeight,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (divRef.current) handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [divRef]);

  return dimensions;
}
