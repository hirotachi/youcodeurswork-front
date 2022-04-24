import React from "react";
import AuthForm, { AuthInput } from "@components/auth/AuthForm";
import Link from "next/link";

const initialValues = {
  email: "",
  password: "",
};
const authInputs: AuthInput<typeof initialValues> = {
  password: {
    other: (styles) => (
      <Link href={"/forgot"}>
        <a className={styles.forgot}>forgot password?</a>
      </Link>
    ),
  },
};

const recruiter = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <AuthForm
      submitText={"login"}
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={"Welcome Recruiter"}
      inputs={authInputs}
      footer={() => {
        return (
          <>
            Dont have an account?{" "}
            <Link href="/register">
              <a>Sign up</a>
            </Link>
          </>
        );
      }}
    />
  );
};

export default recruiter;
