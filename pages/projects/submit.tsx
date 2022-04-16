import styles from "@modules/projects/Submit.module.scss";
import ProjectForm from "@components/ProjectForm";

const Submit = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <div className={styles.submit}>
      <h2 className={styles.header}>submit new Project</h2>
      <ProjectForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Submit;
