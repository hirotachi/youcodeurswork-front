import React from "react";
import styles from "@modules/projects/project.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faHeart from "@icons/solid/faHeart";
import { projectData } from "@components/projects/ProjectPreview";
import faShare from "@icons/solid/faShare";
import Link from "next/link";

const project = () => {
  const { author, likes, link, name, preview, tags } = projectData;
  return (
    <div className={styles.project}>
      <div className={styles.header}>
        {/*<div>collbas</div>*/}
        <span className={styles.like}>
          <FontAwesomeIcon icon={faHeart} /> {likes}
        </span>
      </div>
      <div className={styles.main}>
        <div className={styles.preview}>
          <img src={preview} alt={name} />
          <a href={link} className={styles.link}>
            <FontAwesomeIcon icon={faShare} />
          </a>
        </div>
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          <p className={styles.author}>
            by{" "}
            <Link href={`/students/${author.id}`}>
              <a>{author.name}</a>
            </Link>
          </p>
          <p className={styles.description}>description</p>
          <div className={styles.tags}>
            {tags.map((tag) => {
              return (
                <Link key={tag} href={`/projects?tags=${tag}`}>
                  <a className={styles.tag}>#{tag}</a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.team}>team behind the project</div>
    </div>
  );
};

export default project;
