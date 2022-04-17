import React from "react";
import { FormValues } from "@components/OldProjectForm";
import ProjectForm from "@components/ProjectForm";

const update = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  const images = [
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  ];

  const values: FormValues = {
    name: "said Project",
    description: "<p>This is a test</p>",
    repoLink: "https://github.com/hirotachi/cine-master",
    tags: ["tag"].join(","),
    images: images,
    technologies: ["tester"].join(","),
  };
  return (
    <ProjectForm
      onSubmit={handleSubmit}
      values={values}
      onCancel={() => console.log("cancel")}
    />
  );
};

export default update;
