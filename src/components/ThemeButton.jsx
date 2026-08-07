import { useTheme } from "../theme";

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <svg className="icon-sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M4.8 12H2.6M18.6 5.4l-1.6 1.6M7 17l-1.6 1.6M18.6 18.6L17 17M7 7L5.4 5.4" />
      </svg>
      <svg className="icon-moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 14.4A8.4 8.4 0 1 1 9.6 4a6.9 6.9 0 0 0 10.4 10.4Z" />
      </svg>
    </button>
  );
}
