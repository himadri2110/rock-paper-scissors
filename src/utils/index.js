const checkDuplicateUsers = (currentUser, users) => {
  return users?.find((user) => user.username === currentUser);
};

const getUsers = () => {
  return JSON.parse(localStorage.getItem("users"));
};

const setUsers = (users) => {
  return localStorage.setItem("users", JSON.stringify(users));
};

const getRooms = () => {
  return JSON.parse(localStorage.getItem("rooms"));
};

const setRooms = (rooms) => {
  return localStorage.setItem("rooms", JSON.stringify(rooms));
};

const findMatchingPlayers = ({ rooms, player1, player2 }) => {
  const matchingPlayers = rooms?.find(
    (room) => room.player2.id === player1.id && room.player1.id === player2.id
  );

  if (matchingPlayers) return { player1, player2 };

  return null;
};

const getCurrentPlayers = () => {
  return JSON.parse(localStorage.getItem("currentPlayers"));
};

const setCurrentPlayers = (currentPlayers) => {
  return localStorage.setItem("currentPlayers", JSON.stringify(currentPlayers));
};

const getGameWinner = (player1, player2) => {
  if (player1.choice === player2.choice) {
    return "draw";
  } else if (player1.choice === "rock") {
    if (player2.choice === "scissors") {
      return player1;
    } else {
      return player2;
    }
  } else if (player1.choice === "scissors") {
    if (player2.choice === "paper") {
      return player1;
    } else {
      return player2;
    }
  } else if (player1.choice === "paper") {
    if (player2.choice === "rock") {
      return player1;
    } else {
      return player2;
    }
  }
};

const getPlayAgain = () => {
  return JSON.parse(localStorage.getItem("playAgain"));
};

const setPlayAgain = (user) => {
  return localStorage.setItem("playAgain", JSON.stringify(user));
};

const getWinner = () => {
  return JSON.parse(localStorage.getItem("winner"));
};

const setWinner = (winner) => {
  return localStorage.setItem("winner", JSON.stringify(winner));
};

const getWaitingList = () => {
  return JSON.parse(localStorage.getItem("waitingList"));
};

const setWaitingList = (waitingList) => {
  return localStorage.setItem("waitingList", JSON.stringify(waitingList));
};

export {
  checkDuplicateUsers,
  getUsers,
  setUsers,
  getRooms,
  setRooms,
  findMatchingPlayers,
  getCurrentPlayers,
  setCurrentPlayers,
  getGameWinner,
  getPlayAgain,
  setPlayAgain,
  getWinner,
  setWinner,
  getWaitingList,
  setWaitingList,
};
