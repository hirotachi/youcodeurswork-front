import { useContext } from "react";
import { AuthContext } from "@components/AuthProvider";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
