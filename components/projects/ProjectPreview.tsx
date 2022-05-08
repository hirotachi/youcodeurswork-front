import React from "react";
import styles from "@modules/projects/ProjectPreview.module.scss";
import faShare from "@icons/solid/faShare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Dropdown from "@components/Dropdown";
import faEllipsisH from "@icons/solid/faEllipsisH";
import { useRouter } from "next/router";

type ProjectPreviewProps = TProjectPreview & {
  showControls?: boolean;
};

const ProjectPreview = (props: ProjectPreviewProps) => {
  const {
    creator,
    id,
    images: [preview],
    name,
    repo_link,
    showControls,
    technologies,
  } = props;

  const router = useRouter();
  const options = ["Edit", "Delete"] as const;
  const handleOptionClick = (option: typeof options[number]) => {
    switch (option) {
      case "Edit":
        return router.push(`/projects/${id}/update`);
      case "Delete":
        console.log(`delete project ${id}`);
        break;
    }
  };
  const link = `/projects/${id}`;
  return (
    <div className={styles.project}>
      <div className={styles.preview}>
        {showControls && (
          <Dropdown
            dropdownClassName={styles.dropdown}
            options={options}
            onClick={handleOptionClick}
            position={"bottom-right"}
          >
            <span className={styles.control}>
              <FontAwesomeIcon icon={faEllipsisH} />
            </span>
          </Dropdown>
        )}
        <Link href={link}>
          <a className={styles.img}>
            <img src={preview} alt={name} />
          </a>
        </Link>

        <a href={repo_link} className={styles.link} target={"__blank"}>
          <FontAwesomeIcon icon={faShare} />
        </a>
      </div>
      <div className={styles.main}>
        <Link href={link}>
          <a className={styles.name}>{name}</a>
        </Link>
        <div className={styles.technologies}>
          {technologies.map((technology) => {
            return (
              <Link key={technology} href={`/projects/?tags=${technology}`}>
                <a className={styles.technology}>#{technology}</a>
              </Link>
            );
          })}
        </div>
        <div className={styles.info}>
          <Link href={`/students/${creator.id}`}>
            <a className={styles.author}>
              <span className={styles.avatar}>
                {creator.avatar ? (
                  <img src={creator.avatar} alt={creator.name} />
                ) : (
                  <span className={styles.initial}>{creator.name[0]}</span>
                )}
              </span>
              <p className={styles.infoName}>
                <span>by</span> {creator.name}
              </p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
