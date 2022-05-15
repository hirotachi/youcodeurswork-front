import React from "react";
import ProjectForm from "@components/ProjectForm";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import { apiUrl } from "@pages/jobs";

type UpdateProjectProps = {
  project: TProject;
};
const update: NextPage<UpdateProjectProps> = (props) => {
  const { project } = props;
  const router = useRouter();
  return <ProjectForm onCancel={() => router.back()} values={project} />;
};

export const getServerSideProps: GetServerSideProps<
  UpdateProjectProps
> = async ({ params }) => {
  const response = await fetch(`${apiUrl}/projects/${params?.project}`).then(
    (res) => res.json()
  );
  const project = response.data;
  return {
    props: {
      project,
    },
  };
};
export default update;
