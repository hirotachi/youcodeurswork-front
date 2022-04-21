import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div>
      <h1>Login</h1>
      <p>choose your poison</p>
      <Link href={"/login/student"}>
        <a>student</a>
      </Link>
      <Link href={"/login/recruiter"}>
        <a>recruiter</a>
      </Link>
    </div>
  );
};

export default index;
