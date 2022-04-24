import { ErrorMessage, Field, Form, Formik } from "formik";
import React, {
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "@modules/auth/AuthForm.module.scss";
import clsx from "clsx";

type Styles = typeof styles;
export type AuthInput<T> = {
  [P in keyof T]?: { label?: string; other?: (styles: Styles) => ReactNode };
};
type LoginFormProps<T> = {
  title: string;
  initialValues: T;
  onSubmit: (values: T) => void;
  submitText: string;
  footer?: (styles: Styles, values: T) => ReactNode;
  inputs?: AuthInput<T>;
};
const AuthForm = <T,>(props: LoginFormProps<T>) => {
  const {
    title,
    initialValues,
    onSubmit,
    submitText = "submit",
    footer,
    inputs,
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
        {({ handleSubmit, errors, values }) => {
          return (
            <Form onSubmit={handleSubmit} className={styles.form}>
              {Object.keys(initialValues).map((key) => {
                const { label = key, other } = inputs?.[key] ?? {};
                return (
                  <div key={key} className={styles.field}>
                    <div
                      className={clsx(styles.field__container, {
                        [styles.field__containerFocused]: focusedInput === key,
                        [styles.field__containerFilled]: values[key],
                        [styles.field__containerError]: errors[key],
                      })}
                    >
                      <label onClick={() => setFocusedInput(key)} htmlFor={key}>
                        {label}
                      </label>
                      <Field
                        innerRef={refs[key]}
                        onFocus={() => setFocusedInput(key)}
                        onBlur={() => setFocusedInput("")}
                        name={key}
                        type={key}
                      />
                    </div>
                    {(errors[key] || other) && (
                      <div className={styles.other}>
                        <ErrorMessage name={key} />
                        {other?.(styles)}
                      </div>
                    )}
                  </div>
                );
              })}
              <button className={styles.submit}>{submitText}</button>
              {footer && (
                <p className={styles.footer}>{footer(styles, initialValues)}</p>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AuthForm;
