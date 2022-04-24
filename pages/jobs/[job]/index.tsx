import React from "react";
import styles from "@modules/jobs/Job.module.scss";
import { jobData } from "@components/jobs/JobPreview";
import faMapMarkerAlt from "@icons/solid/faMapMarkerAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const index = () => {
  return (
    <div className={styles.job}>
      <div className={styles.intro}>
        <p className={styles.position}>{jobData.position}</p>
        <div className={styles.type}>
          <span className={styles.contract}>{jobData.contract}</span>
          {jobData.isRemote && <span className={styles.remote}>remote</span>}
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.company}>
          <img
            className={styles.avatar}
            src={jobData.author.avatar}
            alt={jobData.author.name}
          />
          <Link href={`/recruiters/${jobData.author.id}`}>
            <a className={styles.name}>{jobData.author.name}</a>
          </Link>
        </div>
        <div className={styles.more}>
          <p className={styles.location}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            {jobData.location} / {jobData.createdAt.toString().slice(0, 10)}
          </p>
          <span className={styles.apply}>apply now</span>
        </div>
      </div>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: jobData.description }}
      />
    </div>
  );
};

export default index;
