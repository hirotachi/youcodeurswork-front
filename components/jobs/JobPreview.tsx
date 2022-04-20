import React from "react";
import styles from "@modules/jobs/JobPreview.module.scss";
import Link from "next/link";

const job = {
  position: "Full Stack developer", // required max length 120
  contract: "CDI", // select with options (CDD, CDI) required
  tags: "test,nice,dude", // tags are separated by comma
  isRemote: true, // checkbox required
  description: "lorem", // editor required
  responsibilities: "",
  createdAt: new Date().toString(),
  author: {
    id: 1,
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
  },
};

const JobPreview = () => {
  return (
    <div className={styles.preview}>
      <div className={styles.header}>
        <p className={styles.location}>Casablanca</p>
        {job.isRemote && <span className={styles.remote}>remote</span>}
      </div>
      <p className={styles.position}>{job.position}</p>

      <Link href={"/recruiters/1"}>
        <a className={styles.company}>{job.author.name}</a>
      </Link>
      <p className={styles.description}>{job.description}</p>
      <div className={styles.other}>9 hours ago</div>
    </div>
  );
};

export default JobPreview;
