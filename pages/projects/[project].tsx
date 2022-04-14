import React, { useState } from "react";
import styles from "@modules/projects/project.module.scss";
import { projectData } from "@components/projects/ProjectPreview";
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

// todo: more info including (tags, creation Date, github link, hosting link)

const ProjectPage = () => {
  const {
    author,
    likes,
    description,
    link,
    name,
    preview,
    tags,
    createdAt,
    technologies,
  } = projectData;

  const [isPopupOpen, togglePopup] = useToggle(false, true);

  const [liked, setLiked] = useState(false);
  const [headerInView, ref] = useInView({ threshold: 0.5 });
  const handleLike = () => {
    setLiked((v) => !v);
  };
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
  const profileLink = `/students/${author.id}`;
  const formattedDate = createdAt.toLocaleDateString("en-US", {
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
                <img src={author.avatar} alt={author.name} />
              </a>
            </Link>
            <span className={styles.btn}>
              <FontAwesomeIcon icon={faGithub} />
            </span>
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
                  className={styles.btn}
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
              <img src={author.avatar} alt={author.name} />
            </a>
          </Link>

          <div className={styles.more}>
            <p className={styles.name}>{name}</p>
            <Link href={profileLink}>
              <a className={styles.author}>{author.name}</a>
            </Link>
          </div>
        </div>
        <div className={styles.controls}>
          <span
            className={clsx(styles.likes, liked && styles.likesActive)}
            onClick={handleLike}
          >
            <FontAwesomeIcon icon={faHeart} />
            <i>{likes}</i>
          </span>
          <span className={styles.repo}>
            <FontAwesomeIcon icon={faGithub} />
          </span>
          <span className={styles.share}>
            <FontAwesomeIcon icon={faShare} />
          </span>
          <span className={styles.info} onClick={() => togglePopup()}>
            <FontAwesomeIcon icon={faInfo} />
          </span>
        </div>
      </div>
      <div className={styles.preview}>
        <img src={preview} alt={name} />
      </div>
      <div className={styles.info}>
        <p className={styles.description}>{description}</p>
        <div className={styles.tech}>
          {technologies.map((tech) => {
            return (
              <span key={tech} className={styles.name}>
                #{tech}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
