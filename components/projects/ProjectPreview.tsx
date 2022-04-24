import React from "react";
import styles from "@modules/projects/ProjectPreview.module.scss";
import faShare from "@icons/solid/faShare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faHeart from "@icons/solid/faHeart";
import Link from "next/link";

export const projectData = {
  preview:
    "https://assets.awwwards.com/awards/media/cache/optimize/submissions/2022/03/622f1bc0345e5694329041.jpg",
  name: "hello world",
  link: "https://howdy.gr/",
  createdAt: new Date(),
  likes: 50,
  description: "<b>something about this project</b>",
  tags: ["react", "php", "Javascript", "html"],
  author: {
    id: 1,
    name: "said oudouane",
    avatar:
      "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/1385480/61e02c87b9eb7556812750.jpg",
  },
  technologies: ["react", "php", "typescript"],
};

type ProjectPreviewProps = typeof projectData;

const ProjectPreview = (props: ProjectPreviewProps) => {
  const { preview, name, link, likes, description, tags, author } = props;

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
          <Link href={"/students/1"}>
            <a className={styles.author}>
              <span className={styles.avatar}>
                <img src={author.avatar} alt={author.name} />
              </span>
              <p className={styles.infoName}>
                <span>by</span> {author.name}
              </p>
            </a>
          </Link>
          <span className={styles.like}>
            <FontAwesomeIcon icon={faHeart} /> {likes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
