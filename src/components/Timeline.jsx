import { Box, Stack } from "@mui/system";
import { animated, useSpring } from "@react-spring/web";

const ageArray = Array.from({ length: 70 - 18 + 1 }, (_, i) => i + 18);
const YEAR_WIDTH = 400;

const AnimatedStack = animated(Stack);
const Timeline = () => {
  const [props, api] = useSpring(
    () => ({
      from: { x: 0 },
      to: { x: -YEAR_WIDTH * ageArray.length },
      config: {
        duration: 60000,
      },
    }),
    [],
  );

  return (
    <Box
      sx={{
        height: 64,
        background: "#00008F",
        width: "100%",
        position: "relative",
      }}
    >
      <AnimatedStack
        gap={`${YEAR_WIDTH}px`}
        direction={"row"}
        alignItems={"flex-end"}
        sx={{
          height: "100%",
        }}
        style={props}
      >
        {ageArray.map((item) => (
          <Box
            key={item}
            sx={{
              height: 32,
              minWidth: 4,
              background: "#fff",
              borderRadius: "2px 2px 0 0",
            }}
          ></Box>
        ))}
      </AnimatedStack>
    </Box>
  );
};

export default Timeline;
