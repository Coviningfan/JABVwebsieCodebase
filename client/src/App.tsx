import { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoadingScreen } from "@/components/loading-screen";
import { PageTransition } from "@/components/page-transition";
import Home from "@/pages/home";
import Contact from "@/pages/contact";
import MobileAppDevelopment from "@/pages/services/mobile-app-development";
import InteractiveWebsites from "@/pages/services/interactive-websites";
import WebsiteRedesigns from "@/pages/services/website-redesigns";
import NotFound from "@/pages/not-found";

function Router({ loadingComplete }: { loadingComplete: boolean }) {
  return (
    <Switch>
      <Route path="/" component={() => <Home loadingComplete={loadingComplete} />} />
      <Route path="/contact" component={Contact} />
      <Route path="/services/mobile-app-development" component={MobileAppDevelopment} />
      <Route path="/services/interactive-websites" component={InteractiveWebsites} />
      <Route path="/services/website-redesigns" component={WebsiteRedesigns} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleLoadingComplete = () => {
    // Set loading complete first to start typewriter
    setTimeout(() => {
      setLoadingComplete(true);
    }, 100);
    
    // Hide loading screen after fade completes
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 200);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoadingScreen 
          isLoading={isInitialLoading} 
          onComplete={handleLoadingComplete} 
        />
        <Toaster />
        <Router loadingComplete={loadingComplete} />
        {/* ElevenLabs Agent Widget */}
        <div dangerouslySetInnerHTML={{ __html: '<elevenlabs-convai agent-id="agent_01jynfyb8neqkby2q4esd71ybw"></elevenlabs-convai>' }} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
