import React from "react";
import ProjectPreview from "@components/projects/ProjectPreview";
import styles from "@modules/projects/Projects.module.scss";

type ProjectsProps = {
  projects: TProjectPreview[];
};
const ProjectsPreviews = (props: ProjectsProps) => {
  const { projects } = props;
  const loadMore = () => {
    console.log("loading more");
  };
  return (
    <div className={styles.projects}>
      {projects.map((project) => (
        <ProjectPreview key={project.id} {...project} />
      ))}
      <button className={styles.load} onClick={loadMore}>
        load more
      </button>
    </div>
  );
};

export default ProjectsPreviews;
