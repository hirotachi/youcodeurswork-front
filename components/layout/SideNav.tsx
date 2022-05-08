import React, { Fragment, useState } from "react";
import styles from "@modules/layout/SideNav.module.scss";
import faTimes from "@icons/regular/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import useAuth from "@hooks/useAuth";
import faSignOut from "@icons/regular/faSignOut";
import clsx from "clsx";

const SideNav = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const variants: Variants = {
    initial: { x: "-100%" },
    animate: { x: "0%" },
    exit: { x: "-100%" },
  };
  const guestRoutes = [
    { url: "/login", label: "Sign in" },
    { url: "/register", label: "Sign up" },
  ];
  const authRoutes = [
    {
      label: user?.name,
      children: [
        { url: "/profile", label: "Profile" },
        {
          handler: (e) => {
            e.stopPropagation();
            logout();
          },
          label: "Logout",
          icon: faSignOut,
        },
      ],
    },
  ];
  const links = [
    ...(!isLoggedIn ? guestRoutes : authRoutes),
    { url: "/", label: "Projects" },
    { url: "/jobs", label: "Jobs" },
  ];
  const [openedMenu, setOpenedMenu] = useState<keyof typeof links>(
    undefined as unknown as keyof typeof links
  );
  const openMenu = (
    e: MouseEvent<HTMLSpanElement>,
    menu: typeof openedMenu
  ) => {
    e.stopPropagation();
    setOpenedMenu(menu);
  };
  return (
    <div className={styles.side}>
      <motion.div
        transition={{ type: "keyframes", duration: 0.5 }}
        {...variants}
        className={styles.container}
      >
        <div className={styles.header}>
          <span className={styles.close}>
            close
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className={styles.links}>
          {links.map((link) => {
            return link.children ? (
              <>
                <span
                  key={link.label}
                  className={styles.link}
                  onClick={(e) => openMenu(e, link.label)}
                >
                  {link.label}
                </span>
                {openedMenu === link.label &&
                  link.children.map((child) => {
                    return (
                      <Fragment key={child.label}>
                        {child.handler ? (
                          <div
                            className={clsx(styles.link, styles.child)}
                            onClick={child.handler}
                          >
                            {child.label}
                            {child.icon && (
                              <FontAwesomeIcon icon={child.icon} />
                            )}
                          </div>
                        ) : (
                          <Link href={child.url} key={child.label}>
                            <a className={clsx(styles.link, styles.child)}>
                              {child.label}
                              {child.icon && (
                                <FontAwesomeIcon icon={child.icon} />
                              )}
                            </a>
                          </Link>
                        )}
                      </Fragment>
                    );
                  })}
              </>
            ) : (
              <Link key={link.url} href={link.url}>
                <a className={styles.link}>{link.label}</a>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default SideNav;
