import React, { useState } from 'react';
import { ErrorMessage, Field, FieldArray, Form, Formik, FormikConfig } from 'formik';
import styles from '@modules/projects/Form.module.scss';
import clsx from 'clsx';
import { SchemaOf } from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faTrash from '@icons/solid/faTrash';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Select from '@components/form/Select';
import Checkbox from '@components/form/Checkbox';

const Trumbowyg = dynamic(
  () => {
    return import("jquery").then(() => {
      return import("react-trumbowyg");
    });
  },
  { ssr: false }
);

export type InputTypes =
  | "text"
  | "textarea"
  | "editor"
  | "multiple-inputs"
  | "number"
  | "select"
  | "checkbox";

const buttons = [
  "strong",
  "em",
  "link",
  "insertImage",
  "justifyLeft",
  "justifyCenter",
  "justifyRight",
  "justifyFull",
  "unorderedList",
  "orderedList",
  "horizontalRule",
  "removeformat",
  "fullscreen",
  "viewHTML",
] as const;

type ButtonType = typeof buttons[number];
export type InputConfig<T, B extends InputTypes> = {
  [P in keyof T]: {
    type?: B;
    other?: (value: T[P], styling: typeof styles) => JSX.Element;
    placeholder?: string|boolean;
    label?: string;
    options?: (number | string | { value: string | number; label?: string })[];
    editor?: {
      buttons?: ButtonType[];
    };
  };
};


type DynamicFormProps<T,B extends InputTypes> = {
  title: string;
  initialValues: T;
  values?: { [P in keyof T]?: T[P] };
  validationSchema?: SchemaOf<T>;
  onCancel?: () => void;
  onSubmit: (values: T) => boolean | Promise<boolean> | void;
  submitText?: string;
  cancelText?: string;
  config: InputConfig<T, B>;
  subHeader?:string
};

const DynamicForm = <T,B extends InputTypes>(props: DynamicFormProps<T,B>) => {
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
    subHeader
  } = props;

  const handleFormSubmit: FormikConfig<T>["onSubmit"] = async (
    formikValues: T,
    { validateForm, setSubmitting, resetForm }
  ) => {
    if (validationSchema) {
      const errors = await validateForm(formikValues);
      if (Object.keys(errors).length > 0) {
        setSubmitting(false);
        return;
      }
    }
    const shouldResetForm = await onSubmit(formikValues);
    if (shouldResetForm) {
      resetForm();
    }
  };
  const [focused, setFocused] = useState<string | null | undefined>(null);

  const outerValues = values;
  const schemaDescription = validationSchema?.describe();
  const countVariant : Variants = {
    initial: {height: 0, y: -10, opacity: 0},
    animate: {height: "auto", y: 0, opacity: 1},
    exit: {height: 0, y: -10, opacity: 0}
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{title}</h1>
      { subHeader && <h3 className={styles.subHeader}>{subHeader}</h3>}
      <Formik
        validationSchema={validationSchema}
        initialValues={{ ...initialValues, ...(values ?? {}) }}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        onSubmit={handleFormSubmit}
      >
        {({ values: formikValues, handleSubmit, errors, setValues }) => {
          return (
            <Form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.main}>{Object.keys(initialValues).map((key) => {
                const error = errors[key];
                const {
                  type = 'text',
                  other,
                  placeholder,
                  label = key,
                  options,
                  editor = {},
                } = config[key] ?? {};

                const tests = validationSchema?.fields[key]?.exclusiveTests;
                const required = tests?.required ?? false;
                const hasMax = tests?.max ?? false;
                let maxLength = 0;
                if(hasMax){
                 maxLength =  schemaDescription?.fields[key]?.tests?.find(test => test.name === "max")?.params.max;
                }

                switch (type) {
                  case 'multiple-inputs':
                    return (
                      <FieldArray
                        key={key}
                        name={key}
                        render={(arrayHelpers) => (
                          <div className={clsx(styles.field)}>
                            <label htmlFor={key}>{label} {required && <span className={styles.required}>*</span>}</label>
                            <div className={styles.field__input__group}>
                              {formikValues[key].map((item, index) => {
                                const name = `${key}[${index}]`;
                                return (
                                  <div
                                    key={name}
                                    className={clsx(
                                      styles.field__input__item,
                                      error && styles.field__input__item__error,
                                    )}
                                  >
                                    <div
                                      key={name}
                                      className={clsx(
                                        styles.field__input__item__main,
                                        focused === name &&
                                        styles.field__input__item__main__focused,
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
                                        <FontAwesomeIcon icon={faTrash}/>
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
                                onClick={() => arrayHelpers.push('')}
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
                          error && styles.field__error,
                        )}
                      >
                        { type !== "checkbox" && <label htmlFor={key}>{label} {required && <span className={styles.required}>*</span>}</label>}
                        {(() => {
                          switch (type) {
                            case "checkbox":
                              return <Checkbox label={label} checked={formikValues[key]} onClick={() => setValues( v=> ({...v, [key]: !v[key]}))} />;
                            case "select":
                              return <Select options={options} onChange={(val) => setValues(v => ({...v, [key]: val}))} name={key} value={formikValues[key]} />;
                            case 'editor':
                              return (
                                <Trumbowyg
                                  {...editor}
                                  // @ts-ignore
                                  id={key}
                                  data={outerValues?.[key]}
                                  onFocus={() => setFocused(key)}
                                  onBlur={() => setFocused(null)}
                                  onChange={(e) =>
                                    setValues((v) => ({
                                      ...v,
                                      [key]: e.target.innerHTML,
                                    }))
                                  }
                                  placeholder={placeholder}
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
                                    styles.field__input__focused,
                                  )}
                                />
                              );
                          }
                        })()}

                        <AnimatePresence>{!!maxLength && focused === key && (type === 'text' || type === 'editor') &&
                          <motion.span  {...countVariant} className={clsx(
                            styles.field__input__remaining,
                            maxLength - formikValues[key].length < 0 && styles.field__input__remaining__warning,
                          )}>{maxLength - formikValues[key].length} characters
                            remaining.</motion.span>}</AnimatePresence>
                        {other?.(formikValues[key], styles)}
                        <ErrorMessage
                          name={key}
                          component={'div'}
                          className={styles.field__input__error}
                        />
                      </div>
                    );
                }
              })}</div>
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
