import { Box } from "@mui/system";

const Button = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        background: "#00008F",
        boxShadow: "4px 4px 0px 0px #333",
        border: "1px solid #333",
        color: "#fff",
        fontFamily: "Bungee",
        fontSize: "16px",
        borderRadius: "8px",
        height: "36px",
        minWidth: 120,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Button;
