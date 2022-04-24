import React from "react";
import ProjectPreview, {
  projectData,
} from "@components/projects/ProjectPreview";
import styles from "@modules/projects/Projects.module.scss";

const Projects = () => {
  const loadMore = () => {
    console.log("loading more");
  };
  return (
    <div className={styles.projects}>
      {Array.from({ length: 10 }).map((_, i) => (
        <ProjectPreview key={i} {...projectData} />
      ))}
      <button className={styles.load} onClick={loadMore}>
        load more
      </button>
    </div>
  );
};

export default Projects;
