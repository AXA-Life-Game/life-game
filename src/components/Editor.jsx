import { Button, Input, Table } from "@mui/joy";
import { Controller, useForm } from "react-hook-form";
import { Box, Stack } from "@mui/system";

const Editor = ({ gameState }) => {
  const eventsList = gameState.current.lifeEvents;
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: gameState.current.probabilityMatrix,
  });

  const onSubmit = (data) => {
    gameState.current.probabilityMatrix = data;
  };

  return (
    <Stack gap={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table size={"xs"}>
          <thead>
            <tr>
              <th width={"36px"}></th>
              {eventsList.map((item) => (
                <th key={item.key}>{item.icon}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gameState.current.lifeEvents.map((lifeEvent) => (
              <tr key={lifeEvent.key}>
                <td>{lifeEvent.icon}</td>
                {gameState.current.lifeEvents.map((event) => (
                  <td key={event.key}>
                    <Controller
                      defaultValue={0}
                      name={`${lifeEvent.icon}.${event.icon}`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          size={"xs"}
                          variant={"soft"}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        <Box>
          <Button type={"submit"}>Apply</Button>
        </Box>
      </form>

      <Box>
        <Button
          onClick={() => {
            console.log(getValues());
          }}
        >
          Export
        </Button>
      </Box>
    </Stack>
  );
};

export default Editor;
