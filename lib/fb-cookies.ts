// _fbc va _fbp cookies ni o'qish (Pixel tomonidan o'rnatiladi)
export function getFbCookies(): { fbc?: string; fbp?: string } {
  if (typeof document === "undefined") return {};

  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    if (key && value) acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return {
    fbc: cookies._fbc,
    fbp: cookies._fbp,
  };
}