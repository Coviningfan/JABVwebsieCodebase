import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoadingScreen } from "@/components/loading-screen";
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
  const [isLoading, setIsLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [hasShownLoading, setHasShownLoading] = useState(false);

  useEffect(() => {
    // Check if we've already shown the loading screen this session
    const hasLoaded = sessionStorage.getItem('hasLoadedBefore');
    if (hasLoaded) {
      setIsLoading(false);
      setLoadingComplete(true);
      setHasShownLoading(true);
    }
  }, []);

  useEffect(() => {
    // Add ElevenLabs widget when loading is complete
    if (loadingComplete || hasShownLoading) {
      // Create widget element
      const widgetDiv = document.createElement("elevenlabs-convai");
      widgetDiv.setAttribute("agent-id", "agent_01jynfyb8neqkby2q4esd71ybw");
      document.body.appendChild(widgetDiv);

      // Load the script
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        if (document.body.contains(widgetDiv)) {
          document.body.removeChild(widgetDiv);
        }
      };
    }
  }, [loadingComplete, hasShownLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasLoadedBefore', 'true');
    setHasShownLoading(true);
    setTimeout(() => {
      setLoadingComplete(true);
    }, 300);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoading && !hasShownLoading && (
          <LoadingScreen isLoading={isLoading} onComplete={handleLoadingComplete} />
        )}
        <div className={`transition-opacity duration-500 ${loadingComplete || hasShownLoading ? 'opacity-100' : 'opacity-0'}`}>
          <Toaster />
          <Router loadingComplete={loadingComplete || hasShownLoading} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
