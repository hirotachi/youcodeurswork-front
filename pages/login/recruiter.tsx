import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import styles from "@modules/auth/Recruiter.module.scss";
import Link from "next/link";
import clsx from "clsx";

const initialValues = {
  email: "",
  password: "",
};

type Values = typeof initialValues;
const Recruiter = () => {
  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
  };

  const [focusedInput, setFocusedInput] = useState("");
  return (
    <div className={styles.auth}>
      <h1 className={styles.intro}>Welcome</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                      {key}
                    </label>
                    <Field
                      onFocus={() => setFocusedInput(key)}
                      onBlur={() => setFocusedInput("")}
                      focused={focusedInput === key}
                      name={key}
                      type={key}
                    />
                  </div>
                  <ErrorMessage name={key} />
                </div>
              ))}
              <button className={styles.submit}>login</button>
              <p className={styles.other}>
                {" "}
                Already have an account?{" "}
                <Link href="/register">
                  <a>Sign Up</a>
                </Link>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Recruiter;
