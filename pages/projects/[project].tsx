import React from "react";
import styles from "@modules/projects/project.module.scss";
import { projectData } from "@components/projects/ProjectPreview";
import useToggle from "@hooks/useToggle";
import faHeart from "@icons/solid/faHeart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// todo add info on the right side
// todo add project name on top of the preview

// todo: more info including (tags, creation Date, github link, hosting link)
const ProjectPage = () => {
  const {
    author,
    likes,
    description,
    link,
    name,
    preview,
    tags,
    technologies,
  } = projectData;

  const [isFormOpen, toggleFormOpen] = useToggle(false, true);


  return (
    <div className={styles.projects}>
      <div className={styles.header}>
        <div className={styles.avatar}>author pic</div>
        <div className={styles.headerMain}>
          <p className={styles.name}>{name}</p>
          <div className={styles.headerMore}>
            <p className={styles.author}>{author.name}</p>
            <span className={styles.hire} onClick={() => toggleFormOpen()}>
              hire me
            </span>
          </div>
        </div>
        <span className={styles.likes}>
          <FontAwesomeIcon icon={faHeart} /> {likes}
        </span>
      </div>
      <div className={styles.preview}>
        <img src={preview} alt={name} />
      </div>
      <div className={styles.info}>
        <p className={styles.description}>{description}</p>
        <div className={styles.tech}>
          {technologies.map((tech) => {
            return (
              <span key={tech} className={styles.name}>
                #{tech}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
