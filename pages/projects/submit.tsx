import ProjectForm from "@components/ProjectForm";

const Submit = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  // return <OldProjectForm onSubmit={handleSubmit} />;
  return <ProjectForm onSubmit={handleSubmit} />;
};

export default Submit;
