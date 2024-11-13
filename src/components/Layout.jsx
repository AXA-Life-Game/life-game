import { Outlet } from "react-router-dom";
import { Box } from "@mui/system";

const Layout = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default Layout;
