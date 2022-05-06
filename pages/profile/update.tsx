import React from "react";
import * as Yup from "Yup";
import DynamicForm, { InputConfig } from "@components/DynamicForm";
import { useRouter } from "next/router";
import { profileData } from "@components/Profile";

const initialValues = {
  headline: "", //string not required
  email: "",
  about: "",
  socials: [] as string[], // array of strings (social links)
};

// schema validation using Yup
const validationSchema = Yup.object().shape({
  headline: Yup.string(),
  about: Yup.string(),
  email: Yup.string().email("must be a valid email"),
  socials: Yup.array().of(Yup.string().url("must be a valid social link")),
});

type FormValues = typeof initialValues;
const config: InputConfig<FormValues> = {
  socials: {
    label: "Social Media Links",
    type: "multiple-inputs",
    placeholder: "Link to social media platform",
  },
  headline: {
    label: "Headline",
    placeholder: "ex: Full Stack Developer",
  },
  email: {
    label: "Email Address",
    placeholder: "Email address",
  },
  about: {
    label: "About",
    type: "editor",
    editor: {
      buttons: ["strong", "em", "link", "orderedList", "unorderedList"],
    },
    placeholder: "Tell us about yourself",
  },
};
const Update = () => {
  const router = useRouter();

  const onSubmit = (values: FormValues): boolean => {
    console.log(values);
    return true;
  };
  const onCancel = () => {
    router.push("/profile");
  };
  return (
    <DynamicForm
      title={"Edit Your Profile"}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      onCancel={onCancel}
      config={config}
      values={profileData}
    />
  );
};

export default Update;
