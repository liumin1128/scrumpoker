export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "scrum-poker-theme";
export const THEME_COLORS: Record<Theme, string> = {
  light: "#f8f7f4",
  dark: "#000000",
};

export function resolveTheme(
  preference: string | null,
  prefersDark: boolean,
): Theme {
  if (preference === "light" || preference === "dark") return preference;
  return prefersDark ? "dark" : "light";
}

// Apply the preference before the first paint, including when storage is blocked.
export const themeInitScript = `(() => {
  let preference = null;
  try { preference = localStorage.getItem("${THEME_STORAGE_KEY}"); } catch {}
  const dark = preference === "dark" || (preference !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  const themeColor = document.createElement("meta");
  themeColor.name = "theme-color";
  themeColor.content = dark ? "${THEME_COLORS.dark}" : "${THEME_COLORS.light}";
  document.head.appendChild(themeColor);
})();`;
