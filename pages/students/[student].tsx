import React from "react";
import Profile, { profileData } from "@components/Profile";
import { projectData } from "@components/projects/ProjectPreview";

const StudentProfile = () => {
  const loadMore = () => {
    console.log("load more projects");
  };
  return (
    <Profile
      type={"projects"}
      canEdit
      loadMore={loadMore}
      list={Array.from(Array(5), () => projectData)}
      data={profileData}
      externals={[
        {
          label: "View Resume",
          url: "#",
        },
        {
          label: "Edit Profile",
          url: "#",
        },
      ]}
    />
  );
};

export default StudentProfile;
