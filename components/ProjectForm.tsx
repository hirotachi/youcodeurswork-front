import React from "react";
import * as Yup from "yup";
import DynamicForm, { InputConfig } from "@components/DynamicForm";

const initialValues = {
  name: "", // required must be less than 120 characters
  description: "<p></p>", // textarea not required
  images: [] as string[], // array of image strings (valid urls)
  technologies: "", // technologies seperated by comma not required
  tags: "", // tags seperated by comma not required
  repoLink: "", // require a valid url
};
//schema validation for initial values using Yup
const maxNameLength = 120;

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Project name is required")
    .max(maxNameLength, `Must be ${maxNameLength} characters or less`),
  description: Yup.string(),
  images: Yup.array().of(Yup.string().url("Must be a valid url")),
  technologies: Yup.string(),
  tags: Yup.string(),
  repoLink: Yup.string()
    .required("Github repository link is required")
    .url("Must be a valid github url"),
});

const config: InputConfig<FormValues> = {
  name: {
    label: "Project Name",
    placeholder: "Project Name",
  },
  description: {
    placeholder: "Description about the project",
    type: "editor",
  },
  images: {
    label: "Images",
    placeholder: "Image Url",
    type: "multiple-inputs",
  },
  technologies: {
    placeholder: "Technologies used in the project (comma separated)",
  },
  tags: {
    placeholder: "Tags that identify with the project (comma separated)",
  },
  repoLink: {
    label: "Github Repo Link",
    placeholder: "Github Repo Link",
  },
};

export type FormValues = typeof initialValues;

type ProjectFormProps<T> = {
  values?: T;
  onSubmit: (values: T) => void;
  onCancel?: () => void;
};

const ProjectForm = (props: ProjectFormProps<FormValues>) => {
  const { values, onSubmit, onCancel } = props;
  const submit = async (values) => {
    onSubmit(values);
    return true;
  };

  return (
    <DynamicForm
      title={values ? "Edit Project" : "Submit New Project"}
      values={values}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
      onCancel={onCancel}
      config={config}
    />
  );
};

export default ProjectForm;
