import React, { useCallback, useMemo } from "react";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { createEditor } from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import Element from "@components/editor/Element";
import Leaf from "@components/editor/Leaf";
import MarkButton, {
  MarkButtonProps,
  toggleMark,
} from "@components/editor/MarkButton";
import faBold from "@icons/solid/faBold";
import faItalic from "@icons/solid/faItalic";
import faUnderline from "@icons/solid/faUnderline";
import faCode from "@icons/solid/faCode";
import BlockButton, { BlockButtonProps } from "@components/editor/BlockButton";
import faH1 from "@icons/solid/faH1";
import faH2 from "@icons/solid/faH2";
import faQuoteLeft from "@icons/solid/faQuoteLeft";
import faListOl from "@icons/solid/faListOl";
import faListUl from "@icons/solid/faListUl";
import faAlignLeft from "@icons/solid/faAlignLeft";
import faAlignCenter from "@icons/solid/faAlignCenter";
import faAlignRight from "@icons/solid/faAlignRight";
import faAlignJustify from "@icons/solid/faAlignJustify";
import styles from "@modules/Editor.module.scss";
import isHotkey from "is-hotkey";

export const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};
export const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

//editor context type
export type EditorContextType = {
  editor: ReactEditor & HistoryEditor;
};

export const EditorContext = React.createContext<EditorContextType | null>(
  null
);

const markButtons: MarkButtonProps[] = [
  {
    format: "bold",
    icon: faBold,
  },
  {
    format: "italic",
    icon: faItalic,
  },
  {
    format: "underline",
    icon: faUnderline,
  },
  {
    format: "code",
    icon: faCode,
  },
];

const blockButtons: BlockButtonProps[] = [
  {
    format: "heading-one",
    icon: faH1,
  },
  {
    format: "heading-two",
    icon: faH2,
  },
  {
    format: "block-quote",
    icon: faQuoteLeft,
  },
  {
    format: "numbered-list",
    icon: faListOl,
  },
  {
    format: "bulleted-list",
    icon: faListUl,
  },
  {
    format: "left",
    icon: faAlignLeft,
  },
  {
    format: "center",
    icon: faAlignCenter,
  },
  {
    format: "right",
    icon: faAlignRight,
  },
  {
    format: "justify",
    icon: faAlignJustify,
  },
];

type EditorProps = {
  onChange: (value: string) => void;
  initialValue?: string;
};

const initialEditorValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
const Editor = (props: EditorProps) => {
  const { onChange, initialValue = JSON.stringify(initialEditorValue) } = props;
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as ReactEditor)),
    []
  );
  const value = useMemo(() => {
    if (initialValue) {
      return JSON.parse(initialValue);
    }
    return initialValue;
  }, [initialValue]);

  const onChangeValue = useCallback(
    (value) => {
      onChange(JSON.stringify(value));
    },
    [onChange]
  );
  return (
    <EditorContext.Provider value={{ editor }}>
      <Slate
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (!isAstChange) return;
          const html = JSON.stringify(value);
          onChangeValue(html);
        }}
        editor={editor}
        value={value}
      >
        <div className={styles.toolbar}>
          {markButtons.map((button) => (
            <MarkButton key={button.format} {...button} />
          ))}
          {blockButtons.map((button) => (
            <BlockButton key={button.format} {...button} />
          ))}
        </div>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </EditorContext.Provider>
  );
};

export default Editor;
