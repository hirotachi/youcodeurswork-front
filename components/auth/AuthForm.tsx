import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { RefObject, useEffect, useMemo, useState } from "react";
import styles from "@modules/auth/Recruiter.module.scss";
import Link from "next/link";
import clsx from "clsx";

type LoginFormProps<T> = {
  title: string;
  initialValues: T;
  onSubmit: (values: T) => void;
  submitText: string;
  showOtherLink?: boolean;
  otherLink?: string;
  otherLinkText?: string;
  otherIntroText?: string;
  labels?: Record<keyof T, string>;
};
const AuthForm = <T,>(props: LoginFormProps<T>) => {
  const {
    title,
    initialValues,
    onSubmit,
    submitText = "submit",
    otherLinkText,
    showOtherLink,
    otherIntroText,
    otherLink,
    labels,
  } = props;

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit?.(values);
  };

  const refs: { [P in keyof T]?: RefObject<T[P]> } = useMemo(() => {
    const obj = {};
    Object.keys(initialValues).forEach((key) => {
      obj[key] = React.createRef<T[keyof T]>();
    });
    return obj;
  }, [initialValues]);

  const [focusedInput, setFocusedInput] = useState("");
  useEffect(() => {
    if (focusedInput) {
      const ref = refs[focusedInput];
      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  }, [focusedInput, refs]);

  return (
    <div className={styles.auth}>
      <h1 className={styles.intro}>{title}</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit} className={styles.form}>
              {Object.keys(initialValues).map((key: string) => (
                <div key={key} className={styles.field}>
                  <div
                    className={clsx(styles.field__container, {
                      [styles.field__containerFocused]: focusedInput === key,
                    })}
                  >
                    <label onClick={() => setFocusedInput(key)} htmlFor={key}>
                      {labels?.[key] ?? key}
                    </label>
                    <Field
                      innerRef={refs[key]}
                      onFocus={() => setFocusedInput(key)}
                      onBlur={() => setFocusedInput("")}
                      name={key}
                      type={key}
                    />
                  </div>
                  <ErrorMessage name={key} />
                </div>
              ))}
              <button className={styles.submit}>{submitText}</button>
              {showOtherLink && (
                <p className={styles.other}>
                  {otherIntroText}{" "}
                  <Link href={otherLink}>
                    <a>{otherLinkText}</a>
                  </Link>
                </p>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AuthForm;
