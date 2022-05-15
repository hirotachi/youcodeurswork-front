import React from "react";
import * as Yup from "yup";
import DynamicForm, {
  InputConfig,
  InputTypes,
  TFormikValidationSchema,
} from "@components/DynamicForm";
import { FormikOnSubmit } from "@components/auth/AuthForm";
import { useRouter } from "next/router";
import { useFetch } from "use-http";

const initialValues: TProjectForm = {
  name: "", // required must be less than 120 characters
  description: "<p></p>", // textarea not required
  images: [], // array of image strings (valid urls)
  technologies: [], // technologies seperated by comma not required
  tags: [], // tags seperated by comma not required
  repo_link: "", // require a valid url
};

//schema validation for initial values using Yup
const maxNameLength = 120;
const maxDescriptionLength = 10000;

// @ts-ignore
const validationSchema: TFormikValidationSchema<TProjectForm> = Yup.object({
  name: Yup.string()
    .required("Project name is required")
    .max(maxNameLength, `Must be ${maxNameLength} characters or less`),
  description: Yup.string().max(
    maxDescriptionLength,
    `Must be ${maxDescriptionLength} characters or less`
  ),
  images: Yup.array().of(Yup.string().url("Must be a valid url")),
  technologies: Yup.array().of(Yup.string()),
  tags: Yup.array().of(Yup.string()),
  repo_link: Yup.string()
    .required("Github repository link is required")
    .url("Must be a valid github url"),
});

const config: InputConfig<TProjectForm, InputTypes> = {
  name: {
    label: "Project Name",
    placeholder: "Project Name",
  },
  description: {
    placeholder: "Description about the project",
    type: "editor",
    editor: {
      buttons: ["strong", "em", "unorderedList", "orderedList", "link"],
    },
  },
  images: {
    label: "Images",
    placeholder: "Image Url",
    type: "multiple-inputs",
  },
  technologies: {
    type: "tags-input",
    placeholder: "Technologies used in the project (comma separated)",
  },
  tags: {
    type: "tags-input",
    placeholder: "Tags that identify with the project (comma separated)",
  },
  repo_link: {
    label: "Github Repo Link",
    placeholder: "Github Repo Link",
  },
};

type ProjectFormProps<T> = {
  values?: T;
  onSubmit?: (values: T) => void;
  onCancel?: () => void;
};

const ProjectForm = (props: ProjectFormProps<TProjectForm>) => {
  const { values, onSubmit, onCancel } = props;
  const router = useRouter();
  const { post, put } = useFetch(`/projects/${values?.id ?? ""}`);
  const submit: FormikOnSubmit<TProjectForm> = async (data, { setErrors }) => {
    try {
      let res;
      res = values ? await put(data) : await post(data);
      if (res.errors) {
        setErrors(res.errors);
        return;
      }
      router.push(`/projects/${res.project.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DynamicForm
      title={values ? "Edit Project" : "Publish a Project"}
      values={values}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
      onCancel={onCancel}
      config={config}
      submitText={values ? "Update Project" : "Submit Project"}
    />
  );
};

export default ProjectForm;
