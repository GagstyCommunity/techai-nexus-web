import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Solutions from "./pages/Solutions";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Articles from "./pages/Articles";
import AIAutomation from "./pages/services/AIAutomation";
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
          
          {/* Main Pages */}
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<Articles />} />
          
          {/* Services Routes */}
          <Route path="/services/ai-automation" element={<AIAutomation />} />
          <Route path="/services/ai-tools" element={<Index />} />
          <Route path="/services/web3" element={<Index />} />
          <Route path="/services/web-development" element={<Index />} />
          <Route path="/services/growth-hacking" element={<Index />} />
          <Route path="/services/devops" element={<Index />} />
          <Route path="/services/ui-ux" element={<Index />} />
          <Route path="/services/launch-lab" element={<Index />} />
          
          {/* Other Pages - To be created */}
          <Route path="/case-studies" element={<Index />} />
          
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
