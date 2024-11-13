import { createRef, useEffect } from "react";
import init from "../game.js";
import { Box } from "@mui/system";
import kaplay from "kaplay";
import Timeline, {
  TIMELINE_AGE_ARRAY,
  TIMELINE_YEAR_WIDTH,
} from "../components/Timeline.jsx";
import { useSpring } from "@react-spring/web";
import { useNavigate } from "react-router-dom";

const TOTAL_YEARS = TIMELINE_AGE_ARRAY.length;
const TOTAL_MONTHS = TOTAL_YEARS * 12;
const TOTAL_WIDTH = TIMELINE_YEAR_WIDTH * TOTAL_YEARS;

const GameScreen = () => {
  const canvasRef = createRef();
  const kaplayRef = createRef();
  const editorRef = createRef();

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
      kaplay({
        canvas: canvasRef.current,
        background: [10, 152, 172],
      });
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current && !kaplayRef.current) {
      kaplayRef.current = init(
        (currentMonth) => {
          console.log("currentMonth", currentMonth);
          api.start({ x: (currentMonth * -TOTAL_WIDTH) / TOTAL_MONTHS });
        },
        () => {
          navigate("/learning");
        },
      );
    }
  }, []);

  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      sx={{
        position: "relative",
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
        <Timeline style={timelineProps} />
      </Box>
    </Box>
  );
};

export default GameScreen;
