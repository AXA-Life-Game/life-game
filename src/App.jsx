import { Routes, Route, Outlet, Link } from "react-router-dom";
import Scoreboard from "./routes/Scoreboard.jsx";
import GameScreen from "./routes/GameScreen.jsx";
import Home from "./routes/Home.jsx";
import Layout from "./components/Layout.jsx";
import {Box} from "@mui/system";

export default function App() {
  return (
      <Box sx={{
          width: '100%',
          height: '100%',
          background: '#9FD9B4'
      }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="game" element={<GameScreen />} />
            <Route path="scoreboard" element={<Scoreboard />} />

            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Box>
  );
}


function NoMatch() {
  return (
      <div>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
  );
}