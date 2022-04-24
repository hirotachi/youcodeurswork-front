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
import JobPreview, { jobData } from "@components/jobs/JobPreview";
import ProjectPreview from "@components/projects/ProjectPreview";

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

export const profileData = {
  name: "Said Oudouane",
  headline: "Full Stack Developer",
  about:
    "a full stack developer with a passion for web development. I am a self-taught developer with a background in business administration. I have a strong passion for learning new technologies and I am always looking for new opportunities to learn and grow.",
  email: "example@gmail.com",
  avatar:
    "https://avatars2.githubusercontent.com/u/56905853?s=460&u=f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d8f9f8b8d8&v=4",
  socials: [
    "https://www.facebook.com/said.oudouane",
    "https://twitter.com/saidoudouane",
    "https://www.linkedin.com/in/saidoudouane/",
    "https://www.instagram.com/saidoudouane/",
    "https://www.github.com/saidoudouane",
  ],
};

type ProfileProps<T> = {
  loadMore?: () => void;
  canEdit?: boolean;
  externals?: [
    {
      label: string;
      url: string;
    }
  ];
  data: typeof profileData;
  type: T;
  list: (T extends "jobs" ? typeof jobData : typeof profileData)[];
};

const Profile = <T extends "jobs" | "projects">(props: ProfileProps<T>) => {
  const { externals, data, type, list, loadMore, canEdit } = props;
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.socials}>
          {data.socials.map((social) => {
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
            dangerouslySetInnerHTML={{ __html: data.about }}
          />
        </div>
        {externals && (
          <div className={styles.externals}>
            {externals.map((external) => {
              return (
                <a
                  href={external.url}
                  target="_blank"
                  rel="noopener noreferrer"
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
        <div className={styles.list}>
          {!list.length ? (
            <p className={styles.placeholder}>No {type} Yet</p>
          ) : (
            list.map((item, i) => {
              const Comp = type === "jobs" ? JobPreview : ProjectPreview;
              // @ts-ignore
              return <Comp key={i} {...item} canEdit={canEdit} />;
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

export default Profile;
