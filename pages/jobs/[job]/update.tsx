import React from "react";
import JobForm, { JobFormValues } from "@components/JobForm";

const update = () => {
  // job values
  const values: JobFormValues = {
    contract: "CDI",
    description: "something nice",
    isRemote: false,
    position: "Full Stack developer",
    tags: "react,nodejs",
  };
  return <JobForm onSubmit={() => {}} onCancel={() => {}} values={values} />;
};

export default update;
