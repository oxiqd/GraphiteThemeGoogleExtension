
const toggle = document.querySelector("#theme-toggle");
const status = document.querySelector("#status");
const footer = document.querySelector("footer");

function updateUI(enabled) {
  status.textContent = enabled
    ? "Theme is active"
    : "Theme is disabled";

  footer.textContent = enabled
    ? "Graphite theme enabled"
    : "Original website colors";
}

chrome.storage.local.get(
  { graphiteEnabled: false },
  ({ graphiteEnabled }) => {
    toggle.checked = graphiteEnabled;
    updateUI(graphiteEnabled);
  }
);

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;

  chrome.storage.local.set({
    graphiteEnabled: enabled
  });

  updateUI(enabled);
});
