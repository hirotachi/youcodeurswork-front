import React from "react";
import styles from "@modules/jobs/JobPreview.module.scss";
import Link from "next/link";

export const job = {
  position: "Full Stack developer", // required max length 120
  contract: "CDI", // select with options (CDD, CDI) required
  tags: "test,nice,dude", // tags are separated by comma
  isRemote: true, // checkbox required
  description: "lorem", // editor required
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

const JobPreview = () => {
  return (
    <Link href={"/jobs/1"}>
      <a className={styles.preview}>
        <span className={styles.image}>
          <img src={job.author.avatar} alt={job.author.name} />
        </span>
        <div className={styles.header}>
          <p className={styles.location}>{job.location}</p>
          {job.isRemote && <span className={styles.remote}>remote</span>}
        </div>
        <p className={styles.position}>{job.position}</p>

        <p className={styles.company}>{job.author.name}</p>
        <p className={styles.description}>{job.description}</p>
        <div className={styles.other}>9 hours ago</div>
      </a>
    </Link>
  );
};

export default JobPreview;
