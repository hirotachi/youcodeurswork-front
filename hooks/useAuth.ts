import { useState } from "react";
import useLocalStorage from "@hooks/useLocalStorage";

type TAuthData = {
  user?: TUserPreview;
  token?: string;
  role?: TUser["role"];
};

type TAuthState = {
  isLoggedIn: boolean;
} & TAuthData;

const initialState: TAuthState = { isLoggedIn: false };

function useAuth() {
  const [authData, setAuthData, clearAuthData] =
    useLocalStorage<TAuthData>("auth");
  const [state, setState] = useState<TAuthState>(() => {
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
    };
    setState({ ...newData, isLoggedIn: true });
    setAuthData(newData);
  };
  const logout = () => {
    setState(initialState);
    clearAuthData();
  };
  return { login, logout, ...state };
}

export default useAuth;
