import { Box, Stack } from "@mui/system";
import Container from "../components/Container.jsx";
import PageHeader from "../components/PageHeader.jsx";
import LearningNuggetsSlider from "../components/LearningNuggetsSlider.jsx";
import { useMeasure } from "@uidotdev/usehooks";
import StocksDown from "../assets/stocks-down.png";

const LearningNuggetsScreen = () => {
  const [ref, { width, height }] = useMeasure();

  return (
    <Box>
      <Stack gap={2} alignItems={"center"} mt={4}>
        <Container>
          <PageHeader>Hints fÜr dich</PageHeader>
        </Container>
        <Box ref={ref} sx={{ width: "100%", maxWidth: 420 }}>
          {width && (
            <LearningNuggetsSlider
              width={width}
              cards={[
                {
                  icon: StocksDown,
                  title: "Du hast dich HochVErSchuldet",
                  content:
                    "Achte auf deine Finanzen und schaue, dass du dich nicht verschuldest. Überlege dir, ob du auf grössere Investitionen auch noch etwas warten kannst",
                },
                {
                  icon: StocksDown,
                  title: "Du hast dich HochVErSchuldet",
                  content:
                    "Achte auf deine Finanzen und schaue, dass du dich nicht verschuldest. Überlege dir, ob du auf grössere Investitionen auch noch etwas warten kannst",
                },
                {
                  icon: StocksDown,
                  title: "Du hast dich HochVErSchuldet",
                  content:
                    "Achte auf deine Finanzen und schaue, dass du dich nicht verschuldest. Überlege dir, ob du auf grössere Investitionen auch noch etwas warten kannst",
                },
              ]}
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default LearningNuggetsScreen;
