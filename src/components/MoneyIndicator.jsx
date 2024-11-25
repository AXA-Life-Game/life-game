import { useInterval } from "usehooks-ts";
import { useState } from "react";
import { Box } from "@mui/system";

// Create our number formatter.
const formatter = new Intl.NumberFormat("de-CH", {
  style: "currency",
  currency: "CHF",
  trailingZeroDisplay: "stripIfInteger", // This is probably what most people
});
const MoneyIndicator = ({ state }) => {
  const [current, setCurrent] = useState(
    state.current.lifeIndicators.MONEY.value,
  );
  useInterval(() => {
    setCurrent(state.current.lifeIndicators.MONEY.value);
  }, 300);

  return (
    <Box
      sx={{
        color: "#fff",
        fontSize: "24px",
        p: 1,
        fontFamily: "Bungee",
      }}
    >
      {formatter.format(current)}
    </Box>
  );
};

export default MoneyIndicator;
