import React from "react";
import styles from "@modules/jobs/Job.module.scss";
import { job } from "@components/jobs/JobPreview";
import faMapMarkerAlt from "@icons/solid/faMapMarkerAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const index = () => {
  return (
    <div className={styles.job}>
      <div className={styles.intro}>
        <p className={styles.position}>{job.position}</p>
        <div className={styles.type}>
          <span className={styles.contract}>{job.contract}</span>
          {job.isRemote && <span className={styles.remote}>remote</span>}
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.company}>
          <img
            className={styles.avatar}
            src={job.author.avatar}
            alt={job.author.name}
          />
          <Link href={`/recruiter/${job.author.id}`}>
            <a className={styles.name}>{job.author.name}</a>
          </Link>
        </div>
        <div className={styles.more}>
          <p className={styles.location}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            {job.location} / {job.createdAt.toString().slice(0, 10)}
          </p>
          <span className={styles.apply}>apply now</span>
        </div>
      </div>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: job.description }}
      />
    </div>
  );
};

export default index;
