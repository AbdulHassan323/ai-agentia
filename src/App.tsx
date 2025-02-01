import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Marketplace from "@/pages/Marketplace";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;