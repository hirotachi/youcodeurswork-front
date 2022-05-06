import React from "react";
import styles from "@modules/auth/RegisterIntro.module.scss";
import Student from "@components/icons/Student";
import Recruiter from "@components/icons/Recruiter";
import clsx from "clsx";
import Link from "next/link";

export type Role = TUser["role"];
type RegisterIntroProps = {
  role: Role;
  setRole: (role: Role) => void;
  next: () => void;
};
const RegisterIntro = (props: RegisterIntroProps) => {
  const { next, role, setRole } = props;
  const options: {
    label: string;
    icon: () => JSX.Element;
    value: Role;
  }[] = [
    {
      label: "I'm a recruiter, looking for talent",
      value: "recruiter",
      icon: Recruiter,
    },
    {
      label: "I'm a student, sharing my projects",
      value: "student",
      icon: Student,
    },
  ];
  return (
    <div className={styles.intro}>
      <h2 className={styles.header}>Join as a recruiter or student</h2>
      <div className={styles.options}>
        {options.map(({ label, value, icon: Icon }) => {
          const selected = role === value;
          return (
            <div
              key={value}
              className={clsx(styles.option, {
                [styles.selected]: selected,
              })}
              onClick={() => setRole(value)}
            >
              <span className={styles.radio}>
                <span className={clsx(selected && styles.radio__inner)}></span>
              </span>
              <span className={styles.icon}>
                <Icon />
              </span>
              <div className={styles.label}>{label}</div>
            </div>
          );
        })}
      </div>
      <span
        className={clsx(styles.submit, !role && styles.disabled)}
        onClick={() => role && next()}
      >
        {!role ? "Create Account" : `Join as ${role}`}
      </span>
      <p className={styles.other}>
        Already have an account?{" "}
        <Link href={"/login"}>
          <a>Log in</a>
        </Link>
      </p>
    </div>
  );
};

export default RegisterIntro;
