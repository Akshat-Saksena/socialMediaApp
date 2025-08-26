import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ModeProvider } from "./contexts/darkModeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModeProvider>
      <App />
    </ModeProvider>
  </StrictMode>
);
