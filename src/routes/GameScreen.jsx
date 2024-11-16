import { createRef, useEffect, useRef } from "react";
import init from "../game.js";
import { Box, Stack } from "@mui/system";
import kaplay from "kaplay";
import {
  TIMELINE_AGE_ARRAY,
  TIMELINE_YEAR_WIDTH,
} from "../components/Timeline.jsx";
import { useSpring } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import { LIFE_EVENTS, ProbabilityMatrix } from "../core/LifeEvent.js";
import { LifeIndicators } from "../core/LifeIndicator.js";
import Editor from "../components/Editor.jsx";

const TOTAL_YEARS = TIMELINE_AGE_ARRAY.length;
const TOTAL_MONTHS = TOTAL_YEARS * 12;
const TOTAL_WIDTH = TIMELINE_YEAR_WIDTH * TOTAL_YEARS;

const GameScreen = () => {
  const canvasRef = createRef();
  const kaplayRef = createRef();
  const gameState = useRef({
    lifeEvents: LIFE_EVENTS,
    lifeIndicators: LifeIndicators,
    probabilityMatrix: ProbabilityMatrix,
  });

  const navigate = useNavigate();
  const [timelineProps, api] = useSpring(
    () => ({
      from: { x: (18 * -TOTAL_WIDTH) / TOTAL_MONTHS },
      to: { x: -TOTAL_WIDTH },
    }),
    [],
  );

  useEffect(() => {
    if (canvasRef.current) {
      console.log("kaplay");
      kaplay({
        canvas: canvasRef.current,
        background: [10, 152, 172],
      });

      kaplayRef.current = init(
        (currentMonth) => {
          api.start({ x: (currentMonth * -TOTAL_WIDTH) / TOTAL_MONTHS });
        },
        () => {
          navigate("/learning");
        },
        gameState,
      );
    }
  }, []);

  return (
    <Stack direction={"row"}>
      <Box
        height={"100vh"}
        width={"100%"}
        sx={{
          position: "relative",
          maxWidth: "430px",
          maxHeight: "932px",
        }}
      >
        <canvas ref={canvasRef} width="100%" height="100%" />
        <Box
          sx={{
            zIndex: 2,
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        >
          {/*<Timeline style={timelineProps} />*/}
        </Box>
      </Box>

      <Box sx={{ background: "#fff", width: 920, p: 2 }} gap={2}>
        <Editor gameState={gameState} />
      </Box>
    </Stack>
  );
};

export default GameScreen;
