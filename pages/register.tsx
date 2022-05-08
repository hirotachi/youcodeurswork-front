import React, { useState } from "react";
import RegisterIntro, { Role } from "@components/auth/RegisterIntro";
import AuthForm, { FormikOnSubmit } from "@components/auth/AuthForm";
import Link from "next/link";
import { useFetch } from "use-http";
import { useRouter } from "next/router";
import useAuth from "@hooks/useAuth";

const initialValues: TRegisterInput = {
  name: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const [role, setRole] = useState<Role>(undefined as unknown as Role);
  const { login } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const { post, response } = useFetch<TAuthResponse>("/register");
  const router = useRouter();
  const onSubmit: FormikOnSubmit<TRegisterInput> = async (
    values,
    { setErrors }
  ) => {
    const input = { ...values, role };
    try {
      const res = await post(input);
      if (response.status === 422) {
        setErrors(res.errors);
      } else {
        login(res);
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleNext = () => {
    setShowForm(true);
  };

  return !showForm ? (
    <RegisterIntro role={role} next={handleNext} setRole={setRole} />
  ) : (
    <AuthForm
      title={
        role === "student" ? "Sign up to your talent" : "Sign up to find talent"
      }
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitText={"Sign up"}
      inputs={{ name: { type: "text" } }}
      footer={() => {
        return (
          <>
            <p>
              Already have an account?{" "}
              <Link href="/LoginPage">
                <a className={"link"}>Login</a>
              </Link>
            </p>
            {role === "student" ? (
              <p>
                Here to hire talent?{" "}
                <a className={"link"} onClick={() => setRole("recruiter")}>
                  Join as a recruiter
                </a>
              </p>
            ) : (
              <p>
                Want to showcase your talent?{" "}
                <a className={"link"} onClick={() => setRole("student")}>
                  Join as a student
                </a>
              </p>
            )}
          </>
        );
      }}
    />
  );
};

export default RegisterPage;
