import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import i18n from "./utils/i18n.ts";
import { I18nextProvider } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.tsx";
import ErrorBoundaryFallback from "./components/layouts/ErrorBoundaryFallback.tsx";

const queryClient = new QueryClient();
const rootElement = document.getElementById("root") as HTMLDivElement;

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        <BrowserRouter>
          <I18nextProvider i18n={i18n} defaultNS={["common", "views"]}>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </I18nextProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
);
