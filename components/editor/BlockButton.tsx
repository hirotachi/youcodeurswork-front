import { Editor, Element, Transforms } from "slate";
import { useSlate } from "slate-react";
import { LIST_TYPES, TEXT_ALIGN_TYPES } from "@components/editor/Editor";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@modules/Editor.module.scss";

const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n[blockType] === format,
    })
  );

  return !!match;
};

export type BlockFormat =
  | "heading-one"
  | "heading-two"
  | "block-quote"
  | "numbered-list"
  | "bulleted-list"
  | "left"
  | "right"
  | "center"
  | "justify";

export type BlockButtonProps = {
  format: BlockFormat;
  icon: IconProp;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<Element>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      // @ts-ignore
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      // @ts-ignore
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<Element>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const BlockButton = ({ format, icon }: BlockButtonProps) => {
  const editor = useSlate();
  const active = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  return (
    <span
      className={clsx(styles.btn, active && styles.active)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </span>
  );
};
export default BlockButton;
