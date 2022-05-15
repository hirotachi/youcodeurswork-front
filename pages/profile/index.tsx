import React, { useEffect } from "react";
import Profile from "@components/Profile";
import useAuth from "@hooks/useAuth";
import { useFetch } from "use-http";
import useAuthGuard from "@hooks/useAuthGuard";

const ProfilePage = () => {
  const { role } = useAuth();
  useAuthGuard();
  const { data: posts = [], get: getPosts } = useFetch(
    `/me/${role === "recruiter" ? "jobs" : "projects"}`,
    {
      cachePolicy: "network-only",
    }
  );

  const { data: me, get: getMe } = useFetch(`/me`, {
    cachePolicy: "network-only",
  });
  useEffect(() => {
    getPosts();
    getMe();
  }, []);
  return (
    <Profile
      canEdit
      data={me?.data}
      type={role === "student" ? "projects" : "jobs"}
      externals={[
        ...(!!me?.data?.site
          ? [
              {
                label: "View Resume",
                url: me?.data?.site,
              },
            ]
          : []),
        {
          label: "Edit Profile",
          url: "/profile/update",
        },
      ]}
      list={posts?.data}
    />
  );
};

export default ProfilePage;
