import React, { useState } from "react";

const Login = () => {
  const [currentAuth, setCurrentAuth] = useState<"student" | "recruiter" | "">(
    ""
  );
  return <div>login page</div>;
};

export default Login;
