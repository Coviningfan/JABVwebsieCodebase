import React from 'react';
import { Router, Route, Switch } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import LoginScreen from './pages/login-screen';
import Dashboard from './pages/dashboard';
import Projects from './pages/projects';
import Settings from './pages/settings';
import NotFound from './pages/not-found';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white">
        <Router>
          <Switch>
            <Route path="/" component={LoginScreen} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/projects" component={Projects} />
            <Route path="/projects/:id" component={Projects} />
            <Route path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;