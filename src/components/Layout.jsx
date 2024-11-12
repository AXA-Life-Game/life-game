import {Outlet} from "react-router-dom";
import {Box} from "@mui/system";

const Layout = ()  => {
    return (
        <Box>
            <Outlet />
        </Box>
    );
}

export default Layout;