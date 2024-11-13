import { Box } from "@mui/system";

const CardContent = ({ children }) => {
  return (
    <Box
      sx={{
        padding: 2,
        fontSize: "20px",
        backgroundColor: "#fff",
        color: "#333",
      }}
    >
      {children}
    </Box>
  );
};

export default CardContent;
