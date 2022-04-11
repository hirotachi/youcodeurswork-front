import React from "react";
import styles from "@modules/projects/ProjectPreview.module.scss";
import faShare from "@icons/solid/faShare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faHeart from "@icons/solid/faHeart";
import Link from "next/link";

export const projectData = {
  preview:
    "https://assets.awwwards.com/awards/media/cache/optimize/submissions/2022/03/622f1bc0345e5694329041.jpg",
  name: "tester",
  link: "https://howdy.gr/",
  likes: 50,
  tags: ["react", "php", "Javascript", "html"],
  author: {
    id: 1,
    name: "said oudouane",
    avatar:
      "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/1385480/61e02c87b9eb7556812750.jpg",
  },
};
const ProjectPreview = () => {
  const { author, likes, link, name, preview, tags } = projectData;
  return (
    <div className={styles.project}>
      <div className={styles.preview}>
        <Link href={"/projects/1"}>
          <a>
            <img src={preview} alt={name} />
          </a>
        </Link>

        <a href={link} className={styles.link} target={"__blank"}>
          <FontAwesomeIcon icon={faShare} />
        </a>
      </div>
      <div className={styles.main}>
        <p className={styles.name}>{name}</p>
        <div className={styles.tags}>
          {tags.map((tag) => {
            return (
              <Link key={tag} href={`/projects/?tags=${tag}`}>
                <a className={styles.tag}>#{tag}</a>
              </Link>
            );
          })}
        </div>
        <div className={styles.info}>
          <span className={styles.avatar}>
            <img src={author.avatar} alt={author.name} />
          </span>
          <p className={styles.infoName}>
            <span>by</span> {author.name}
          </p>
          <span className={styles.like}>
            <FontAwesomeIcon icon={faHeart} /> {likes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;