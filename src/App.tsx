import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import Services from "./pages/Services";
import Solutions from "./pages/Solutions";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Articles from "./pages/Articles";
import AIAutomation from "./pages/services/AIAutomation";
import ServiceDetail from "./pages/services/ServiceDetail";
import SolutionDetail from "./pages/solutions/SolutionDetail";
import NotFound from "./pages/NotFound";

// Admin components
import AdminAuth from "./components/admin/AdminAuth";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import AdminDashboard from "./components/admin/AdminDashboard";

// New components
import ServicesChatbot from "./components/ServicesChatbot";
import ConsultationWidget from "./components/ConsultationWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Main Pages */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:slug" element={<SolutionDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<Articles />} />
            
            {/* Services Routes */}
            <Route path="/services/ai-automation" element={<AIAutomation />} />
            
            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <AdminAuth>
                <AdminLayout />
              </AdminAuth>
            }>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="services" element={<ServicesAdmin />} />
              <Route path="pages" element={<Dashboard />} />
              <Route path="solutions" element={<Dashboard />} />
              <Route path="case-studies" element={<Dashboard />} />
              <Route path="articles" element={<Dashboard />} />
              <Route path="testimonials" element={<Dashboard />} />
              <Route path="seo-settings" element={<Dashboard />} />
              <Route path="tool-logs" element={<Dashboard />} />
            </Route>
            
            {/* Other Pages */}
            <Route path="/case-studies" element={<Index />} />
            
            {/* Legal Pages */}
            <Route path="/privacy" element={<Index />} />
            <Route path="/terms" element={<Index />} />
            <Route path="/cookies" element={<Index />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Global Components */}
          <ServicesChatbot />
          <ConsultationWidget />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
