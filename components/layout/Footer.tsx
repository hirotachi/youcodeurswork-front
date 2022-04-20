import React from "react";
import styles from "@modules/Footer.module.scss";
import Link from "next/link";

const socials = [
  {
    name: "facebook",
    url: "https://www.facebook.com/YouCodeSchool/",
  },
  {
    name: "twitter",
    url: "https://twitter.com/youcode18",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/_youcode_/",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/company/youcode/",
  },
];

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Link href={"/"}>
        <a className={styles.logo}>
          <span className={styles.you}>You</span>
          <span className={styles.code}>Code</span>
          <span className={styles.copy}>&copy;{new Date().getFullYear()}</span>
        </a>
      </Link>
      <div className={styles.socials}>
        <span className={styles.follow}>Follow us</span>
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Footer;
