import React, { useState } from "react";
import RegisterIntro, { Role } from "@components/auth/RegisterIntro";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [role, setRole] = useState<Role>(undefined as unknown as Role);
  const onSubmit = (values: any) => {
    console.log(values);
  };
  const handleNext = () => {
    console.log("next");
  };
  return (
    <RegisterIntro role={role} next={handleNext} setRole={setRole} />
    // <AuthForm
    //   title={"Create Your Account"}
    //   initialValues={initialValues}
    //   onSubmit={onSubmit}
    //   submitText={"Sign up"}
    //   inputs={{ name: { type: "text" } }}
    //   footer={() => {
    //     return (
    //       <>
    //         Already have ann account?{" "}
    //         <Link href="/login/recruiter">
    //           <a>Login</a>
    //         </Link>
    //       </>
    //     );
    //   }}
    // />
  );
};

export default Register;
