import { Box, Stack } from "@mui/system";
import Container from "../components/Container.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { useMeasure } from "@uidotdev/usehooks";
import Button from "../components/Button.jsx";

const ScoreScreen = () => {
  const [ref, { width, height }] = useMeasure();

  return (
    <Box>
      <Stack gap={4} alignItems={"center"} mt={10}>
        <Container>
          <PageHeader>Dein Vermögen</PageHeader>
          <Box
            sx={{
              color: "#00008F",
              fontSize: "32px",
              fontFamily: "Bungee",
              textAlign: "center",
            }}
          >
            1.500.000
          </Box>
        </Container>
        <Box color={"#fff"}>
          Gib deinen Namen ein und du siehst die Rangliste
        </Box>
        <Box>
          <form>
            <label>
              <input type="text" />
            </label>
          </form>
        </Box>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Scoreboard
        </Button>
      </Stack>
    </Box>
  );
};

export default ScoreScreen;
