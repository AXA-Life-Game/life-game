import { Box } from "@mui/system";

const CardHeader = ({ children }) => {
  return (
    <Box
      sx={{
        padding: 2,
        color: "#fff",
        fontSize: "18px",
        fontWeight: "400",
        backgroundColor: "#00008F",
        fontFamily: '"Bungee", sans-serif;',
      }}
    >
      {children}
    </Box>
  );
};

export default CardHeader;
