import { createRef, useEffect, useState } from "react";
import "./App.css";
import init from "./test.js";
import { Box, Stack } from "@mui/system";
import kaplay from "kaplay";

const defaultLevel = [
  "                             $                                                             ",
  "                                                                                     $$$  @",
  "                                                                                   --------",
  "                                                                                           ",
  "                                                                    $$                     ",
  "                                                                   ----                    ",
  "                                                                                           ",
  "                    $$                                      ^ $                   $        ",
  "        $          ===              %                       ----         ---     ---       ",
  "                                                $                                          ",
  "                ^   0 =    >                  $                   ^^  0    =   > =        @",
  "===================================================     ===================================",
];

function App() {
  const canvasRef = createRef();
  const kaplayRef = createRef();
  const editorRef = createRef();
  const [level, setLevel] = useState(defaultLevel);

  useEffect(() => {
    if (canvasRef.current) {
      kaplay({
        canvas: canvasRef.current,
        background: [141, 183, 255],
      });
    }
    // Some handy features for the level editor
    if (editorRef.current) {
      editorRef.current.onkeydown = (e) => {
        if (e.key === "Delete") {
          const el = document.activeElement;
          const [start, end] = [el.selectionStart, el.selectionEnd];
          setTimeout(() => el.setRangeText(" ", start, end, "end"));
        } else if (e.key.length === 1 && e.key !== " ") {
          const el = document.activeElement;
          const [start, end] = [el.selectionStart, el.selectionEnd];
          el.setRangeText("", start, end + 1, "end");
        }
      };
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      kaplayRef.current = init(level);
    }
  }, [level]);

  return (
    <Stack justifyContent={"center"} alignItems={"center"} gap={"1rem"}>
      <Box height={800} width={"100vw"}>
        <canvas ref={canvasRef} width="100%" height="100%" />
      </Box>
      <Box>
        <textarea
          ref={editorRef}
          style={{ width: "50vw", height: "200px" }}
          value={level.join("\n")}
          onChange={($event) => setLevel($event.target.value?.split("\n"))}
        />
      </Box>
      <button onClick={() => setLevel(defaultLevel)}>Reset</button>
    </Stack>
  );
}

export default App;
