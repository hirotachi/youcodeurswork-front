import React, { useEffect } from "react";
import * as Yup from "Yup";
import DynamicForm, {
  InputConfig,
  TFormikValidationSchema,
} from "@components/DynamicForm";
import { useRouter } from "next/router";
import { FormikOnSubmit } from "@components/auth/AuthForm";
import { useFetch } from "use-http";
import withNoSSR from "@lib/withNoSSR";

const initialValues: TProfileForm = {
  name: "",
  headline: "",
  description: "",
  avatar: "",
  site: "",
  social_accounts: [],
};

// schema validation using Yup
const validationSchema: TFormikValidationSchema<TProfileForm> =
  Yup.object().shape({
    avatar: Yup.string().url().nullable(),
    headline: Yup.string().nullable(),
    description: Yup.string().nullable(),
    site: Yup.string().url().nullable(),
    social_accounts: Yup.array()
      .of(Yup.string().url("must be a valid social link"))
      .nullable(),
  });

const config: InputConfig<TProfileForm, any> = {
  social_accounts: {
    label: "Social Media Accounts",
    type: "multiple-inputs",
    placeholder: "Link to social media platform",
  },
  headline: {
    label: "Headline",
    placeholder: "ex: Full Stack Developer",
  },
  site: {
    label: "Portfolio or github profile",
    type: "input",
  },
  description: {
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
  const { data, loading, get, put } = useFetch("/me");

  const onSubmit: FormikOnSubmit<TProfileForm> = async (values) => {
    const payload = Object.entries(values)
      .filter(([, value]) => value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    await put(payload);
    router.push("/profile");
  };

  const onCancel = () => {
    router.push("/profile");
  };

  useEffect(() => {
    get();
  }, []);

  return loading && !data ? (
    <p>loading...</p>
  ) : (
    <DynamicForm
      title={"Edit Your Profile"}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      onCancel={onCancel}
      config={config}
      values={data?.data}
    />
  );
};

export default withNoSSR(Update);
