export type UTMParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const STORAGE_KEY = "utm_params";

export function saveUTMParams(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const urlUTM: UTMParams = {};

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) urlUTM[key] = value;
  });

  const existing = sessionStorage.getItem(STORAGE_KEY);
  if (existing) return;

  const data: UTMParams = {
    ...urlUTM,
    referrer: document.referrer || "direct",
    landing_page: window.location.href,
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("UTM saqlashda xato:", e);
  }
}

export function getStoredUTM(): UTMParams {
  if (typeof window === "undefined") return {};
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as UTMParams) : {};
  } catch {
    return {};
  }
}