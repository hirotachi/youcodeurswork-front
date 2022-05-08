import React, { useState } from "react";
import ProjectPreview from "@components/projects/ProjectPreview";
import styles from "@modules/projects/Projects.module.scss";
import { NextPage } from "next";
import { useFetch } from "use-http";
import { apiUrl } from "@pages/jobs";

type ProjectsProps = {
  data: TProjectPreview[];
} & TPaginationData;
const ProjectsPage: NextPage<ProjectsProps> = (props) => {
  const { data: projects, meta } = props;
  const [page, setPage] = useState(1);
  const { data = [], loading } = useFetch<TProjectPreview[]>(
    `/jobs?page=${page}`,
    {
      data: projects,
      perPage: meta.per_page,
      onNewData: (currentProjects, newData) => {
        if (page === 1) return currentProjects;
        return [...currentProjects, ...newData.data];
      },
    },
    [page]
  );
  const loadMore = () => {
    if (meta.last_page === page) return;
    setPage((v) => v + 1);
  };
  return (
    <div className={styles.projects}>
      {data.map((project) => (
        <ProjectPreview key={project.id} {...project} />
      ))}
      {!loading && meta.total !== data.length && (
        <button className={styles.load} onClick={loadMore}>
          load more
        </button>
      )}
    </div>
  );
};

export async function getStaticProps() {
  const projects = await fetch(`${apiUrl}/projects`);
  const res = await projects.json();
  return {
    props: res,
    revalidate: 10,
  };
}

export default ProjectsPage;
