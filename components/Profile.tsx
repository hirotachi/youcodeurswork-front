import React from "react";
import styles from "@modules/Profile.module.scss";
import {
  faBitbucket,
  faFacebookF,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faLink from "@icons/solid/faLink";
import JobPreview from "@components/jobs/JobPreview";
import ProjectPreview from "@components/projects/ProjectPreview";
import withNoSSR from "@lib/withNoSSR";
import clsx from "clsx";

const socials = {
  facebook: faFacebookF,
  twitter: faTwitter,
  linkedin: faLinkedinIn,
  instagram: faInstagram,
  github: faGithub,
  bitbucket: faBitbucket,
  other: faLink,
};

// get name of site from url using regex without including .com
const getSiteName = (url: string) => {
  const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)\./;
  const match = url.match(regex);
  return match ? match[1] : "";
};

type ProfileProps<T> = {
  loadMore?: () => void;
  canEdit?: boolean;
  externals?: {
    label: string;
    target?: string;
    url: string;
  }[];
  data: TUser;
  type: T;
  list: (T extends "jobs" ? TJobPreview[] : TProjectPreview)[];
};

const Profile = <T extends "jobs" | "projects">(props: ProfileProps<T>) => {
  const { externals, data = {}, type, list = [], loadMore, canEdit } = props;
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.socials}>
          {data.social_accounts?.map((social) => {
            const siteName = getSiteName(social) ?? "other";
            return (
              <a
                href={social}
                target="_blank"
                rel="noopener noreferrer"
                key={social}
              >
                <FontAwesomeIcon icon={socials[siteName]} />
              </a>
            );
          })}
        </div>
        <div className={styles.main}>
          <div className={styles.avatar}>
            <img src={data.avatar} alt="avatar" />
          </div>
          <p className={styles.name}>{data.name}</p>
          <p className={styles.headline}>{data.headline}</p>
          <div
            className={styles.about}
            dangerouslySetInnerHTML={{ __html: data.description ?? "" }}
          />
        </div>
        {externals && (
          <div className={styles.externals}>
            {externals.map((external) => {
              return (
                <a
                  href={external.url}
                  target={external.target}
                  rel={external.target ? "noopener noreferrer" : ""}
                  key={external.label}
                >
                  <span>{external.label}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.sections}>
          <span className={styles.section}>
            {list.length !== 0 ? list.length : ""} {type}
          </span>
        </div>
        <div className={clsx(styles.list, type === "jobs" && styles.jobs)}>
          {!list.length ? (
            <p className={styles.placeholder}>No {type} Yet</p>
          ) : (
            list.map((item, i) => {
              const Comp = type === "jobs" ? JobPreview : ProjectPreview;
              // @ts-ignore
              return <Comp key={i} {...item} showControls={canEdit} />;
            })
          )}
        </div>
        {loadMore && (
          <span className={styles.load} onClick={() => loadMore?.()}>
            load more
          </span>
        )}
      </div>
    </div>
  );
};

export default withNoSSR(Profile);
