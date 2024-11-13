import { Box } from "@mui/system";

const Button = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        background: "#fff",
        boxShadow: "8px 8px 0px 0px #333",
        border: "1px solid #333",
        color: "#00008F",
        fontFamily: "Bungee",
        fontSize: "24px",
        borderRadius: "16px",
        height: "72px",
        minWidth: 256,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Button;
