import React, { useState } from "react";
import "brace";
import "brace/mode/javascript";
import "brace/mode/c_cpp";
import "brace/theme/twilight";
import "brace/theme/xcode";
import { Grid, Dropdown, Loading } from "@nextui-org/react";
import dynamic from "next/dynamic";
const Editor = dynamic(
  async () => {
    const ace = await import("react-ace");
    import("ace-builds/src-noconflict/mode-javascript");
    import("ace-builds/src-noconflict/theme-textmate");
    return ace;
  },
  {
    // eslint-disable-next-line react/display-name
    loading: () => <Loading type="points-opacity" />,
    ssr: false,
  }
);

const LANGUAGES = ["JavaScript", "C++", "Python", "C", "Java", "C#"];

type Props = {
  code: string;
};

const CircularDiv = ({ color }: { color: string }) => {
  return (
    <Grid
      css={{
        width: "1rem",
        height: "1rem",
        borderRadius: "50%",
        mr: "$4",
        backgroundColor: color,
      }}
    />
  );
};

const CodeEditor = (props: Props) => {
  const [theme, setTheme] = useState("twilight");
  const [language, setLanguage] = useState("JavaScript");

  return (
    <Grid.Container
      css={{
        width: "100%",
        pt: "$10",
        pb: "$10",
        bg: "#141414",
        borderRadius: "$lg",
      }}
    >
      <Grid
        xs={12}
        css={{
          mt: "-$8",
          pl: "$8",
          pr: "$8",
          pb: "$4",
        }}
        justify="space-between"
      >
        <Grid.Container direction="row" alignItems="center">
          <CircularDiv color="red" />
          <CircularDiv color="yellow" />
          <CircularDiv color="green" />
        </Grid.Container>
        <Dropdown>
          <Dropdown.Button flat>{language}</Dropdown.Button>
          <Dropdown.Menu
            aria-label="Change algorithm language"
            defaultValue={language}
            onSelectionChange={setLanguage}
            selectionMode="single"
            selectedKeys={language}
          >
            {LANGUAGES.map((language) => (
              <Dropdown.Item key={language}>{language}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
      <Grid xs={12} css={{}}>
        <Editor
          mode="javascript"
          theme="twilight"
          value={props.code}
          //   onChange={props.onChange}
          name="code-editor"
          //   editorProps={{
          //     $blockScrolling: true,
          //   }}
          fontSize={13}
          height="60vh"
          width="100%"
          setOptions={{
            // useWorker: false,
            showLineNumbers: true,
          }}
        />
      </Grid>
    </Grid.Container>
  );
};

export default CodeEditor;
