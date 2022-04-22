import React, { useState } from "react";
import styles from "@modules/Login.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";

const sections = ["student", "recruiter"] as const;
const Index = () => {
  // current hover section
  const [current, setCurrent] = useState<typeof sections[number] | "">(
    sections[0]
  );
  const changeHover = (section: typeof current) => {
    setCurrent(section);
  };
  return (
    <div className={styles.login}>
      <Link href={"/"}>
        <a className={styles.logo}>
          <img src="/logo.svg" alt="logo" />
        </a>
      </Link>
      <div className={styles.sections}>
        {sections.map((section) => {
          return (
            <motion.div
              onHoverStart={() => changeHover(section)}
              onHoverEnd={() => changeHover("")}
              className={clsx(styles.section, {
                [styles.active]: current === section,
                [styles.disabled]: current && current !== section,
              })}
              key={section}
            >
              <Link href={`/login/${section}`}>
                <a>
                  <span className={styles.intro}>login</span>
                  <span className={styles.name}>{section}</span>
                </a>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
