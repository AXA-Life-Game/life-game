import { Box, Stack } from "@mui/system";
import Logo from "./Logo.jsx";
import { animated, config, useSpring } from "@react-spring/web";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useToggle } from "react-use";
import { useInterval } from "usehooks-ts";
import { differenceInSeconds, intervalToDuration } from "date-fns";

const AnimatedButton = animated(Button);
const AnimatedBox = animated(Box);
const RELEASE_DATE = new Date(2024, 11, 14, 15);

const GameMenu = () => {
  const navigate = useNavigate();

  const ref = useRef(null);
  const [show, toggle] = useToggle(false);

  useInterval(() => {
    // Your custom logic here
    console.log(
      "count",
      intervalToDuration({
        start: 0,
        end: differenceInSeconds(new Date(), RELEASE_DATE),
      }),
    );
  }, 1000);

  const [buttonStyle] = useSpring(
    () => ({
      from: { opacity: 0, scale: 0.8 },
      to: { opacity: 1, scale: 1 },
      delay: 600,
      config: config.gentle,
    }),
    [],
  );

  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 8,
      }}
    >
      <Logo />

      <AnimatedBox
        style={buttonStyle}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            fontSize: 48,
          }}
        >
          Coming Soon...
        </Box>
        <Box
          sx={{
            fontSize: 24,
          }}
        >
          In 23 Hours
        </Box>
      </AnimatedBox>
    </Stack>
  );
};

export default GameMenu;
