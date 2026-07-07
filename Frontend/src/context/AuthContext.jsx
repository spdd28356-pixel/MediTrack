import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import api from "../api/axiosConfig.js";

const AuthContext = createContext();
const storageKey = "meditrackToken";
const userKey = "meditrackUser";

const getStoredToken = () => localStorage.getItem(storageKey) || "";
const getStoredUser = () => {
  const raw = localStorage.getItem(userKey);
  return raw ? JSON.parse(raw) : null;
};

const decodeJwtPayload = (token) => {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const getTokenExpiry = (token) => {
  const decoded = decodeJwtPayload(token);
  return decoded?.exp ? decoded.exp * 1000 : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(getStoredToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = useCallback(() => {
    setUser(null);
    setToken("");
    localStorage.removeItem(storageKey);
    localStorage.removeItem(userKey);
  }, []);

  const setSession = (sessionToken, sessionUser, remember = true) => {
    setToken(sessionToken);
    setUser(sessionUser);

    if (remember) {
      localStorage.setItem(storageKey, sessionToken);
      localStorage.setItem(userKey, JSON.stringify(sessionUser));
    } else {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(userKey);
    }
  };

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const expiry = getTokenExpiry(token);

      if (expiry && expiry < Date.now()) {
        logout();
        return;
      }

      const timeout = expiry ? expiry - Date.now() : null;
      if (timeout) {
        const timer = window.setTimeout(() => logout(), timeout);
        return () => window.clearTimeout(timer);
      }
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  useEffect(() => {
    if (token && (!user || !user.createdAt)) {
      api
        .get("/auth/profile")
        .then((response) => setUser(response.data.user))
        .catch(() => logout());
    }
  }, [token, user, logout]);

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [logout]);

  useEffect(() => {
    const handleLogoutEvent = () => logout();
    window.addEventListener("meditrackLogout", handleLogoutEvent);
    return () => window.removeEventListener("meditrackLogout", handleLogoutEvent);
  }, [logout]);

  const login = async ({ email, password, remember }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login", { email, password });
      setSession(response.data.token, response.data.user, remember);
      setLoading(false);
      return response.data;
    } catch (errorResponse) {
      setLoading(false);
      const message = errorResponse?.response?.data?.message || "Login failed.";
      setError(message);
      throw new Error(message);
    }
  };

  const register = async ({ fullName, email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/register", { fullName, email, password });
      setLoading(false);
      return response.data;
    } catch (errorResponse) {
      setLoading(false);
      const message = errorResponse?.response?.data?.message || "Registration failed.";
      setError(message);
      throw new Error(message);
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      login,
      register,
      logout,
      setError,
    }),
    [user, token, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
