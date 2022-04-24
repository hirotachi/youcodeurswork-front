import React from "react";
import AuthForm from "@components/auth/AuthForm";

const Forgot = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <AuthForm
      title="Forgot you password"
      intro="Enter your email address and we will send you a link to reset your password."
      initialValues={{ email: "" }}
      onSubmit={onSubmit}
      submitText={"Forgot Password"}
    />
  );
};

export default Forgot;
