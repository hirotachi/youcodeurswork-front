import React, { useState } from "react";
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikConfig,
} from "formik";
import styles from "@modules/projects/Form.module.scss";
import clsx from "clsx";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faTrash from "@icons/solid/faTrash";
import dynamic from "next/dynamic";

const Trumbowyg = dynamic(
  () => {
    return import("jquery").then(() => {
      return import("react-trumbowyg");
    });
  },
  { ssr: false }
);

type inputTypes =
  | "text"
  | "textarea"
  | "editor"
  | "multiple-inputs"
  | "number"
  | "select"
  | "checkbox";

export type InputConfig<T> = {
  [P in keyof T]: {
    type?: inputTypes;
    other?: (value: T[P], styling: typeof styles) => JSX.Element;
    placeholder?: string;
    label?: string;
    options?: (number | string | { value: string | number; label?: string })[];
  };
};
type DynamicFormProps<T> = {
  title: string;
  initialValues: T;
  values?: T;
  validationSchema?: ReturnType<typeof Yup.object>;
  onCancel?: () => void;
  onSubmit: (values: T) => boolean | Promise<boolean>;
  submitText?: string;
  cancelText?: string;
  config: InputConfig<T>;
};

const DynamicForm = <T,>(props: DynamicFormProps<T>) => {
  const {
    title,
    initialValues,
    values,
    onSubmit,
    onCancel,
    validationSchema,
    submitText = "Submit",
    cancelText = "Cancel",
    config,
  } = props;

  const handleFormSubmit: FormikConfig<T>["onSubmit"] = async (
    values: T,
    { validateForm, setSubmitting, resetForm }
  ) => {
    if (validationSchema) {
      const errors = await validateForm(values);
      if (Object.keys(errors).length > 0) {
        setSubmitting(false);
        return;
      }
    }
    const shouldResetForm = await onSubmit(values);
    if (shouldResetForm) {
      resetForm();
    }
  };
  const [focused, setFocused] = useState<string | null | undefined>(null);

  const outerValues = values;
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>{title}</h2>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ ...initialValues, ...(values ?? {}) }}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        onSubmit={handleFormSubmit}
      >
        {({ values, handleSubmit, errors, setValues }) => {
          return (
            <Form className={styles.form} onSubmit={handleSubmit}>
              {Object.keys(initialValues).map((key) => {
                const error = errors[key];
                const {
                  type = "text",
                  other,
                  placeholder,
                  label = key,
                  options,
                } = config[key] ?? {};

                switch (type) {
                  case "multiple-inputs":
                    return (
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
                                        placeholder={placeholder}
                                      />
                                      <span
                                        className={styles.remove}
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
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
                    );
                  default:
                    return (
                      <div
                        key={key}
                        className={clsx(
                          styles.field,
                          error && styles.field__error
                        )}
                      >
                        <label htmlFor={key}>{label}</label>
                        {(() => {
                          switch (type) {
                            case "select":
                              return (
                                <Field
                                  name={key}
                                  as="select"
                                  className={clsx(
                                    styles.field__input,
                                    error && styles.field__input__error
                                  )}
                                >
                                  <option value="">Select</option>
                                  {options.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </Field>
                              );
                            case "editor":
                              return (
                                <Trumbowyg
                                  id={key}
                                  data={outerValues?.[key]}
                                  onChange={(e) =>
                                    setValues((v) => ({
                                      ...v,
                                      [key]: e.target.innerHTML,
                                    }))
                                  }
                                  data-placeholder="Enter your text here..."
                                />
                              );
                            default:
                              return (
                                <Field
                                  name={key}
                                  type={type}
                                  placeholder={placeholder}
                                  onFocus={() => setFocused(key)}
                                  onBlur={() => setFocused(null)}
                                  className={clsx(
                                    styles.field__input,
                                    focused === key &&
                                      styles.field__input__focused
                                  )}
                                />
                              );
                          }
                        })()}
                        {/*{type === "editor" ? (*/}
                        {/*  <Trumbowyg*/}
                        {/*    id={key}*/}
                        {/*    data={outerValues?.[key]}*/}
                        {/*    onChange={(e) =>*/}
                        {/*      setValues((v) => ({*/}
                        {/*        ...v,*/}
                        {/*        [key]: e.target.innerHTML,*/}
                        {/*      }))*/}
                        {/*    }*/}
                        {/*    data-placeholder="Enter your text here..."*/}
                        {/*  />*/}
                        {/*) : (*/}
                        {/*  <Field*/}
                        {/*    name={key}*/}
                        {/*    type={type}*/}
                        {/*    placeholder={placeholder}*/}
                        {/*    onFocus={() => setFocused(key)}*/}
                        {/*    onBlur={() => setFocused(null)}*/}
                        {/*    className={clsx(*/}
                        {/*      styles.field__input,*/}
                        {/*      focused === key && styles.field__input__focused*/}
                        {/*    )}*/}
                        {/*  />*/}
                        {/*)}*/}

                        {other?.(values[key], styles)}
                        <ErrorMessage
                          name={key}
                          component={"div"}
                          className={styles.field__input__error}
                        />
                      </div>
                    );
                }
              })}
              <div className={styles.controls}>
                {onCancel && (
                  <button
                    type={"button"}
                    className={styles.controls__cancel}
                    onClick={onCancel}
                  >
                    {cancelText}
                  </button>
                )}
                <button type="submit" className={styles.controls__submit}>
                  {submitText}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default DynamicForm;
