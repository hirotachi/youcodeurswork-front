import React from "react";
import styles from "@modules/UserMenu.module.scss";
import useAuth from "@hooks/useAuth";
import Link from "next/link";
import faSignOut from "@icons/regular/faSignOut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import withNoSSR from "@lib/withNoSSR";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const menuOptions = [
    { label: "profile", link: "/profile" },
    {
      label: "logout",
      handler: () => {
        logout();
      },
      icon: faSignOut,
    },
  ];
  return (
    <div className={styles.menu}>
      <div className={styles.user}>
        <span className={styles.name}>{user.name}</span>
        <Link href={"/profile"}>
          <a className={styles.avatar}>
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" />
            ) : (
              user?.name[0]
            )}
          </a>
        </Link>
      </div>
      <div className={styles.options}>
        {menuOptions.map((option) => {
          return option.link ? (
            <Link href={option.link} key={option.label}>
              <a className={styles.option}>
                {option.label}
                {option.icon && <FontAwesomeIcon icon={option.icon} />}
              </a>
            </Link>
          ) : (
            <span
              className={styles.option}
              onClick={option.handler}
              key={option.label}
            >
              {option.label}
              {option.icon && <FontAwesomeIcon icon={option.icon} />}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default withNoSSR(UserMenu);
