import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getCurrentPlayers,
  getPlayAgain,
  getRooms,
  getGameWinner,
  setCurrentPlayers,
  setPlayAgain,
  setRooms,
  setWinner,
  getWinner,
  getUsers,
  setUsers,
} from "../../utils";
import { useEffect, useState } from "react";
import { userActions } from "../../reducers/userReducer";
import { useUser } from "../../contexts/userContext";

const gameChoices = [
  { id: 1, choice: "rock" },
  { id: 2, choice: "paper" },
  { id: 3, choice: "scissors" },
];

const Play = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { userDispatch } = useUser();

  const allUsers = getUsers();
  const [players, setPlayers] = useState(getCurrentPlayers());
  const winner = getWinner();
  const playAgain = getPlayAgain();

  const existingRooms = getRooms();

  const [currentPlayer, opponentPlayer] =
    players?.player1?.username === params.get("user")
      ? [players?.player1, players?.player2]
      : [players?.player2, players?.player1];

  const handleChoiceClick = (choice) => {
    setPlayers((prev) => ({
      player1: {
        ...prev.player1,
        choice:
          prev.player1.username === currentPlayer.username
            ? choice
            : prev.player1.choice,
      },
      player2: {
        ...prev.player2,
        choice:
          prev.player2.username === currentPlayer.username
            ? choice
            : prev.player2.choice,
      },
    }));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlayers(getCurrentPlayers());
    }, 1000);

    setCurrentPlayers({
      player1: players?.player1,
      player2: players?.player2,
    });

    return () => clearInterval(intervalId);
  }, [players]);

  useEffect(() => {
    if (currentPlayer?.choice && opponentPlayer?.choice) {
      const winner = getGameWinner(currentPlayer, opponentPlayer);

      setWinner(winner);
    }
  }, [currentPlayer?.choice, opponentPlayer?.choice]);

  useEffect(() => {
    if (winner?.username) {
      setUsers(
        allUsers.map((user) =>
          user.id === winner.id ? { ...user, score: user.score + 1 } : user
        )
      );

      setCurrentPlayers({
        player1:
          winner?.username === players?.player1?.username
            ? { ...players.player1, score: players.player1.score + 1 }
            : players?.player1,
        player2:
          winner?.username === players?.player2?.username
            ? { ...players.player2, score: players.player2.score + 1 }
            : players?.player2,
      });
    }
  }, [winner?.username]);

  return (
    <div className="m-4">
      {!currentPlayer?.choice && (
        <div className="flex gap-2 items-center justify-center">
          {gameChoices?.map(({ id, choice }) => (
            <button
              key={id}
              onClick={() => handleChoiceClick(choice)}
              className="bg-blue-950 p-2 px-4 text-lg rounded-md text-white"
            >
              {choice.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {currentPlayer?.choice ? (
        <p className="m-2 text-lg">
          You picked: {currentPlayer?.choice?.toUpperCase()}
        </p>
      ) : null}

      {currentPlayer?.choice && opponentPlayer?.choice ? (
        <p className="m-2 text-lg">
          Opponent picked: {opponentPlayer?.choice?.toUpperCase()}
        </p>
      ) : null}

      {winner ? (
        <p className="text-2xl font-semibold text-blue-950">
          {winner === "draw"
            ? "It's a draw"
            : winner?.username === currentPlayer?.username
            ? "You win"
            : "You lose"}
        </p>
      ) : null}

      {winner ? (
        <div className="m-4 flex gap-2 justify-center items-center">
          <button
            onClick={() => {
              setWinner("");
              setPlayAgain(currentPlayer);

              setCurrentPlayers({
                player1: { ...players?.player1, choice: null },
                player2: { ...players?.player2, choice: null },
              });

              setRooms([
                ...existingRooms,
                {
                  player1: { ...players.player1, choice: null },
                  player2: { ...players.player2, choice: null },
                },
              ]);
            }}
            className="border-2 bg-blue-950 p-1 px-3 text-lg rounded-md text-white border-neutral-400"
          >
            Play again
          </button>

          <button
            onClick={() => {
              navigate("/");
              setCurrentPlayers({});
              userDispatch({
                type: userActions.SET_CURRENT_USER,
                payload: {},
              });
            }}
            className="border-2 p-1 px-3 text-lg rounded-md border-neutral-400"
          >
            Exit
          </button>
        </div>
      ) : null}

      {!winner && playAgain && playAgain.username !== currentPlayer.username ? (
        <p className="m-4 text-lg">{playAgain.username} wants to play again</p>
      ) : null}

      <div>
        <p className="m-4 text-xl font-semibold">
          Your score: {currentPlayer?.score}
        </p>
      </div>
    </div>
  );
};

export default Play;
