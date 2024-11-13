import { Box } from "@mui/system";

const Container = ({ children }) => {
  return (
    <Box
      sx={{
        px: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
