import React, { useState } from 'react';
import styles from '@modules/form/Select.module.scss';
import clsx from 'clsx';
import useClickOutside from '@hooks/useClickOutside';

type SelectProps = {
  options: (number | string | { label: string; value: number | string })[];
  onChange: (value: number | string) => void;
  className?: string;
  innerClassName?: string;
  listClassName?: string;
  optionClassName?: string;
  optionActiveClassName?: string;
  name: string;
  value: string;
}


const Select = (props: SelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => open && setOpen(false), [open]);
  const {
    options,
    onChange,
    className,
    name,
    value,
    listClassName,
    optionClassName,
    innerClassName,
    optionActiveClassName,
  } = props;
  const currentOption = options.find((option) => (typeof option === "object" ? option.value : option) ===  value);
  const currentLabel = typeof currentOption === "object" ? currentOption.label : currentOption;
  return <div onClick={() => setOpen(v => !v)} ref={ref} className={clsx(
    styles.select,
    className,
  )}>
    <span className={clsx(
      styles.current,
      innerClassName,
    )}>{value ?  currentLabel : `Select ${name}`}</span>
    { open && <div className={
       clsx(
         styles.list,
         listClassName,
       )
     }>
       {options.map((option) => {
         const val = typeof option === 'object' ? option.value : option;
         const label = typeof option === 'object' ? option.label : option;
         return <span key={label} className={
           clsx(
             styles.option,
             optionClassName,
             val === value && styles.selected,
             val === value && optionActiveClassName,
           )
         } onClick={() => onChange(val)}>{label}</span>;
       })}
     </div>}
  </div>;
};

export default Select;