import { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader.jsx";
import { Box, Stack } from "@mui/system";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useFullscreen, useOrientation, useToggle } from "react-use";

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
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Button
          onClick={() => {
            toggle();
          }}
        >
          Start
        </Button>
      )}
      <Box sx={{ background: "blue" }} ref={ref}>
        {isFullscreen && (
          <Box sx={{ color: "white", p: 4, fontSize: 24 }}>
            {orientation.type === "portrait-primary" ? (
              <Box>Rotate Your Phone</Box>
            ) : (
              <Box>
                <Button
                  onClick={() => {
                    toggle();
                    navigate("/learning");
                    window.screen.orientation.lock("portrait-primary");
                  }}
                >
                  Finish Game
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default Home;
