import React from "react";
import AuthForm from "@components/auth/AuthForm";

const initialValues = {
  email: "",
  password: "",
};

const member = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <AuthForm
      submitText={"login"}
      onSubmit={onSubmit}
      initialValues={initialValues}
      title={"Welcome YouCode Member"}
      inputs={{
        email: {
          label: "Intranet email",
        },
      }}
    />
  );
};

export default member;
