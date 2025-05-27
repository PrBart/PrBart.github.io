import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./index.css";

const theme = import.meta.env.VITE_CV_THEME;

// const theme = "retro";

switch (theme) {
  case "retro":
    import("./themes/retro.css");
    break;
  case "screen":
    import("./themes/screen.css");
    break;
  case "github":
  default:
    import("github-markdown-css/github-markdown.css");
    import("./themes/github-markdown-override.css");
    break;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
