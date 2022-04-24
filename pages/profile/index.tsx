import React from "react";
import Profile, { profileData } from "@components/Profile";
import { projectData } from "@components/projects/ProjectPreview";

const ProfilePage = () => {
  return (
    <Profile
      canEdit
      data={profileData}
      type={"projects"}
      externals={[
        {
          label: "View Resume",
          url: "#",
        },
        {
          label: "Edit Profile",
          url: "/profile/update",
        },
      ]}
      list={Array.from(Array(5), () => projectData)}
    />
  );
};

export default ProfilePage;
