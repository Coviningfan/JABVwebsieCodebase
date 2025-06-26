import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Contact from "@/pages/contact";
import MobileAppDevelopment from "@/pages/services/mobile-app-development";
import InteractiveWebsites from "@/pages/services/interactive-websites";
import WebsiteRedesigns from "@/pages/services/website-redesigns";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/services/mobile-app-development" component={MobileAppDevelopment} />
      <Route path="/services/interactive-websites" component={InteractiveWebsites} />
      <Route path="/services/website-redesigns" component={WebsiteRedesigns} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        {/* ElevenLabs Agent Widget */}
        <elevenlabs-convai agent-id="agent_01jynfyb8neqkby2q4esd71ybw"></elevenlabs-convai>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
