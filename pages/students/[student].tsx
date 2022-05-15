import React from "react";
import Profile from "@components/Profile";
import { NextPage } from "next";
import { apiUrl } from "@pages/jobs";

type StudentPageProps = {
  student: TUser;
  projects: TProjectPreview[];
};
const StudentProfile: NextPage<StudentPageProps> = (props) => {
  const { student, projects } = props;
  const loadMore = () => {
    console.log("load more projects");
  };
  return (
    <Profile
      type={"projects"}
      // loadMore={loadMore}
      list={projects}
      data={student}
      externals={
        student.site
          ? [
              {
                label: "View Resume",
                url: student.site,
              },
            ]
          : []
      }
    />
  );
};

export const getServerSideProps = async ({ params }) => {
  const studentId = params?.student;
  const student = await fetch(`${apiUrl}/users/${studentId}`).then((res) =>
    res.json()
  );
  const projects = await fetch(`${apiUrl}/users/${studentId}/projects`).then(
    (res) => res.json()
  );
  return {
    props: {
      student: student.data,
      projects: projects.data,
    },
  };
};

export default StudentProfile;
