import LogoSolid from "../assets/logo-solid.svg";
import LogoText from "../assets/logo-text.svg";
import { Box } from "@mui/system";

const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <img src={LogoSolid} width={256} />
      <img src={LogoText} width={512} />
    </Box>
  );
};

export default Logo;
