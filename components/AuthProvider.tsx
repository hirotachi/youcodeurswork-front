import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import useLocalStorage from "@hooks/useLocalStorage";
import { FetchProviderProps, Provider, useFetch } from "use-http";

type TAuthData = {
  user: TUserPreview;
  token: string;
  role: TUser["role"];
};

type TAuthState = {
  isLoggedIn: boolean;
} & TAuthData;

type TAuthContext = {
  login: (data: TAuthResponse) => void;
  logout: () => void;
  setAuthState: (state: TAuthState) => void;
} & TAuthState;

export const AuthContext = createContext<TAuthContext>(
  null as unknown as TAuthContext
);

const initialState: TAuthState = { isLoggedIn: false } as TAuthState;

const AuthProvider = (props: PropsWithChildren<any>) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { children } = props;

  const [authData, setAuthData, clearAuthData] =
    useLocalStorage<TAuthData>("auth");

  const [authState, setAuthState] = useState<TAuthState>(() => {
    if (typeof window === "undefined" || !authData) {
      return initialState;
    }
    return {
      ...authData,
      isLoggedIn: !!authData.token,
    };
  });

  const login = (data: TAuthResponse) => {
    const newData = {
      user: data.user,
      token: data.access_token,
      role: data.role,
    } as TAuthData;
    setAuthState({ ...newData, isLoggedIn: true });
    setAuthData(newData);
  };
  const token = useRef(authState.token);
  const config: FetchProviderProps["options"] = {
    interceptors: {
      request: async ({ options }) => {
        if (token.current) {
          options.headers.Authorization = `Bearer ${token.current}`;
        }
        return options;
      },
    },
  };
  useEffect(() => {
    token.current = authState.token;
  }, [authState.token]);

  // @ts-ignore
  const { get } = useFetch(`${apiUrl?.replace(/\/$/, "")}/logout`, {
    cachePolicy: "network-only",
    ...config,
  });
  const logout = async () => {
    const res = await get();
    if (res.message !== "success") {
      return;
    }
    setAuthState(initialState);
    clearAuthData();
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState, login, logout }}>
      <Provider url={apiUrl} options={config}>
        {children}
      </Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
