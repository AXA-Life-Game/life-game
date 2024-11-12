import { Box, Stack } from "@mui/system";
import Container from "../components/Container.jsx";
import PageHeader from "../components/PageHeader.jsx";
import LearningNuggetsSlider from "../components/LearningNuggetsSlider.jsx";
import { useMeasure } from "@uidotdev/usehooks";
import hints from "../game/nuggets.js";

const LearningNuggetsScreen = () => {
  const [ref, { width, height }] = useMeasure();

  return (
    <Box>
      <Stack gap={2} alignItems={"center"} mt={4}>
        <Container>
          <PageHeader>Hints fÜr dich</PageHeader>
        </Container>
        <Box ref={ref} sx={{ width: "100%", maxWidth: 420 }}>
          {width && <LearningNuggetsSlider width={width} cards={hints} />}
        </Box>
      </Stack>
    </Box>
  );
};

export default LearningNuggetsScreen;
