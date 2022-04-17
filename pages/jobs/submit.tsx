import React from "react";
import dynamic from "next/dynamic";

const JobForm = dynamic(() => import("@components/JobForm"), { ssr: false });

const submit = () => {
  return (
    <div>
      <h2>create job post</h2>
      <JobForm />
    </div>
  );
};

export default submit;
