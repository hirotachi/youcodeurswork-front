import React from "react";
import AuthForm, { AuthInput, FormikOnSubmit } from "@components/auth/AuthForm";
import Link from "next/link";
import useAuth from "@hooks/useAuth";
import { useFetch } from "use-http";
import { useRouter } from "next/router";

const initialValues: TLoginInput = {
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

const LoginPage = () => {
  const { login } = useAuth();
  const { post, response } = useFetch("/login");
  const router = useRouter();
  const onSubmit: FormikOnSubmit<TLoginInput> = async (
    values,
    { setFieldError }
  ) => {
    try {
      const res = await post(values);
      if (!response.ok) {
        return setFieldError("message", res.message);
      }
      login(res);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
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

export default LoginPage;
