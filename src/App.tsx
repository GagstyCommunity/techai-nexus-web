import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Services Routes */}
          <Route path="/services" element={<Index />} />
          <Route path="/services/ai-tools" element={<Index />} />
          <Route path="/services/ai-automation" element={<Index />} />
          <Route path="/services/web3" element={<Index />} />
          <Route path="/services/web-development" element={<Index />} />
          <Route path="/services/growth-hacking" element={<Index />} />
          <Route path="/services/devops" element={<Index />} />
          
          {/* Other Pages */}
          <Route path="/solutions" element={<Index />} />
          <Route path="/case-studies" element={<Index />} />
          <Route path="/articles" element={<Index />} />
          <Route path="/about" element={<Index />} />
          <Route path="/contact" element={<Index />} />
          
          {/* Legal Pages */}
          <Route path="/privacy" element={<Index />} />
          <Route path="/terms" element={<Index />} />
          <Route path="/cookies" element={<Index />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
