import { Button, Option, Select, Table } from "@mui/joy";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import { applyEffects } from "../core/Effect.js";
import { getLifeEventByKey } from "../core/LifeEvent.js";

const Editor = ({ gameState }) => {
  const lifeIndicators = gameState.current.lifeIndicators;
  const lifeEvents = gameState.current.lifeEvents;

  const [currentYear, setCurrentYear] = useState(18);
  const [nextEvent, setNextEvent] = useState("GET_JOB");

  const [history, setHistory] = useState([structuredClone(lifeIndicators)]);

  const onNextYearClick = () => {
    lifeIndicators.AGE.value = currentYear + 1;
    lifeIndicators.MONEY.value += lifeIndicators.SALARY.value * 12;

    if (nextEvent !== "NONE") {
      gameState.current = applyEffects(
        getLifeEventByKey(lifeEvents, nextEvent).effects,
        gameState.current,
      );
    }

    setCurrentYear(currentYear + 1);

    setHistory((curr) => [
      ...curr,
      structuredClone({
        ...lifeIndicators,
        event: nextEvent,
      }),
    ]);
  };

  return (
    <Stack gap={2}>
      <Table size={"xs"}>
        <thead>
          <tr>
            {Object.keys(lifeIndicators).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => {
            return (
              <tr key={item.AGE.value}>
                {Object.keys(lifeIndicators).map((key) => (
                  <td key={key}>{item[key].value}</td>
                ))}

                <td>{item.event}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Stack gap={4} direction={"row"}>
        <Select
          value={nextEvent}
          onChange={(e, value) => {
            setNextEvent(value);
          }}
        >
          <Option value={"NONE"}>NONE</Option>

          {lifeEvents.map((e) => {
            return (
              <Option value={e.key} key={e.key}>
                {e.icon} {e.key}
              </Option>
            );
          })}
        </Select>
        <Button
          onClick={() => {
            onNextYearClick();
          }}
        >
          Next Year
        </Button>
      </Stack>
    </Stack>
  );
};

export default Editor;
