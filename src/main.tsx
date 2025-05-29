import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { loadStyles } from "./lib/styleLoader";

import "./index.css";

const theme = import.meta.env.VITE_CV_THEME;

const loadThemeStyles = async () => {
  const styles: string[] = [];

  switch (theme) {
    case "retro":
      styles.push("/src/themes/retro.css");
      break;
    case "screen":
      styles.push("/src/themes/screen.css");
      break;
    case "github":
    default:
      styles.push("/node_modules/github-markdown-css/github-markdown.css");
      styles.push("/src/themes/github-markdown-override.css");
      break;
  }

  await loadStyles(styles);
};

const init = async () => {
  try {
    await loadThemeStyles();
    
    const root = createRoot(document.getElementById("root")!);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error("Failed to load styles:", error);
    // You might want to show an error message to the user here
  }
};

init();
