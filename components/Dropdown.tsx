import React, { PropsWithChildren, useState } from "react";
import styles from "@modules/Dropdown.module.scss";
import clsx from "clsx";
import useClickOutside from "@hooks/useClickOutside";
import { AnimatePresence, motion, Variants } from "framer-motion";

type Vertical = "top" | "bottom";
type Horizontal = "left" | "right";

type DropdownProps<T> = {
  options: readonly T[];
  renderOptions?: (option: T) => JSX.Element;
  onClick?: (option: T) => void;
  listClassName?: string;
  listItemClassName?: string;
  dropdownClassName?: string;
  position?: `${Vertical}-${Horizontal}`;
};

const Dropdown = <T,>(props: PropsWithChildren<DropdownProps<T>>) => {
  const {
    children,
    listClassName,
    listItemClassName,
    onClick,
    options,
    renderOptions,
    dropdownClassName,
    position = "bottom-left",
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickOutside(() => setIsOpen(false), [isOpen]);
  const variants: Variants = {
    initial: {
      opacity: 0,
      y: -10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <div
      ref={ref}
      className={clsx(styles.dropdown, dropdownClassName)}
      onClick={() => setIsOpen((v) => !v)}
    >
      <div className={styles.container}>
        {children ?? <button className={styles.btn}>dropdown</button>}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              {...variants}
              className={clsx(
                styles.list,
                listClassName,
                position && styles[`list--${position}`]
              )}
            >
              {options.map((option, index) => (
                <li
                  key={index}
                  className={clsx(styles.item, listItemClassName)}
                  onClick={() => {
                    onClick?.(option);
                  }}
                >
                  {renderOptions?.(option) ?? option}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dropdown;
