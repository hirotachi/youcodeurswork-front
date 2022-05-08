import React from "react";
import styles from "@modules/jobs/Jobs.module.scss";
import JobPreview from "@components/jobs/JobPreview";
import { jobDataPreview } from "@utils/data";

const jobs = Array.from<TJobPreview>({ length: 10 })
  .fill(jobDataPreview)
  .map((job, index) => ({ ...job, id: index }));
const index = () => {
  const loadMore = () => {
    console.log("load more");
  };
  return (
    <div className={styles.jobs}>
      <div className={styles.list}>
        {jobs.map((job) => (
          <JobPreview key={job.id} {...job} />
        ))}
      </div>
      <span className={styles.load} onClick={loadMore}>
        load more jobs
      </span>
    </div>
  );
};

export default index;
