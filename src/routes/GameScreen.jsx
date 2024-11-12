import { createRef, useEffect } from "react";
import init from "../game.js";
import { Box } from "@mui/system";
import kaplay from "kaplay";

const GameScreen = () => {
  const canvasRef = createRef();
  const kaplayRef = createRef();
  const editorRef = createRef();

  useEffect(() => {
    if (canvasRef.current) {
      kaplay({
        canvas: canvasRef.current,
        background: [10, 152, 172],
      });
    }
    // Some handy features for the level editor
    if (editorRef.current) {
      editorRef.current.onkeydown = (e) => {
        if (!e.ctrlKey) {
          const el = document.activeElement;
          const [start, end] = [el.selectionStart, el.selectionEnd];
          if (e.key === "Delete") {
            if (start === end) {
              el.setRangeText(" ", start, end, "end");
            } else {
              el.setRangeText(" ".repeat(end - start), start, end - 1, "end");
            }
          } else if (e.key.length === 1 && e.key !== " ") {
            if (start === end) {
              el.setRangeText("", start, end + 1, "end");
            } else {
              el.setRangeText(e.key.repeat(end - start - 1), start, end, "end");
            }
          }
        }
      };
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      kaplayRef.current = init();
    }
  }, []);

  return (
    <Box height={"100vh"} width={"100vw"}>
      <canvas ref={canvasRef} width="100%" height="100%" />
    </Box>
  );
};

export default GameScreen;
