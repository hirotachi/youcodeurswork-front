import React from "react";
import ProjectPreview from "@components/projects/ProjectPreview";
import styles from "@modules/projects/Projects.module.scss";

const Projects = () => {
  return (
    <div className={styles.projects}>
      <ProjectPreview />
      <ProjectPreview />
      <ProjectPreview />
      <ProjectPreview />
    </div>
  );
};

export default Projects;
