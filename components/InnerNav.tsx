import React from "react";
import styles from "@modules/layout/InnerNav.module.scss";
import Link from "next/link";
import { LayoutGroup, motion } from "framer-motion";
import { useRouter } from "next/router";

const links = [
  {
    href: "/",
    label: "Projects",
  },
  {
    href: "/jobs",
    label: "Jobs",
  },
];

const InnerNav = () => {
  const router = useRouter();

  return (
    <LayoutGroup>
      <div className={styles.links}>
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <a className={styles.link}>
              <span className={styles.label}>{link.label}</span>
              {router.pathname === link.href && (
                <motion.span
                  transition={{
                    type: "tween",
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  layoutId={"active"}
                  className={styles.active}
                />
              )}
            </a>
          </Link>
        ))}
      </div>
    </LayoutGroup>
  );
};

export default InnerNav;
