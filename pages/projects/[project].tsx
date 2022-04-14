import React, { useState } from "react";
import styles from "@modules/projects/project.module.scss";
import { projectData } from "@components/projects/ProjectPreview";
import faHeart from "@icons/solid/faHeart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import faInfo from "@icons/solid/faInfo";
import Link from "next/link";
import faShare from "@icons/solid/faShare";
import clsx from "clsx";

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

  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked((v) => !v);
  };
  const profileLink = `/students/${author.id}`;
  return (
    <div className={styles.project}>
      <div className={styles.side}>
        <div className={styles.content}>
          <div className={styles.main}>
            <Link href={profileLink}>
              <a className={styles.avatar}>
                <img src={author.avatar} alt={author.name} />
              </a>
            </Link>
            <span className={styles.btn}>
              <FontAwesomeIcon icon={faGithubAlt} />
            </span>
            <span className={styles.btn}>
              <FontAwesomeIcon icon={faShare} />
            </span>
            <span className={styles.btn}>
              <FontAwesomeIcon icon={faInfo} />
            </span>
          </div>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.main}>
          <Link href={profileLink}>
            <a className={styles.avatar}>
              <img src={author.avatar} alt={author.name} />
            </a>
          </Link>

          <div className={styles.more}>
            <p className={styles.name}>{name}</p>
            <Link href={profileLink}>
              <a className={styles.author}>{author.name}</a>
            </Link>
          </div>
        </div>
        <div className={styles.controls}>
          <span
            className={clsx(styles.likes, liked && styles.likesActive)}
            onClick={handleLike}
          >
            <FontAwesomeIcon icon={faHeart} />
            <i>{likes}</i>
          </span>
          <span className={styles.repo}>
            <FontAwesomeIcon icon={faGithubAlt} />
          </span>
          <span className={styles.share}>
            <FontAwesomeIcon icon={faShare} />
          </span>
          <span className={styles.info}>
            <FontAwesomeIcon icon={faInfo} />
          </span>
        </div>
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
