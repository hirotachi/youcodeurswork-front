import React from "react";
import styles from "@modules/jobs/Jobs.module.scss";
import JobPreview, { job } from "@components/jobs/JobPreview";

const index = () => {
  const loadMore = () => {
    console.log("load more");
  };
  return (
    <div className={styles.jobs}>
      <div className={styles.list}>
        {Array.from({ length: 10 }).map((_, i) => (
          <JobPreview key={i} {...job} />
        ))}
      </div>
      <span className={styles.load} onClick={loadMore}>
        show all jobs
      </span>
    </div>
  );
};

export default index;
