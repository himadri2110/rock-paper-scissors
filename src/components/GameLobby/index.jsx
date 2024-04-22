import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import {
  findMatchingPlayers,
  getCurrentPlayers,
  getRooms,
  getUsers,
  getWaitingList,
  setCurrentPlayers,
  setRooms,
  setWaitingList,
} from "../../utils";

const GameLobby = () => {
  const { userState } = useUser();
  const navigate = useNavigate();

  const currentUser = userState.currentUser;

  const totalPlayers = getUsers();
  const existingRooms = getRooms();
  const currentPlayers = getCurrentPlayers();
  const waitingList = getWaitingList();

  const [player2, setPlayer2] = useState("");

  const availablePlayers = totalPlayers?.filter(
    (player) => player.id !== currentUser.id
  );

  const handleGamePlay = (player2) => {
    const player1 = currentUser;

    if (currentPlayers?.player1 && currentPlayers?.player2) {
      if (waitingList) {
        setWaitingList([...waitingList, { player1, player2 }]);
      } else {
        setWaitingList([{ player1, player2 }]);
      }
    }

    setPlayer2(player2);

    if (existingRooms) {
      setRooms([...existingRooms, { player1, player2 }]);
    } else {
      setRooms([{ player1, player2 }]);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const matchingPlayers = findMatchingPlayers({
      rooms: existingRooms,
      player1: currentUser,
      player2,
    });

    if (matchingPlayers) {
      setCurrentPlayers(matchingPlayers);
      navigate(`/play?user=${currentUser.username}`);
    }
  }, [existingRooms, currentUser, player2, navigate]);

  if (!availablePlayers.length)
    return (
      <p className="m-4">
        No players available to play at this moment. Please wait for sometime.
      </p>
    );

  return (
    <div className="m-4">
      <p className="text-xl mb-4">Available Players:</p>

      <div className="flex flex-col gap-2">
        {availablePlayers?.map((player) => (
          <div
            key={player.id}
            className="flex gap-2 justify-center items-center"
          >
            <span className="text-lg">{player.username}</span>
            <button
              onClick={() => handleGamePlay(player)}
              className="bg-blue-950 p-1 px-3 text-lg rounded-md text-white border-neutral-40"
            >
              Play
            </button>
          </div>
        ))}
      </div>

      {player2 && (
        <p className="m-4 text-sm">
          Waiting for {player2.username} to start the game.
        </p>
      )}

      {waitingList?.length ? (
        <div>
          <h4>Waiting List:</h4>
          {waitingList?.map((waiting) => (
            <p key={waiting.id}>{waiting.player2.username}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default GameLobby;
