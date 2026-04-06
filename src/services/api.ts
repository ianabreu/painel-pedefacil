const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

async function request<T>(
  endpoint: string,
  config: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || response.statusText);
  }

  return response.json();
}

export const api = {
  get: <T>(url: string, config?: RequestInit) =>
    request<T>(url, { ...config, method: "GET" }),
  post: <T>(url: string, body?: any, config?: RequestInit) =>
    request<T>(url, { ...config, method: "POST", body: JSON.stringify(body) }),
  put: <T>(url: string, body?: any, config?: RequestInit) =>
    request<T>(url, { ...config, method: "PUT", body: JSON.stringify(body) }),
  patch: <T>(url: string, body?: any, config?: RequestInit) =>
    request<T>(url, { ...config, method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(url: string, config?: RequestInit) =>
    request<T>(url, { ...config, method: "DELETE" }),
};
