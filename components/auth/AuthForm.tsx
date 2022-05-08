import { ErrorMessage, Field, Form, Formik, FormikConfig } from "formik";
import React, {
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "@modules/auth/AuthForm.module.scss";
import clsx from "clsx";
import * as Yup from "yup";

type Styles = typeof styles;
export type AuthInput<T> = {
  [P in keyof T]?: {
    label?: string;
    other?: (styles: Styles) => ReactNode;
    type?: string;
  };
};
type AuthFormProps<T> = {
  title: string;
  loading?: boolean;
  initialValues: T;
  onSubmit: (values: T) => void;
  submitText: string;
  footer?: (styles: Styles, values: T) => ReactNode;
  inputs?: AuthInput<T>;
  intro?: string;
  validationSchema?: FormikConfig<T>["validationSchema"];
};
const AuthForm = <T,>(props: AuthFormProps<T>) => {
  const {
    title,
    initialValues,
    onSubmit,
    submitText = "submit",
    footer,
    intro,
    inputs,
    validationSchema,
    loading,
  } = props;

  const handleSubmit: FormikConfig<T>["onSubmit"] = (
    values,
    { setFieldError }
  ) => {
    onSubmit?.(values);
  };

  const schema: AuthFormProps<T>["validationSchema"] = useMemo(() => {
    if (validationSchema) return validationSchema;
    const result = {};
    Object.keys(initialValues).forEach((key) => {
      result[key] = Yup.string().required();
      if (key === "email") {
        result[key] = result[key].email();
      }
    });
    return Yup.object().shape(result);
  }, [initialValues, validationSchema]);

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
      <h1 className={styles.title}>{title}</h1>
      {intro && <p className={styles.intro}>{intro}</p>}
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, values }) => {
          return (
            <Form onSubmit={handleSubmit} className={styles.form}>
              {Object.keys(initialValues).map((key) => {
                let { label = key, other, type = key } = inputs?.[key] ?? {};
                label = label === "email" ? "Email Address" : label;
                return (
                  <div key={key} className={styles.field}>
                    <div
                      className={clsx(styles.field__container, {
                        [styles.field__containerFocused]: focusedInput === key,
                        [styles.field__containerFilled]: values[key],
                        [styles.field__containerError]: errors[key],
                      })}
                    >
                      <Field
                        innerRef={refs[key]}
                        onFocus={() => setFocusedInput(key)}
                        onBlur={() => setFocusedInput("")}
                        name={key}
                        type={type}
                        placeholder={label}
                      />
                    </div>
                    {(errors[key] || other) && (
                      <div className={styles.other}>
                        <ErrorMessage
                          name={key}
                          className={styles.error}
                          component={"span"}
                        />
                        {other?.(styles)}
                      </div>
                    )}
                  </div>
                );
              })}
              <button type={"submit"} className={styles.submit}>
                {loading ? "loading" : submitText}
              </button>
              {footer && (
                <div className={styles.footer}>
                  {footer(styles, initialValues)}
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AuthForm;
