import { Box } from "@mui/system";

const PageHeader = ({ children }) => {
  return (
    <Box
      sx={{
        color: "#00008F",
        fontSize: "32px",
        fontFamily: "Bungee",
      }}
    >
      {children}
    </Box>
  );
};

export default PageHeader;
