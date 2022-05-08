import React, { useMemo } from "react";
import styles from "@modules/jobs/JobPreview.module.scss";
import Dropdown from "@components/Dropdown";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faEllipsisH from "@icons/solid/faEllipsisH";
import Link from "next/link";

type JobPreviewProps = TJobPreview & { showControls?: boolean };

const JobPreview = (props: JobPreviewProps) => {
  const {
    category,
    company_logo,
    company_name,
    elapsed_time,
    description,
    id,
    location,
    remote,
    showControls,
    title,
    user,
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
            <img
              src={company_logo || user.avatar}
              alt={company_name || user.name}
            />
          </span>
          <div className={styles.header}>
            {location && <p className={styles.location}>{location}</p>}
            {remote && <span className={styles.remote}>remote</span>}
          </div>
          <p className={styles.position}>{title}</p>

          <p className={styles.company}>{company_name || user.name}</p>
          <div className={styles.description}>{descriptionText}</div>
          <div className={styles.other}>
            <p className={styles.category}>{category}</p>
            <p className={styles.date}>{elapsed_time}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default JobPreview;
