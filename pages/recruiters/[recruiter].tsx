import React from "react";
import Profile, { profileData } from "@components/Profile";
import { jobData } from "@components/jobs/JobPreview";

const Recruiter = () => {
  return (
    <Profile
      data={profileData}
      type={"jobs"}
      externals={[
        {
          label: "Visit Site",
          url: "https://www.google.com",
        },
      ]}
      list={Array.from(Array(5), () => jobData)}
    />
  );
};

export default Recruiter;
