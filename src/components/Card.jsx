import { Box } from "@mui/system";

const Card = ({ children }) => {
  return (
    <Box
      sx={{
        border: "2px solid #333333",
        borderRadius: 4,
        boxShadow: "8px 8px 0px 0px rgba(0, 0, 0, 0.25)",
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
};

export default Card;
