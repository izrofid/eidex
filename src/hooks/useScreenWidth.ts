//https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
import { useState, useEffect } from "react";

type ScreenWidth = "xs" | "sm" | "md";

//Got numbers from here: https://tailwindcss.com/docs/responsive-design
const getScreenWidth = (): ScreenWidth =>
  window.innerWidth > 768 ? "md" : window.innerWidth <= 451 ? "sm" : "xs";

export const useScreenWidth = (): ScreenWidth => {
  const [screenWidth, setWindowDimensions] = useState(getScreenWidth());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getScreenWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return screenWidth;
};
