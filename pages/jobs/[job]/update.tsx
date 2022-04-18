import React from "react";
import JobForm, { JobFormValues } from "@components/JobForm";

const update = () => {
  // job values
  const values: JobFormValues = {
    contract: "CDI",
    description: "something nice",
    isRemote: true,
    position: "Full Stack developer",
    responsibilities: "none",
    tags: "react,nodejs",
  };
  return <JobForm onSubmit={() => {}} onCancel={() => {}} values={values} />;
};

export default update;
