import { ChangeEventHandler, useRef, useState } from "react";

function useInput(
  initialValue = "",
  cb?: (v: string) => void,
  options?: { validate?: (v: string) => boolean }
) {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = e?.target?.value;
    if (options && options.validate && !options.validate(val)) return;
    setValue(val);
    cb?.(val);
  };
  const reset = (val = initialValue) => {
    setValue(val);
    cb?.(val);
  };

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const focus = () => ref.current?.focus();
  return {
    value,
    onChange,
    ref,
    reset,
    focus,
    focused: isFocused,
    onFocus,
    onBlur,
    props: { value, onChange, onFocus, onBlur },
  };
}

export default useInput;
