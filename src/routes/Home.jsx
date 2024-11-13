import { useEffect, useRef, useState } from "react";
import { Stack } from "@mui/system";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useFullscreen, useOrientation, useToggle } from "react-use";
import Logo from "../components/Logo.jsx";
import { animated, config, useSpring } from "@react-spring/web";

const AnimatedButton = animated(Button);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const ref = useRef(null);
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(ref, show, {
    onClose: () => {
      toggle(false);
    },
  });
  const [buttonStyle] = useSpring(
    () => ({
      from: { opacity: 0, scale: 0.8 },
      to: { opacity: 1, scale: 1 },
      delay: 600,
      config: config.stiff,
    }),
    [],
  );

  const orientation = useOrientation();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
          navigate("/game");
        }}
      >
        Start
      </AnimatedButton>
    </Stack>
  );
};

export default Home;
