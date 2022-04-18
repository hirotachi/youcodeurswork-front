import React from "react";
import DynamicForm, { InputConfig } from "@components/DynamicForm";
import * as Yup from "yup";

const maxPostLength = 120;
const initialValues = {
  position: "", // required max length 120
  contract: "", // select with options (CDD, CDI) required
  tags: "", // tags are separated by comma
  isRemote: false, // checkbox required
  description: "", // editor required
  responsibilities: "",
};

const validationSchema = Yup.object().shape({
  position: Yup.string()
    .required("Position is required")
    .max(
      maxPostLength,
      `Position must be less than ${maxPostLength} characters`
    ),
  contract: Yup.string().required("Contract is required"),
  tags: Yup.string().required("Tags are required"),
  isRemote: Yup.boolean().required("Remote is required"),
  description: Yup.string().required("Description is required"),
  responsibilities: Yup.string(),
});

type JobFormProps<T> = {
  values?: T;
  onSubmit: (values: T) => void;
  onCancel?: () => void;
};

export type JobFormValues = typeof initialValues;

const config: InputConfig<JobFormValues> = {
  position: {
    label: "Position",
    placeholder: "Position",
  },
  contract: {
    label: "Contract",
    placeholder: "Contract",
    type: "select",
    options: [
      { value: "CDD", label: "CDD" },
      { value: "CDI", label: "CDI" },
    ],
  },
  tags: {
    label: "Tags",
    placeholder: "Tags (separated by comma)",
  },
  isRemote: {
    label: "is position remote",
    type: "checkbox",
  },
  description: {
    type: "editor",
  },
  responsibilities: {
    label: "Responsibilities",
    type: "editor",
  },
};

const JobForm = (props: JobFormProps<JobFormValues>) => {
  const { values, onSubmit, onCancel } = props;
  const submit = async (values) => {
    onSubmit(values);
    return true;
  };
  return (
    <DynamicForm
      title={values ? "Edit Job Post" : "Submit a Job Offer"}
      values={values}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
      onCancel={onCancel}
      config={config}
    />
  );
};

export default JobForm;
