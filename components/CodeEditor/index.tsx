import React from "react";
import { Loading } from "@nextui-org/react";
import brace from "brace";
import dynamic from "next/dynamic";
const Editor = dynamic(
  async () => {
    const ace = await import("react-ace");
    require("brace/mode/javascript");
    require("brace/theme/twilight");
    return ace;
  },
  {
    loading: () => <Loading type="points-opacity" />,
    ssr: false,
  }
);

type Props = {
  code: string;
};

const CodeEditor = (props: Props) => {
  return (
    <Editor
      mode="javascript"
      theme="twilight"
      value={props.code}
      name="code-editor"
      editorProps={{
        $blockScrolling: true,
      }}
      fontSize={13}
      height="60vh"
      width="100%"
      setOptions={{
        useWorker: false,
        showLineNumbers: true,
      }}
    />
  );
};

export default CodeEditor;
