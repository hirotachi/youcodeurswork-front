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

const login = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <AuthForm
      submitText={"sign in"}
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={"Sign in to your account"}
      inputs={authInputs}
      footer={() => {
        return (
          <p>
            Dont have an account?{" "}
            <Link href="/register">
              <a>Sign up</a>
            </Link>
          </p>
        );
      }}
    />
  );
};

export default login;
