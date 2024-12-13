import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeToggle from "./ThemeToggle";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-white min-h-screen  dark:bg-gray-900">
      <div className="flex max-w-[80%] mx-auto py-6">
        <div className="ml-auto">
          <ThemeToggle className="ml-auto" />
        </div>
      </div>
      <App />
    </div>
  </StrictMode>
);
