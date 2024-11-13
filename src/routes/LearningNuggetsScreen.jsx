import { Box, Stack } from "@mui/system";
import Container from "../components/Container.jsx";
import PageHeader from "../components/PageHeader.jsx";
import LearningNuggetsSlider from "../components/LearningNuggetsSlider.jsx";
import { useMeasure } from "@uidotdev/usehooks";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { GameEngine } from "../engine/engine.ts";
import nuggets from "../game/nuggets.js";

const LearningNuggetsScreen = () => {
  const [ref, { width, height }] = useMeasure();
  const navigate = useNavigate();
  const gameEngine = new GameEngine(
    [],
    () => {},
    () => {},
  );

  return (
    <Box
      sx={{
        height: "100%",
        py: 4,
      }}
    >
      <Stack
        gap={8}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ height: "100%" }}
      >
        <Container>
          <PageHeader>Hints fÜr dich</PageHeader>
        </Container>
        <Box
          sx={{
            overflow: "hidden",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box ref={ref} sx={{ height: "100%", width: "100%", maxWidth: 420 }}>
            {width && (
              <LearningNuggetsSlider
                width={width}
                cards={gameEngine
                  .generateNuggets()
                  .map((id) => nuggets.find((nugget) => nugget.id === id))}
              />
            )}
          </Box>
        </Box>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Try Again
        </Button>
      </Stack>
    </Box>
  );
};

export default LearningNuggetsScreen;
