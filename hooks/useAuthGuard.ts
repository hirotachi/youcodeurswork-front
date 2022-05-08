import useAuth from "@hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

function useAuthGuard() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);
}
export default useAuthGuard;
