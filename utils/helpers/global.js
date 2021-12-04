export const isSSR = () => typeof window === "undefined";

export const isMobile = () => {
  if (typeof window !== "undefined") {
    return window && window.innerWidth < 600;
  }
};

export const isTab = () => {
  if (typeof window !== "undefined") {
    return window && window.innerWidth <= 895 && window.innerWidth >= 600;
  }
};
