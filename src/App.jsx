import { createRef, useEffect, useState } from "react";
import "./App.css";
import init from "./test.js";
import { Box } from "@mui/system";

function App() {
  const canvasRef = createRef();
  const kaplayRef = createRef();

  useEffect(() => {
    if (canvasRef.current) {
      kaplayRef.current = init({
        canvas: canvasRef.current,
      });
    }
  }, []);

  return (
    <Box height={800} width={"100vw"}>
      <canvas ref={canvasRef} width="100%" height="100%" />
    </Box>
  );
}

export default App;
