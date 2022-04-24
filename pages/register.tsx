import React from "react";
import AuthForm from "@components/auth/AuthForm";
import Link from "next/link";

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
      footer={() => {
        return (
          <>
            Already have ann account?{" "}
            <Link href="/login/recruiter">
              <a>Login</a>
            </Link>
          </>
        );
      }}
    />
  );
};

export default Register;
