import React from "react";
import styles from "@modules/layout/SideNav.module.scss";
import faTimes from "@icons/regular/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const links = [
  { url: "/login", label: "Sign in" },
  { url: "/register", label: "Sign up" },
  { url: "/", label: "Home" },
  { url: "/jobs", label: "Jobs" },
];

const SideNav = () => {
  const variants: Variants = {
    initial: { x: "-100%" },
    animate: { x: "0%" },
    exit: { x: "-100%" },
  };
  return (
    <div className={styles.side}>
      <motion.div
        transition={{ type: "keyframes", duration: 0.5 }}
        {...variants}
        className={styles.container}
      >
        <div className={styles.header}>
          <span className={styles.close}>
            close
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className={styles.links}>
          {links.map((link) => (
            <Link key={link.url} href={link.url}>
              <a className={styles.link}>{link.label}</a>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SideNav;
