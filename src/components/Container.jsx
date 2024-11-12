import { Box } from "@mui/system";

const Container = ({ children }) => {
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
