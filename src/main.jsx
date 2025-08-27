import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ModeProvider } from "./contexts/darkModeContext.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ModeProvider>
  </StrictMode>
);
