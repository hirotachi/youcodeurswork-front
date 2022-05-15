import React from "react";
import Profile from "@components/Profile";
import { apiUrl } from "@pages/jobs";
import { GetServerSideProps, NextPage } from "next";

type RecruiterPageProps = {
  jobs: TJobPreview[];
  recruiter: TUser;
};
const Recruiter: NextPage<RecruiterPageProps> = (props) => {
  const { recruiter, jobs } = props;
  return (
    <Profile
      data={recruiter}
      type={"jobs"}
      externals={
        recruiter.site
          ? [
              {
                label: "Visit Site",
                url: recruiter.site,
              },
            ]
          : []
      }
      list={jobs}
    />
  );
};

export const getServerSideProps: GetServerSideProps<
  RecruiterPageProps
> = async ({ params }) => {
  const recruiterId = params?.recruiter;
  const recruiter = await fetch(`${apiUrl}/users/${recruiterId}`).then((res) =>
    res.json()
  );
  const jobs = await fetch(`${apiUrl}/users/${recruiterId}/jobs`).then((res) =>
    res.json()
  );
  return {
    props: {
      recruiter: recruiter.data,
      jobs: jobs.data,
    },
  };
};

export default Recruiter;
