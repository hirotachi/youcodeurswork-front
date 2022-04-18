import React from "react";
import dynamic from "next/dynamic";

const JobForm = dynamic(() => import("@components/JobForm"), { ssr: false });

const submit = () => {
  const onSubmit = async (values: any) => {
    console.log(values);
  };
  return <JobForm onSubmit={onSubmit} />;
};

export default submit;
