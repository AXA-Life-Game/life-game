import { Stack } from "@mui/system";
import Logo from "./Logo.jsx";
import { animated, config, useSpring } from "@react-spring/web";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useToggle } from "react-use";

const AnimatedButton = animated(Button);

const GameMenu = () => {
  const navigate = useNavigate();

  const ref = useRef(null);
  const [show, toggle] = useToggle(false);

  const [buttonStyle] = useSpring(
    () => ({
      from: { opacity: 0, scale: 0.8 },
      to: { opacity: 1, scale: 1 },
      delay: 600,
      config: config.stiff,
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
      <AnimatedButton
        style={buttonStyle}
        onClick={() => {
          navigate("/game/");
        }}
      >
        Start
      </AnimatedButton>
    </Stack>
  );
};

export default GameMenu;
