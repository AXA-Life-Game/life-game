import { useEffect, useRef, useState } from "react";
import { Box, Stack } from "@mui/system";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useFullscreen, useToggle } from "react-use";
import Logo from "../components/Logo.jsx";
import { animated, config, useSpring } from "@react-spring/web";
import GameMenu from "../components/GameMenu.jsx";

const AnimatedButton = animated(Button);

const Home = () => {
  const [showOverlay, setShowOverlay] = useState(true);

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
      {showOverlay ? (
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "#9FD9B4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            fontSize: 32,
          }}
          onClick={() => {
            setShowOverlay(false);
          }}
        >
          Press Any Key
        </Box>
      ) : (
        <GameMenu />
      )}
    </Stack>
  );
};

export default Home;
