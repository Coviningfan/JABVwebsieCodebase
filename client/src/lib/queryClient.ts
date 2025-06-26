import { QueryClient } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
}

export async function apiRequest(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = path.startsWith("/") ? path : `/${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => (ctx: { queryKey: any[] }) => Promise<T | null> = ({ on401 }) => {
  return async ({ queryKey }) => {
    const [url] = queryKey;
    try {
      const res = await apiRequest(url);
      return res.json();
    } catch (error: any) {
      if (error.message.includes("401") && on401 === "returnNull") {
        return null;
      }
      throw error;
    }
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});