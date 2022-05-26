import React, { useEffect, useState } from "react";
import ProjectPreview from "@components/projects/ProjectPreview";
import styles from "@modules/projects/Projects.module.scss";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { stringifyQuery } from "@utils/helpers";
import usePrevious from "@hooks/usePrevious";
import { apiUrl } from "@utils/constants";

type ProjectsProps = {
  data: TProjectPreview[];
} & TPaginationData;

const ProjectsPage: NextPage<ProjectsProps> = (props) => {
  const { data: projects, meta: ssrMeta } = props;
  const [page, setPage] = useState(1);
  const router = useRouter();
  const previousQuery = usePrevious(stringifyQuery({ ...router.query }));
  const currentQuery = stringifyQuery({ ...router.query });

  const [{ data, loading, abort, meta }, setState] = useState({
    loading: false,
    data: projects,
    abort: false,
    meta: ssrMeta,
  });

  const loadMore = () => {
    if (meta.last_page === page) return;
    setPage((v) => v + 1);
  };

  const fetchProjects = (query, add = false) => {
    fetch(`${apiUrl}/projects?${query}`, {
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (abort) return;
        setState((v) => ({
          ...v,
          data: add ? [...v.data, ...res.data] : res.data,
          meta: res.meta,
        }));
      })
      .finally(() => {
        if (abort) return;
        setState((v) => ({ ...v, loading: false }));
      });
  };
  useEffect(() => {
    if (previousQuery !== currentQuery) {
      setState((v) => ({ ...v, loading: true }));
      setPage(1);
      fetchProjects(currentQuery);
    }
  }, [router.query]);

  useEffect(() => {
    if (page === 1) return;
    fetchProjects(stringifyQuery({ ...router.query, page }));
  }, [page]);

  return (
    <div className={styles.projects}>
      {data.map((project) => {
        return <ProjectPreview key={project.id} {...project} />;
      })}
      {!loading && meta.total !== data.length && (
        <button className={styles.load} onClick={loadMore}>
          load more
        </button>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = stringifyQuery(ctx.query);
  const projects = await fetch(`${apiUrl}/projects?${query}`);
  const res = await projects.json();
  return {
    props: res,
  };
};

export default ProjectsPage;
