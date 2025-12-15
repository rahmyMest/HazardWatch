import axios from "axios";

export const baseUrl = import.meta.env.VITE_BASE_URL;
export const mapApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

// Helper to get token always fresh from localStorage
export const getToken = () => localStorage.getItem("token");

// Create axios instance FIRST
export const apiClient = axios.create({
  baseURL: baseUrl,
});

// Add request interceptor AFTER creating apiClient
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor AFTER creating apiClient
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses

  (error) => {
    // Extract backend error message safely
    const backendMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Something went wrong, please try again.";

    // Attach the extracted message to the error for your UI
    error.customMessage = backendMessage;

    // Optional: auto logout on 401 unauthorized
    if (error?.response?.status === 401) {
      console.warn("Unauthorized: Token may be expired.");
    }

    return Promise.reject(error);
  }
);

// Optional: debugging
console.log("Axios interceptor initialized. Current token:", getToken());
