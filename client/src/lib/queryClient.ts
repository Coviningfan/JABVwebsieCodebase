// client/src/lib/queryClient.ts
import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * Enhanced API request function for JABV Labs with Supabase integration
 * Handles contact forms, ElevenLabs redirects, and general API calls
 */
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const config: RequestInit = {
    method,
    headers: data ? { 
      "Content-Type": "application/json",
      // Add any additional headers needed for your API
      "Accept": "application/json",
    } : {
      "Accept": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  };

  // Log the request for debugging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log(`API Request: ${method} ${url}`, data ? { body: data } : '');
  }

  const res = await fetch(url, config);

  // Enhanced error handling with better error messages
  if (!res.ok) {
    let errorMessage = `HTTP ${res.status}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // If JSON parsing fails, use the status text
      errorMessage = res.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  return res;
}

/**
 * Enhanced query function with better error handling for unauthorized requests
 */
type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey, signal }) => {
    const url = queryKey[0] as string;
    
    const res = await fetch(url, {
      credentials: "include",
      signal, // Support for query cancellation
      headers: {
        "Accept": "application/json",
      },
    });

    // Handle unauthorized requests based on the specified behavior
    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    
    // Return the JSON response
    const result = await res.json();
    
    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Query Response from ${url}:`, result);
    }
    
    return result;
  };

/**
 * Specialized function for contact form submissions
 * Used by the contact form mutation
 */
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}) {
  const response = await apiRequest('POST', '/api/contact', data);
  return response.json();
}

/**
 * Specialized function for ElevenLabs redirect handling
 */
export async function handleElevenLabsRedirect(action: string) {
  const response = await apiRequest('POST', '/api/elevenlabs-redirect', { action });
  return response.json();
}

/**
 * Enhanced QueryClient configuration optimized for JABV Labs
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      // Network-related options
      refetchInterval: false, // Don't auto-refetch
      refetchOnWindowFocus: false, // Don't refetch on window focus
      refetchOnReconnect: true, // Refetch when connection is restored
      refetchOnMount: true, // Refetch when component mounts
      
      // Caching options
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
      
      // Error handling
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    },
    mutations: {
      // Mutation-specific options
      retry: (failureCount, error) => {
        // Don't retry contact form submissions or other mutations on 4xx errors
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        // Retry once for network errors
        return failureCount < 1;
      },
      retryDelay: 1000, // Wait 1 second before retrying mutations
    },
  },
});

/**
 * Utility function to invalidate specific queries
 * Useful for refreshing data after mutations
 */
export const invalidateQueries = (queryKey: string[]) => {
  return queryClient.invalidateQueries({ queryKey });
};

/**
 * Utility function to manually set query data
 * Useful for optimistic updates
 */
export const setQueryData = <T>(queryKey: string[], data: T) => {
  queryClient.setQueryData(queryKey, data);
};

/**
 * Utility function to get cached query data
 */
export const getQueryData = <T>(queryKey: string[]): T | undefined => {
  return queryClient.getQueryData(queryKey);
};

/**
 * Clear all cached data
 * Useful for logout scenarios
 */
export const clearAllQueries = () => {
  queryClient.clear();
};

// Export commonly used query keys for consistency
export const QUERY_KEYS = {
  CONTACTS: ['contacts'] as const,
  USER_PROFILE: ['user', 'profile'] as const,
  PROJECTS: ['projects'] as const,
  SERVICES: ['services'] as const,
} as const;
