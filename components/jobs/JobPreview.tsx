import React, { useMemo } from "react";
import styles from "@modules/jobs/JobPreview.module.scss";
import Dropdown from "@components/Dropdown";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faEllipsisH from "@icons/solid/faEllipsisH";
import Link from "next/link";

export const jobData = {
  id: 1,
  position: "Full Stack developer", // required max length 120
  contract: "CDI", // select with options (CDD, CDI) required
  tags: "test,nice,dude", // tags are separated by comma
  isRemote: true, // checkbox required
  description: "<b>lorem ipsom</b>", // editor required
  responsibilities: "",
  createdAt: new Date().toString(),
  location: "casablanca",
  author: {
    id: 1,
    name: "John Doe",
    avatar:
      "https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/431154/5edf84f64a83f229316740.jpg",
  },
};

type JobPreviewProps = typeof jobData & { showControls?: boolean };

const JobPreview = (props: JobPreviewProps) => {
  const {
    position,
    contract,
    tags,
    isRemote,
    description,
    createdAt,
    location,
    showControls,
    author,
    id,
  } = props;

  //strip html tags from description
  const descriptionText = useMemo(() => {
    return description.replace(/<\/?[^>]+(>|$)/g, "");
  }, [description]);

  const router = useRouter();
  const options = ["Edit", "Delete"];
  const handleOptionClick = (option: typeof options[number]) => {
    switch (option) {
      case "Edit":
        return router.push(`/jobs/${props.id}/update`);
      case "Delete":
        console.log("Delete");
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      {showControls && (
        <Dropdown
          dropdownClassName={styles.dropdown}
          options={options}
          onClick={handleOptionClick}
          position={"bottom-right"}
          listClassName={styles.dropdownList}
        >
          <span className={styles.control}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </span>
        </Dropdown>
      )}
      <Link href={`/jobs/${id}`}>
        <a className={styles.preview}>
          <span className={styles.image}>
            <img src={author.avatar} alt={author.name} />
          </span>
          <div className={styles.header}>
            <p className={styles.location}>{location}</p>
            {isRemote && <span className={styles.remote}>remote</span>}
          </div>
          <p className={styles.position}>{position}</p>

          <p className={styles.company}>{author.name}</p>
          <div className={styles.description}>{descriptionText}</div>
          <div className={styles.other}>9 hours ago</div>
        </a>
      </Link>
    </div>
  );
};

export default JobPreview;
