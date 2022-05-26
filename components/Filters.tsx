import React, { useEffect, useState } from "react";
import styles from "@modules/Filters.module.scss";
import faFilter from "@icons/solid/faFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faCaretDown from "@icons/solid/faCaretDown";
import { motion, Variants } from "framer-motion";
import clsx from "clsx";
import faTimes from "@icons/regular/faTimes";
import { useRouter } from "next/router";
import { toggleFromArray } from "@utils/helpers";
import { useFetch } from "use-http";

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

  const isProjects =
    router.pathname.includes("/projects") || router.pathname === "/";

  const tags = useFetch(`/${isProjects ? "projects" : "jobs"}/tags`);
  const technologies = useFetch(
    `/${isProjects ? "projects" : "jobs"}/technologies`
  );
  useEffect(() => {
    tags.get();
    technologies.get();
  }, []);

  const handleFilter = (val: string) => {
    let list = (router.query?.[currentListName] as string)?.split(",");
    list = toggleFromArray(list ?? [], val).filter((v) => !!v);
    const isResultPage = ["/", "/jobs"].includes(router.pathname);
    const query = {
      ...(isResultPage ? router.query : {}),
      [currentListName]: list.join(","),
    };
    if (!list.length) {
      delete query[currentListName];
    }
    const config = {
      pathname: isProjects ? "/" : "/jobs",
      query,
    };
    if (isResultPage) {
      return router.replace({ ...config }, undefined, { shallow: true });
    }
    router.push(config);
  };

  const data = {
    tags: tags.data?.data ?? [],
    technologies: technologies.data?.data ?? [],
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
          {data[currentListName]?.map((item) => {
            return (
              <span
                onClick={() => handleFilter(item.name)}
                key={item.id}
                className={clsx(
                  styles.tag,
                  (router.query?.[currentListName] as string)
                    ?.split(",")
                    .includes(item.name) && styles.tagActive
                )}
              >
                {item.name.toUpperCase()}{" "}
                <i>({item[`${isProjects ? "projects" : "jobs"}_count`]})</i>
              </span>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default Filters;
