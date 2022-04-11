import React from "react";
import ProjectPreview from "@components/projects/ProjectPreview";
import styles from "@modules/projects/Projects.module.scss";

const Projects = () => {
  const loadMore = () => {
    console.log("loading more");
  };
  return (
    <div className={styles.projects}>
      <ProjectPreview />
      <ProjectPreview />
      <ProjectPreview />
      <ProjectPreview />
      <button className={styles.load} onClick={loadMore}>
        load more
      </button>
    </div>
  );
};

export default Projects;
