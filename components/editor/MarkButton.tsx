import { useSlate } from "slate-react";
import { Editor } from "slate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "@modules/Editor.module.scss";
import clsx from "clsx";

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export type MarkFormat = "bold" | "italic" | "underline" | "code";

export type MarkButtonProps = {
  format: MarkFormat;
  icon: IconProp;
};

const MarkButton = ({ format, icon }: MarkButtonProps) => {
  const editor = useSlate();
  return (
    <span
      className={clsx(styles.btn, {
        [styles.btn__active]: isMarkActive(editor, format),
      })}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </span>
  );
};

export default MarkButton;
