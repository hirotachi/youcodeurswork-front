import React from "react";
import AuthForm from "@components/auth/AuthForm";

const initialValues = {
  email: "",
  password: "",
};

const labels: Record<keyof typeof initialValues, string> = {
  email: "Intranet email",
  password: "Password",
};

const student = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <AuthForm
      submitText={"login"}
      onSubmit={onSubmit}
      labels={labels}
      initialValues={initialValues}
      title={"Welcome Student"}
    />
  );
};

export default student;
