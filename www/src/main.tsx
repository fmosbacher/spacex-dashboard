import { Routes, Route, Navigate } from "react-router-dom";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    },
  },
});

const gb = new GrowthBook({
  apiHost: "https://cdn.growthbook.io",
  clientKey: import.meta.env.VITE_GROWTHBOOK_KEY,
  enableDevMode: true,
  trackingCallback: (experiment, result) => {
    window.gtag("event", "experiment_impression", {
      experiment_id: experiment.key,
      variation_id: result.key,
    });
  },
});

function Main() {
  useEffect(() => {
    gb.init({ streaming: true });
    return () => gb.destroy();
  }, []);

  return (
    <StrictMode>
      <GrowthBookProvider growthbook={gb}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/latest" replace />} />
              <Route path="/:status" element={<App />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </GrowthBookProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);
