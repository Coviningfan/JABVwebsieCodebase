import { useEffect } from "react";
import { Route, Switch } from "wouter";

import Contact from "@/pages/contact";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import InteractiveWebsites from "@/pages/services/interactive-websites";
import MobileAppDevelopment from "@/pages/services/mobile-app-development";
import WebsiteRedesigns from "@/pages/services/website-redesigns";

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

export default function App() {
  useEffect(() => {
    const existing = document.querySelector("elevenlabs-convai");
    if (!existing) {
      const widgetNode = document.createElement("elevenlabs-convai");
      widgetNode.setAttribute("agent-id", "agent_01jynfyb8neqkby2q4esd71ybw");
      document.body.appendChild(widgetNode);
    }

    if (!document.querySelector('script[src*="convai-widget-embed"]')) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);

  return <Router />;
}
