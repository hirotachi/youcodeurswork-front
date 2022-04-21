import React from "react";
import AuthForm from "@components/auth/AuthForm";

const initialValues = {
  email: "",
  password: "",
};

const recruiter = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <AuthForm
      submitText={"login"}
      otherIntroText={"Don't have an account?"}
      otherLinkText={"Sign up"}
      otherLink={"/register"}
      showOtherLink
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={"Welcome Recruiter"}
    />
  );
};

export default recruiter;
