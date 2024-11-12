import { Box, Stack } from "@mui/system";
import { animated, useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useState } from "react";
import LearningNuggetCard from "./LearningNuggetCard.jsx";
import clamp from "lodash.clamp";

const AnimatedBox = animated(Box);

const LearningNuggetsSlider = ({ cards, width }) => {
  const [current, setCurrent] = useState(0);

  const [props, api] = useSprings(cards.length, (i) => ({
    x: i * width,
    scale: 1,
  }));

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], cancel }) => {
      if (active && Math.abs(mx) > width / 2) {
        setCurrent((curr) =>
          clamp(curr + (xDir > 0 ? -1 : 1), 0, cards.length - 1),
        );
        cancel();
      }
      api.start((i) => {
        const x = (i - current) * width + (active ? mx : 0);
        const scale = active ? 1 - Math.abs(mx) / width / 2 : 1;
        return { x, scale };
      });
    },
  );

  return (
    <Stack alignItems={"center"}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "320px",
          width,
        }}
      >
        {props.map(({ x, display, scale }, i) => (
          <AnimatedBox
            {...bind()}
            key={i}
            style={{ display, x }}
            sx={{
              touchAction: "none",
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <animated.div style={{ scale, padding: "16px" }}>
              <LearningNuggetCard
                icon={cards[i].icon}
                title={cards[i].title}
                content={cards[i].content}
              />
            </animated.div>
          </AnimatedBox>
        ))}
      </Box>
      <Stack direction={"row"} gap={4}>
        {cards.map((card, index) => (
          <Box
            onClick={() => {
              setCurrent(index);
              api.start((i) => {
                const x = (i - index) * width;
                return { x, scale: 1 };
              });
            }}
            key={index}
            sx={{
              borderRadius: 2,
              width: 32,
              height: 32,
              border: `2px solid #000057`,
              background: index === current ? "#000057" : "transparent",
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default LearningNuggetsSlider;
