import React, {
  FC,
  ReactElement,
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { toast } from "react-toastify";
const baseUrl = "https://x3em-qt51-thgd.n7.xano.io/api:CS-yxokJ";
const context = createContext({
  isAuthenticated: false,
  token: "",
  loginWithPassword: async (email: string, password: string) => {},

  signupWithPassword: async (email: string, password: string) => {},
  resetPassword: async (email: string) => {},
  changePassword: async (key: string, password: string) => {},
  logout: () => {},
});
const { Provider } = context;
const Authenticator: FC<{
  children: ReactElement;
  fallback: ReactElement;
}> = ({ children, fallback }) => {
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    //lets get my xano token from the localStorage
    const token = localStorage.getItem("xano-token");
    if (token) {
      setIsAuthenticated(true);
      setToken(token);
    }
  }, []);
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("xano-token");
  }, []);
  const loginWithPassword = useCallback(async (email: string, password: string) => {
    //reach out to the server for a login
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 200) {
      const { authToken } = await response.json();
      setToken(authToken);
      setIsAuthenticated(true);
      localStorage.setItem("xano-token", authToken);
    } else {
      const body = await response.text();
      toast.error("Could not log in with these credentials");
      throw new Error(body);
    }
  }, []);
  const signupWithPassword = useCallback(async (email: string, password: string) => {
    //reach out to the server for a login
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 200) {
      const { authToken } = await response.json();
      setToken(authToken);
      setIsAuthenticated(true);
      localStorage.setItem("xano-token", authToken);
    } else {
      const body = await response.text();
      throw new Error(body);
    }
  }, []);
  const resetPassword = useCallback(async (email: string) => {
    //reach out to the server for a login
    const response = await fetch(`${baseUrl}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (response.status === 200) {
    }
  }, []);
  const changePassword = useCallback(async (key: string, password: string) => {
    //reach out to the server for a login
    const response = await fetch(`${baseUrl}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, password }),
    });
    if (response.status !== 200) {
      throw new Error("Could not change password");
    }
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const value = useMemo(() => {
    return {
      isAuthenticated,
      token,
      logout,
      loginWithPassword,
      resetPassword,
      changePassword,
      signupWithPassword,
    };
  }, [isAuthenticated, token, logout, loginWithPassword, signupWithPassword]);
  if (isAuthenticated) {
    return <Provider value={value}>{children}</Provider>;
  } else {
    return <Provider value={value}>{fallback}</Provider>;
  }
};
export const useAuthentication = () => {
  const contextValue = useContext(context);
  return contextValue;
};

export const useAuthenticatedFetch = () => {
  const { token, logout } = useAuthentication();
  return useCallback(
    async (path: string, options: RequestInit = {}) => {
      const url = baseUrl + path;
      const response = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401) {
        logout();
      }
      return response;
    },
    [token, logout]
  );
};

export const useAuthenticatedQuery = <T,>(path: string, options?: RequestInit) => {
  const fetch = useAuthenticatedFetch();
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const refresh = useCallback(async () => {
    // const fetchData = async () => {
    try {
      const response = await fetch(path, optionsRef.current);
      if (response.status !== 200) {
        setError(response.statusText as any);
        setLoading(false);
      } else {
        try {
          const data: T = await response.json();
          setData(data);
        } catch (e) {
          setError(e as Error);
        } finally {
          setLoading(false);
        }
      }
    } catch (e) {
      setError(e as Error);
      setLoading(false);
    }
    // };
    // fetchData();
  }, [fetch, path]);
  useEffect(() => {
    refresh();
  }, [refresh]);
  return { data, error, loading, refresh };
};
export type User = {
  name: string;
  email: string;
  address: string;
};
export const useMe = () => {
  const fetch = useAuthenticatedFetch();
  const { data, loading, refresh } = useAuthenticatedQuery<User>(`/auth/me`);
  const update = useCallback(
    async (options: { name: string; password?: string }) => {
      const response = await fetch("/auth/me", {
        method: "POST",
        body: JSON.stringify({
          name: options.name,
          password: options.password || "",
        }),
      });
      if (response.status === 200) {
        refresh();
        const json = (await response.json()) as User;
        return json;
      } else throw new Error(response.statusText);
    },
    [fetch, refresh]
  );

  return useMemo(() => ({ data, loading, refresh, update }), [data, loading, refresh, update]);
};
export default Authenticator;
