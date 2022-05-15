import React from "react";
import styles from "@modules/jobs/Job.module.scss";
import faMapMarkerAlt from "@icons/solid/faMapMarkerAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { apiUrl } from "@pages/jobs";

type JobPageProps = {
  job: TJob;
};

const JobPage = (props: JobPageProps) => {
  const { job } = props;
  const openApplyPopup = () => {
    console.log("open apply popup");
  };
  return (
    <div className={styles.job}>
      {job.image && (
        <figure className={styles.image}>
          <img src={job.image} alt={job.title} />
        </figure>
      )}
      <div className={styles.main}>
        <div className={styles.intro}>
          <p className={styles.position}>{job.title}</p>
          <div className={styles.type}>
            <span className={styles.contract}>{job.type}</span>
            {job.remote && <span className={styles.remote}>remote</span>}
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.company}>
            <img
              className={styles.avatar}
              src={job.company_logo || job.user.avatar}
              alt={job.company_name || job.user.name}
            />
            <Link href={`/recruiters/${job.user.id}`}>
              <a className={styles.name}>{job.user.name}</a>
            </Link>
            <a
              href={job.company_site}
              target={"__blank"}
              rel={"noopener noreferrer"}
              className={styles.site}
            >
              {job.company_site.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          </div>
          <div className={styles.more}>
            <p className={styles.location}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              {job.location} /{" "}
              {new Date(job.created_at).toDateString().slice(4)}
            </p>
            {job.apply_by === "url" ? (
              <a
                className={styles.apply}
                href={job.apply_to}
                target={"__blank"}
                rel={"noopener noreferrer"}
              >
                apply now
              </a>
            ) : (
              <span className={styles.apply} onClick={openApplyPopup}>
                apply now
              </span>
            )}
          </div>
        </div>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<JobPageProps> = async ({
  params,
}) => {
  const response = await fetch(`${apiUrl}/jobs/${params?.job}`).then((res) =>
    res.json()
  );
  const job = response.data;
  return {
    props: {
      job,
    },
    revalidate: 10,
  };
};

// @ts-ignore
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${apiUrl}/jobs`).then((res) => res.json());
  const paths = response.data.map((job) => ({
    params: {
      job: job.id.toString(),
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export default JobPage;
