import React from "react";
import styles from "@modules/jobs/Jobs.module.scss";
import JobPreview from "@components/jobs/JobPreview";

const index = () => {
  const loadMore = () => {
    console.log("load more");
  };
  return (
    <div className={styles.jobs}>
      <div className={styles.list}>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <JobPreview key={index} />
          ))}
      </div>
      <span className={styles.load} onClick={loadMore}>
        show all jobs
      </span>
    </div>
  );
};

export default index;
