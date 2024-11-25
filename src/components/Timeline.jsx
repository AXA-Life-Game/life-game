import { Box, Stack } from "@mui/system";
import { animated, useSpring } from "@react-spring/web";

const AnimatedStack = animated(Stack);

export const TIMELINE_YEAR_WIDTH = 250;
export const TIMELINE_AGE_ARRAY = Array.from(
  { length: 70 - 18 + 1 },
  (_, i) => i + 18,
);

const Timeline = ({ style }) => {
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
        gap={`${TIMELINE_YEAR_WIDTH}px`}
        direction={"row"}
        alignItems={"flex-end"}
        sx={{
          height: "100%",
        }}
        style={style}
      >
        {TIMELINE_AGE_ARRAY.map((item) => (
          <Box
            key={item}
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "#fff",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                fontSize: "22px",
                fontFamily: "Bungee",
                width: 120,
              }}
            >
              {item} JAHRE
            </Box>
            <Box
              sx={{
                height: 18,
                width: 4,
                background: "#fff",
                borderRadius: "2px 2px 0 0",
              }}
            ></Box>
          </Box>
        ))}
      </AnimatedStack>
    </Box>
  );
};

export default Timeline;
