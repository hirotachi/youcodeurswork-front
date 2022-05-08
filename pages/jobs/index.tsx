import React, { useState } from "react";
import styles from "@modules/jobs/Jobs.module.scss";
import JobPreview from "@components/jobs/JobPreview";
import { useFetch } from "use-http";
import { NextPage } from "next";

// const jobs = Array.from<TJobPreview>({ length: 10 })
//   .fill(jobDataPreview)
//   .map((job, index) => ({ ...job, id: index }));

type TJobsProps = {
  data: TJobPreview[];
} & TPaginationData;

const JobsPage: NextPage<TJobsProps> = (props) => {
  const { data: jobs, meta } = props;
  const [page, setPage] = useState(1);
  const { data = [], loading } = useFetch<TJobsProps>(
    `/jobs?page=${page}`,
    {
      data: jobs,
      perPage: meta.per_page,
      onNewData: (currentJobs, newData) => {
        if (page === 1) return currentJobs;
        return [...currentJobs, ...newData.data];
      },
    },
    [page]
  );
  const loadMore = () => {
    if (meta.last_page === page) return;
    setPage((v) => v + 1);
  };
  return (
    <div className={styles.jobs}>
      <div className={styles.list}>
        {data.map((job) => (
          <JobPreview key={job.id} {...job} />
        ))}
      </div>
      {!loading && data.length !== meta.total && (
        <span className={styles.load} onClick={loadMore}>
          load more jobs
        </span>
      )}
    </div>
  );
};

export const url = `${process.env.NEXT_PUBLIC_API_URL}/jobs`;

export async function getStaticProps() {
  const jobs = await fetch(url);
  const res = await jobs.json();
  return {
    props: res,
    revalidate: 10,
  };
}

export default JobsPage;
