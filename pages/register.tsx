import React, { useState } from "react";
import RegisterIntro, { Role } from "@components/auth/RegisterIntro";
import AuthForm from "@components/auth/AuthForm";
import Link from "next/link";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [role, setRole] = useState<Role>(undefined as unknown as Role);
  const [showForm, setShowForm] = useState(false);
  const onSubmit = (values: any) => {
    console.log(values);
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
              <Link href="/login">
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

export default Register;
