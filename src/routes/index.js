import { Route, Routes } from "react-router-dom";
import PlayGame from "../components";
import GameLobby from "../components/GameLobby";
import Play from "../components/Play";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PlayGame />} />
      <Route path="/lobby" element={<GameLobby />} />
      <Route path="/play" element={<Play />} />
    </Routes>
  );
};

export { PublicRoutes };
