import { Box } from "@mui/system";

const CardContent = ({ children }) => {
  return (
    <Box
      sx={{
        padding: 2,
        fontSize: "18px",
        backgroundColor: "#fff",
      }}
    >
      {children}
    </Box>
  );
};

export default CardContent;
