import { Box, Stack } from "@mui/system";
import Logo from "./Logo.jsx";
import { animated, config, useSpring } from "@react-spring/web";
import Button from "./Button.jsx";
import { useState } from "react";
import { useInterval } from "usehooks-ts";
import { differenceInMilliseconds, intervalToDuration } from "date-fns";

const AnimatedStack = animated(Stack);
const AnimatedBox = animated(Box);
const RELEASE_DATE = new Date(2024, 10, 18, 0);

const GameMenu = () => {
  const [diff, setDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useInterval(() => {
    setDiff(
      intervalToDuration({
        start: 0,
        end: differenceInMilliseconds(RELEASE_DATE, new Date()),
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

  const [comingSoon] = useSpring(
    () => ({
      from: { opacity: 0, scale: 1 },
      to: { opacity: 1, scale: 1 },
      delay: 1200,
      config: config.molasses,
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
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AnimatedStack
          style={comingSoon}
          direction={"row"}
          gap={4}
          sx={{
            fontSize: 24,
          }}
        >
          <Stack alignItems={"center"}>
            <Box sx={{ fontSize: 32 }}>{diff.days || 0}</Box>
            <Box>Days</Box>
          </Stack>
          <Stack alignItems={"center"}>
            <Box sx={{ fontSize: 32 }}>{diff.hours || 0}</Box>
            <Box>Hours</Box>
          </Stack>
          <Stack alignItems={"center"}>
            <Box sx={{ fontSize: 32 }}>{diff.minutes || 0}</Box>
            <Box>Minutes</Box>
          </Stack>
          <Stack alignItems={"center"}>
            <Box sx={{ fontSize: 32 }}>{diff.seconds || 0}</Box>
            <Box>Seconds</Box>
          </Stack>
        </AnimatedStack>
      </AnimatedBox>
    </Stack>
  );
};

export default GameMenu;
