import { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader.jsx";
import { Box, Stack } from "@mui/system";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useFullscreen, useOrientation, useToggle } from "react-use";
import Logo from "../components/Logo.jsx";

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
      {isLoading ? (
        <Loader />
      ) : (
        <Button
          onClick={() => {
            navigate("/game");
          }}
        >
          Start
        </Button>
      )}
    </Stack>
  );
};

export default Home;
