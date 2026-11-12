
const STYLE_ID = "graphite-theme-styles";

const GRAPHITE_CSS = `
  :root {
    color-scheme: dark !important;
  }

  html,
  body,
  main,
  section,
  article,
  div,
  header,
  footer,
  nav,
  aside {
    background-color: #2b2b2b !important;
    color: #e5e5e5 !important;
  }

  h1, h2, h3, h4, h5, h6,
  p, span, label, li {
    color: #e5e5e5 !important;
  }

  input, textarea, select, button {
    background-color: #393939 !important;
    color: #e5e5e5 !important;
    border-color: #555 !important;
  }

  a {
    color: #91caff !important;
  }
`;

function applyTheme(enabled) {
  const existingStyle = document.getElementById(STYLE_ID);

  if (!enabled) {
    existingStyle?.remove();
    return;
  }

  if (existingStyle) return;

  if (!document.documentElement) {
    document.addEventListener(
      "DOMContentLoaded",
      () => applyTheme(enabled),
      { once: true }
    );
    return;
  }

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = GRAPHITE_CSS;

  document.documentElement.appendChild(style);
}

// Restore the saved preference when a page loads.
chrome.storage.local.get(
  { graphiteEnabled: false },
  ({ graphiteEnabled }) => {
    applyTheme(graphiteEnabled);
  }
);

// React immediately when the popup changes the preference.
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;

  if (changes.graphiteEnabled) {
    applyTheme(Boolean(changes.graphiteEnabled.newValue));
  }
});
