import React from "react";
import DynamicForm, {
  InputConfig,
  InputTypes,
  TFormikValidationSchema,
} from "@components/DynamicForm";
import * as Yup from "yup";
import styles from "@modules/JobForm.module.scss";
import { FormikOnSubmit } from "@components/auth/AuthForm";
import { useFetch } from "use-http";
import { useRouter } from "next/router";

const maxTitleLength = 120;
const maxDescriptionLength = 10000;
const maxCompanyNameLength = 40;
const initialValues: TJobForm = {
  title: "",
  description: "",
  image: "",
  company_name: "",
  company_site: "",
  category: "" as TJobCategory,
  type: "" as TJobType,
  company_logo: "",
  apply_by: "email",
  apply_to: "",
  remote: false,
  tags: [],
  technologies: [],
  location: "",
};

// @ts-ignore
const validationSchema: TFormikValidationSchema<TJobForm> = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(
      maxTitleLength,
      `Title must be less than ${maxTitleLength} characters`
    ),
  description: Yup.string()
    .required("Description is required")
    .max(
      maxDescriptionLength,
      `Description must be less than ${maxDescriptionLength} characters`
    ),
  location: Yup.string().required("Location is required"),
  image: Yup.string(),
  type: Yup.string().required("Type is required"),
  company_name: Yup.string()
    .required("Company name is required")
    .max(
      maxCompanyNameLength,
      `Company name must be less than ${maxCompanyNameLength} characters`
    ),
  company_site: Yup.string().required("Company site is required").url(),
  company_logo: Yup.string(),
  apply_by: Yup.string()
    .required("Apply by is required")
    .oneOf(["email", "url"]),
  apply_to: Yup.string().required("Apply to is required").when("apply_by", {
    is: "email",
    then: Yup.string().required().email(),
    otherwise: Yup.string().required().url(),
  }),
  technologies: Yup.array().of(Yup.string()),
  tags: Yup.array().of(Yup.string()),
  category: Yup.string().required("Category is required"),
  remote: Yup.boolean().required("Remote is required"),
});

const config: InputConfig<TJobForm, InputTypes> = {
  description: {
    type: "editor",
    editor: {
      buttons: ["strong", "em", "unorderedList", "orderedList", "link"],
    },
  },
  image: {
    label: "Image to display",
  },
  category: {
    type: "select",
    options: ["programming", "design", "other"],
  },
  company_logo: {
    label: "Logo",
  },
  company_name: {
    label: "Company name",
  },
  company_site: {
    label: "Company website",
  },
  remote: {
    type: "checkbox",
    label: "Can this job be performed remotely?",
  },
  type: {
    type: "select",
    options: ["full-time", "part-time", "freelance", "internship"],
  },
  tags: {
    type: "tags-input",
    placeholder: "Add tag",
  },
  technologies: {
    type: "tags-input",
    placeholder: "Add technology",
  },
  location: {
    label: "where is this job located?",
    placeholder: "e.g. New York, NY",
  },
};

type JobFormProps<T extends TJobForm> = {
  values?: T;
  onSubmit: (values: T) => void;
  onCancel?: () => void;
};

const JobForm = (props: JobFormProps<TJobForm>) => {
  const { values, onCancel } = props;
  const router = useRouter();
  const { post, put } = useFetch(`/jobs/${values?.id ?? ""}`);
  const submit: FormikOnSubmit<TJobForm> = async (data, { setErrors }) => {
    try {
      let res;
      res = values ? await put(data) : await post(data);
      if (res.errors) {
        setErrors(res.errors);
        return;
      }
      router.push(`/jobs/${res.job.id}`);
    } catch (e) {
      console.log(e);
    }
  };
  const subHeader =
    "YouCode job board offers and promotes opportunities for web professionals and students all over the world.";
  return (
    <DynamicForm
      title={values ? "Edit Job Post" : "Post a Job"}
      subHeader={!values ? subHeader : ""}
      values={values}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
      onCancel={onCancel}
      config={config}
      submitText={values ? "Update Job" : "Publish Job"}
      mainClassName={styles.main}
    />
  );
};

export default JobForm;
