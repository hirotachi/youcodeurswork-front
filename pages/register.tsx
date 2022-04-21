import React from "react";
import AuthForm from "@components/auth/AuthForm";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <AuthForm
      title={"Create Your Account"}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitText={"Sign up"}
      otherIntroText={"Already have an account? "}
      otherLinkText={"Login"}
      otherLink={"/login"}
      showOtherLink
    />
  );
};

export default Register;
