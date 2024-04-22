const initialUserState = {
  currentUser: "",
  users: [],
  players: [],
};

export const userActions = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_USERS: "SET_USERS",
  SET_PLAYERS: "SET_PLAYERS",
};

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case userActions.SET_USERS:
      return {
        ...state,
        users: payload,
      };

    case userActions.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    case userActions.SET_PLAYERS:
      return {
        ...state,
        players: payload,
      };

    default:
      return state;
  }
};

export { userReducer, initialUserState };
