import { Box, Stack } from "@mui/system";
import Container from "../components/Container.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { useMeasure } from "@uidotdev/usehooks";
import Button from "../components/Button.jsx";
import { GameEngine } from "../engine/engine.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ScoreScreen = () => {
  const [ref, { width, height }] = useMeasure();
  const navigate = useNavigate();
  const gameEngine = new GameEngine(
    [],
    () => {},
    () => {},
  );
  const [inputValuePlayerId, setInputValuePlayerId] = useState("");

  const submitForm = (event) => {
    event.preventDefault();
    fetch("https://life-game-server-production.up.railway.app/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId: inputValuePlayerId, score: 1000000 }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // navigate("/");
      });
  };

  return (
    <Box
      sx={{
        height: "100%",
        py: 4,
      }}
    >
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
            <form onSubmit={submitForm}>
              <label>
                <input
                  type="text"
                  value={inputValuePlayerId}
                  onChange={(e) => setInputValuePlayerId(e.target.value)}
                />
              </label>
            </form>
          </Box>
          <Button onClick={submitForm}>Scoreboard</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ScoreScreen;
