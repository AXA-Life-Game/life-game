import CardHeader from "./CardHeader.jsx";
import { Box } from "@mui/system";
import StocksDown from "../assets/stocks-down.png";
import CardContent from "./CardContent.jsx";
import Card from "./Card.jsx";

const LearningNuggetCard = ({ title, content, icon }) => {
  return (
    <Card>
      <CardHeader>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <img src={icon} width={32} />
          <Box>{title}</Box>
        </Box>
      </CardHeader>

      <CardContent>
        <Box>{content}</Box>
      </CardContent>
    </Card>
  );
};

export default LearningNuggetCard;
