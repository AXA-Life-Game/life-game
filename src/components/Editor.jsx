import { Button, Input, Option, Select, Table } from "@mui/joy";
import { Stack } from "@mui/system";

const Editor = ({ gameState }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th width={"36px"}>Icon</th>
          <th>Title</th>
          <th width={"100px"}>Probability</th>
          <th>Effects</th>
        </tr>
      </thead>
      <tbody>
        {gameState.lifeEvents.map((lifeEvent) => (
          <tr key={lifeEvent.key}>
            <td>
              <Input value={lifeEvent.icon} size={"sm"} />
            </td>
            <td>
              <Input value={lifeEvent.key} size={"sm"} />
            </td>
            <td>
              <Input value={lifeEvent.probability} size={"sm"} />
            </td>
            <td>
              <Stack gap={2}>
                {lifeEvent.effects.map((effect, index) => {
                  return (
                    <Stack direction={"row"} key={index} gap={2}>
                      <Select value={effect.key} size={"sm"}>
                        {gameState.lifeEvents.map((event) => {
                          return (
                            <Option value={event.key} key={event.key}>
                              {event.icon}&nbsp;
                              {event.key}
                            </Option>
                          );
                        })}
                      </Select>
                    </Stack>
                  );
                })}
              </Stack>
              <Button variant="solid">Add</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Editor;
