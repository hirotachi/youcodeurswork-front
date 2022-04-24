import React from "react";
import AuthForm from "@components/auth/AuthForm";

const Reset = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <AuthForm
      title={"Reset Password"}
      initialValues={{ password: "", confirm: "" }}
      onSubmit={onSubmit}
      submitText={"Change Password"}
      inputs={{ confirm: { label: "Confirm Password", type: "password" } }}
    />
  );
};

export default Reset;
