import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import styles from "@modules/form/TagsInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faTimes from "@icons/regular/faTimes";
import useInput from "@hooks/useInput";
import faPlus from "@icons/regular/faPlus";
import clsx from "clsx";
import { AnimatePresence, motion, Variants } from "framer-motion";

type TagsInputProps = {
  values: string[];
  onAdd: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  focused?: boolean;
  name: string;
  placeholder?: string;
  onRemove: (value: string) => void;
};
const TagsInput = (props: TagsInputProps) => {
  const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);
  const [highlighted, setHighlighted] = useState("");
  const {
    values,
    onAdd,
    focused,
    placeholder = "add",
    onRemove,
    onBlur,
    onFocus,
  } = props;
  const tagInput = useInput("");
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }
    if (tagInput.value) {
      const exists = values.some((value) => {
        if (value.toLowerCase() === tagInput.value.toLowerCase()) {
          setHighlighted(value);
          const id = setTimeout(() => {
            setHighlighted("");
          }, 1000);
          timeoutId.current = id;
          return true;
        }
      });
      if (!exists) {
        onAdd(tagInput.value);
        tagInput.reset("");
      }
    }
    return false;
  };
  const stopPropagation: MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const tagVariants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <div
      className={clsx(styles.tags, focused && styles.focused)}
      onClick={tagInput.focus}
    >
      <AnimatePresence>
        {values.map((value) => {
          return (
            <motion.div
              transition={{ duration: 0.1 }}
              {...tagVariants}
              className={clsx(
                styles.tag,
                highlighted === value && styles.highlighted
              )}
              key={value}
              onClick={stopPropagation}
            >
              <span className={styles.text}>{value}</span>
              <span className={styles.remove} onClick={() => onRemove(value)}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div className={styles.input}>
        {!focused && !tagInput.value && (
          <span className={styles.placeholder}>
            <FontAwesomeIcon icon={faPlus} />
            {placeholder}
          </span>
        )}
        <input
          style={{ width: tagInput.value.length * 10 }}
          {...tagInput}
          onKeyUp={handleKeyUp}
          onFocus={onFocus}
          onBlur={onBlur}
          type="text"
          onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
        />
      </div>
    </div>
  );
};

export default TagsInput;
