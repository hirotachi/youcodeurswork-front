import React from "react";
import styles from "@modules/projects/project.module.scss";
import faHeart from "@icons/solid/faHeart";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import faInfo from "@icons/solid/faInfo";
import Link from "next/link";
import faShare from "@icons/solid/faShare";
import clsx from "clsx";
import useInView from "@hooks/useInView";
import useToggle from "@hooks/useToggle";
import faTimes from "@icons/regular/faTimes";
import useClickOutside from "@hooks/useClickOutside";
import { GetStaticPaths, GetStaticProps } from "next";
import { projectData } from "@utils/data";

type ProjectPageProps = {
  project: TProject;
};
const ProjectPage = (props: ProjectPageProps) => {
  const { project } = props;
  const {
    created_at,
    creator,
    description,
    images,
    liked,
    likesCount,
    name,
    repo_link,
    tags,
    technologies,
  } = project;

  const [isPopupOpen, togglePopup] = useToggle(false, true);

  const [headerInView, ref] = useInView({ threshold: 0.5 });
  const variants: Variants = {
    initial: {
      opacity: 0,
      y: -50,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -50,
    },
  };
  const profileLink = `/students/${creator.id}`;
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const popupVariants: Variants = {
    initial: {
      opacity: 0,
      y: -50,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -50,
    },
  };
  const fadeVariants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const popupRef = useClickOutside(() => isPopupOpen && togglePopup());
  const handleLike = () => {
    console.log("like");
    //  todo add like functionality
  };
  return (
    <div className={styles.project}>
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div {...fadeVariants} className={styles.popup}>
            <motion.div
              {...popupVariants}
              className={styles.content}
              ref={popupRef}
            >
              <span onClick={() => togglePopup()} className={styles.close}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
              <h3 className={styles.contentHeader}>project details</h3>
              <p className={styles.date}>
                Posted <span>{formattedDate}</span>
              </p>
              <div className={styles.tags}>
                <h4 className={styles.tagsHeader}>tags</h4>
                <div className={styles.tagsList}>
                  {tags.map((tag) => (
                    <Link href={`/projects/?tags=${tag}`} key={tag}>
                      <a className={styles.tag}>{tag}</a>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.side}>
        <div className={styles.content}>
          <div className={styles.main}>
            <Link href={profileLink}>
              <a className={styles.avatar}>
                <img src={creator.avatar} alt={creator.name} />
              </a>
            </Link>
            <a href={repo_link} className={styles.btn}>
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <span className={styles.btn}>
              <FontAwesomeIcon icon={faShare} />
            </span>
            <span className={styles.btn} onClick={() => togglePopup()}>
              <FontAwesomeIcon icon={faInfo} />
            </span>
            <AnimatePresence>
              {!headerInView && (
                <motion.span
                  transition={{ duration: 0.2 }}
                  {...variants}
                  className={clsx(styles.btn, liked && styles.likesActive)}
                  onClick={handleLike}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className={styles.header} ref={ref}>
        <div className={styles.main}>
          <Link href={profileLink}>
            <a className={styles.avatar}>
              <img src={creator.avatar} alt={creator.name} />
            </a>
          </Link>

          <div className={styles.more}>
            <p className={styles.name}>{name}</p>
            <Link href={profileLink}>
              <a className={styles.creator}>{creator.name}</a>
            </Link>
          </div>
        </div>
        <div className={styles.controls}>
          <span
            className={clsx(
              styles.btn,
              styles.likes,
              liked && styles.likesActive
            )}
            onClick={handleLike}
          >
            <FontAwesomeIcon icon={faHeart} />
            <i>{likesCount}</i>
          </span>
          <a
            href={repo_link}
            className={styles.btn}
            target={"__blank"}
            rel={"noopener noreferrer"}
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <span className={styles.btn}>
            <FontAwesomeIcon icon={faShare} />
          </span>
          <span
            className={clsx(styles.btn, styles.info)}
            onClick={() => togglePopup()}
          >
            <FontAwesomeIcon icon={faInfo} />
          </span>
        </div>
      </div>
      <div className={styles.preview}>
        <img src={images[0]} alt={name} />
      </div>
      <div className={styles.info}>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className={styles.technologies}>
          {technologies.map((tech) => {
            return (
              <span key={tech} className={styles.tech}>
                #{tech}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<ProjectPageProps> = async () => {
  // const { id } = params;
  // todo fetch project
  return {
    props: {
      project: projectData,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // todo fetch projects
  return {
    paths: [{ params: { project: "1" } }],
    fallback: "blocking",
  };
};

export default ProjectPage;
