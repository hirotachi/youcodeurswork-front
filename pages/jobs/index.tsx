import React, { useEffect, useState } from "react";
import styles from "@modules/jobs/Jobs.module.scss";
import JobPreview from "@components/jobs/JobPreview";
import { GetServerSideProps, NextPage } from "next";
import { jobDataPreview } from "@utils/data";
import { apiUrl } from "@utils/constants";
import usePrevious from "@hooks/usePrevious";
import { stringifyQuery } from "@utils/helpers";
import { useRouter } from "next/router";

type TJobsProps = {
  data: TJobPreview[];
} & TPaginationData;

const demoData = Array.from({ length: 3 }).fill(jobDataPreview);
const JobsPage: NextPage<TJobsProps> = (props) => {
  const { data: jobs, meta: ssrMeta } = props;
  const router = useRouter();
  const [page, setPage] = useState(1);
  const previousQuery = usePrevious(stringifyQuery({ ...router.query }));
  const currentQuery = stringifyQuery({ ...router.query });

  const [{ data, loading, abort, meta }, setState] = useState({
    loading: false,
    data: jobs,
    abort: false,
    meta: ssrMeta,
  });

  const fetchJobs = (query, add = false) => {
    fetch(`${apiUrl}/jobs?${query}`, {
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (abort) return;
        setState((v) => ({
          ...v,
          data: add ? [...v.data, ...res.data] : res.data,
          meta: res.meta,
        }));
      })
      .finally(() => {
        if (abort) return;
        setState((v) => ({ ...v, loading: false }));
      });
  };
  useEffect(() => {
    if (previousQuery !== currentQuery) {
      setState((v) => ({ ...v, loading: true }));
      setPage(1);
      fetchJobs(currentQuery);
    }
  }, [router.query]);

  useEffect(() => {
    if (page === 1) return;
    fetchJobs(stringifyQuery({ ...router.query, page }), true);
  }, [page]);

  const loadMore = () => {
    if (meta.last_page === page) return;
    setPage((v) => v + 1);
  };

  return (
    <div className={styles.jobs}>
      <div className={styles.list}>
        {!!data.length ? (
          data.map((job) => <JobPreview key={job.id} {...job} />)
        ) : (
          <p className={styles.placeholder}>no jobs</p>
        )}
      </div>
      {!loading && data.length !== meta.total && (
        <span className={styles.load} onClick={loadMore}>
          load more jobs
        </span>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = stringifyQuery(ctx.query);
  const jobs = await fetch(`${apiUrl}/jobs?${query}`);
  const res = await jobs.json();
  return {
    props: res,
  };
};

export default JobsPage;
