import { useRouter } from "next/router";

function useIsAuthPage() {
  const router = useRouter();
  const authPages = ["login", "register"];
  return authPages.some((page) => router.pathname === `/${page}`);
}

export default useIsAuthPage;
