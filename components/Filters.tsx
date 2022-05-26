import React, { useState } from "react";
import styles from "@modules/Filters.module.scss";
import faFilter from "@icons/solid/faFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faCaretDown from "@icons/solid/faCaretDown";
import { motion, Variants } from "framer-motion";
import clsx from "clsx";
import faTimes from "@icons/regular/faTimes";
import { useRouter } from "next/router";
import { toggleFromArray } from "@utils/helpers";

const Filters = () => {
  const router = useRouter();
  const filters = ["technologies", "tags"] as const;
  const [currentListName, setCurrentListName] = useState<
    typeof filters[number] | ""
  >("");

  const variants: Variants = {
    animate: { height: "7rem", overflow: "unset" },
    exit: { height: "0" },
    initial: { height: "0", overflow: "hidden" },
  };
  const tags = ["PHP", "Javascript", "React", "Laravel"];
  const isProjects =
    router.pathname.includes("/projects") || router.pathname === "/";

  const handleFilter = (val: string) => {
    let list = (router.query?.[currentListName] as string)?.split(",");
    console.log(list, currentListName, router);
    list = toggleFromArray(list ?? [], val).filter((v) => !!v);

    const query = { ...router.query, [currentListName]: list.join(",") };
    if (!list.length) {
      delete query[currentListName];
    }

    router.push({
      pathname: isProjects ? "/" : "/jobs",
      query,
    });
  };
  return (
    <motion.div {...variants} className={styles.filters}>
      <div className={styles.label}>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faFilter} />
        </span>
        <span className={styles.text}>filter by</span>
      </div>
      <div className={styles.list}>
        {filters.map((filter) => {
          return (
            <div
              onClick={() =>
                setCurrentListName((v) => (v === filter ? "" : filter))
              }
              className={clsx(
                styles.item,
                currentListName === filter && styles.itemActive
              )}
              key={filter}
            >
              <span className={styles.name}>{filter}</span>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
            </div>
          );
        })}
      </div>
      {currentListName && (
        <div className={styles.tags}>
          <div className={styles.controls}>
            <span
              className={styles.close}
              onClick={() => setCurrentListName("")}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
          {tags.map((tag) => {
            return (
              <span
                onClick={() => handleFilter(tag)}
                key={tag}
                className={clsx(
                  styles.tag,
                  (router.query?.[currentListName] as string)
                    ?.split(",")
                    .includes(tag) && styles.tagActive
                )}
              >
                {tag} <i>(25)</i>
              </span>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default Filters;
