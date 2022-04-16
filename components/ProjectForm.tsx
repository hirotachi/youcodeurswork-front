import React, { useState } from "react";
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikConfig,
} from "formik";
import styles from "@modules/projects/Submit.module.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faTrash from "@icons/solid/faTrash";
import * as Yup from "yup";

const initialValues = {
  name: "", // required must be less than 120 characters
  description: "", // textarea not required
  images: [] as string[], // array of image strings (valid urls)
  technologies: "", // technologies seperated by comma not required
  tags: "", // tags seperated by comma not required
  repoLink: "", // require a valid url
};
//schema validation for initial values using Yup
const maxNameLength = 120;

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Project name is required")
    .max(maxNameLength, `Must be ${maxNameLength} characters or less`),
  description: Yup.string(),
  images: Yup.array().of(Yup.string().url("Must be a valid url")),
  technologies: Yup.string(),
  tags: Yup.string(),
  repoLink: Yup.string()
    .required("Github repository link is required")
    .url("Must be a valid github url"),
});

const placeholders = {
  name: "Project Name",
  description: "Description about the project",
  images: "Image Url",
  technologies: "Technologies used in the project (comma separated)",
  tags: "Tags that identify with the project (comma separated)",
  repoLink: "Github Repo Link",
};

type FormValues = typeof initialValues;

type ProjectFormProps = {
  values?: FormValues;
  onSubmit: (values: any) => void;
  onCancel?: () => void;
};
const ProjectForm = (props: ProjectFormProps) => {
  const { values = {}, onSubmit, onCancel } = props;
  const [focused, setFocused] = useState<string | null>(null);

  const handleFormSubmit: FormikConfig<
    typeof initialValues
  >["onSubmit"] = async (
    values,
    { setSubmitting, resetForm, validateForm }
  ) => {
    // remove empty string, trim and split string into array by comma
    const cleanArray = (str: string) =>
      str
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    const technologies = cleanArray(values.technologies);
    const tags = cleanArray(values.tags);

    const images = values.images.filter((image) => image.trim() !== "");

    const project = { ...values, technologies, tags, images };

    const errors = await validateForm();
    if (!Object.keys(errors).length) {
      onSubmit(project);
      resetForm();
      return;
    }
    setSubmitting(false);
  };

  function handleCancel() {
    onCancel?.();
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ ...initialValues, ...values }}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
      onSubmit={handleFormSubmit}
    >
      {({ values, handleSubmit, errors }) => (
        <Form className={styles.form} onSubmit={handleSubmit}>
          {Object.keys(initialValues).map((key) => {
            const error = errors[key];
            const placeholderText = placeholders[key];
            return Array.isArray(values[key]) ? (
              <FieldArray
                key={key}
                name={key}
                render={(arrayHelpers) => (
                  <div className={clsx(styles.field)}>
                    <label htmlFor={key}>{key}</label>
                    <div className={styles.field__input__group}>
                      {values[key].map((item, index) => {
                        const name = `${key}[${index}]`;
                        return (
                          <div
                            key={name}
                            className={clsx(
                              styles.field__input__item,
                              error && styles.field__input__item__error
                            )}
                          >
                            <div
                              key={name}
                              className={clsx(
                                styles.field__input__item__main,
                                focused === name &&
                                  styles.field__input__item__main__focused
                              )}
                            >
                              <Field
                                name={name}
                                onFocus={() => setFocused(name)}
                                onBlur={() => setFocused(null)}
                                type="text"
                                placeholder={placeholderText}
                              />
                              <span
                                className={styles.remove}
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </span>
                            </div>
                            <ErrorMessage
                              name={`${key}[${index}]`}
                              component="div"
                              className={styles.field__input__error}
                            />
                          </div>
                        );
                      })}
                      <span
                        className={styles.add}
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add {key.slice(0, -1)}
                      </span>
                    </div>
                  </div>
                )}
              />
            ) : (
              <div
                key={key}
                className={clsx(styles.field, error && styles.field__error)}
              >
                <label htmlFor={key}>
                  {key === "repoLink" ? "Github repository link" : key}
                </label>
                <Field
                  name={key}
                  id={key}
                  type="text"
                  placeholder={placeholderText}
                  onFocus={() => setFocused(key)}
                  onBlur={() => setFocused(null)}
                  className={clsx(
                    styles.field__input,
                    focused === key && styles.field__input__focused
                  )}
                />
                {key === "name" && (
                  <div
                    className={clsx(
                      styles.field__input__remaining,
                      maxNameLength - values[key].length < 0 &&
                        styles.field__input__remaining__warning
                    )}
                  >
                    {maxNameLength - values[key].length} characters remaining
                  </div>
                )}
                <ErrorMessage
                  name={key}
                  component={"div"}
                  className={styles.field__input__error}
                />
              </div>
            );
          })}

          <div className={styles.controls}>
            <button className={styles.controls__cancel} onClick={handleCancel}>
              cancel
            </button>
            <button type="submit" className={styles.controls__submit}>
              publish project
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectForm;
