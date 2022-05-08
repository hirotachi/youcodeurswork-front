import type { NextPage } from "next";
import ProjectsPreviews from "@components/projects/ProjectsPreviews";
import { projectDataPreview } from "@utils/data";

const projects = Array.from({ length: 10 }).map((_, index) => ({
  id: index,
  ...projectDataPreview,
}));

const Home: NextPage = () => {
  return <ProjectsPreviews projects={projects} />;
};

export default Home;
