import React from 'react';
import styles from '@modules/form/Checkbox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faCheck from '@icons/solid/faCheck';
import { AnimatePresence, motion, Variants } from 'framer-motion';

type CheckboxProps = {
  label: string;
  checked: boolean;
  onClick: () => void;
}
const Checkbox = (props:CheckboxProps) => {
  const { label, checked,  onClick } = props;
  const iconVariants: Variants = {
    initial: {  scale: 0 },
    animate: {  scale: 1 },
    exit: {  scale: 0 }
  }
  return <div className={styles.checkbox} onClick={onClick}>
    <div className={styles.box}>
      <AnimatePresence>{checked && <motion.span {...iconVariants} className={styles.icon}><FontAwesomeIcon icon={faCheck}/></motion.span>}</AnimatePresence>
    </div>
    { label && <p className={styles.label}>{label}</p>}
  </div>;
};

export default Checkbox;