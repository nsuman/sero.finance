import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentStart from "./pages/student/StudentStart";
import StudentApply from "./pages/student/StudentApply";
import StudentQuotes from "./pages/student/StudentQuotes";
import StudentNegotiation from "./pages/student/StudentNegotiation";
import BusinessStart from "./pages/business/BusinessStart";
import BusinessApply from "./pages/business/BusinessApply";
import BusinessQuotes from "./pages/business/BusinessQuotes";
import BusinessNegotiation from "./pages/business/BusinessNegotiation";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/student/start" element={<StudentStart />} />
            <Route path="/student/apply" element={<StudentApply />} />
            <Route path="/student/quotes" element={<StudentQuotes />} />
            <Route path="/student/application/:offerId" element={<StudentNegotiation />} />
            <Route path="/business/start" element={<BusinessStart />} />
            <Route path="/business/apply" element={<BusinessApply />} />
            <Route path="/business/quotes" element={<BusinessQuotes />} />
            <Route path="/business/application/:offerId" element={<BusinessNegotiation />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
