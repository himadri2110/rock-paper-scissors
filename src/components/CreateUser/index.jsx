import { useState } from "react";
import { checkDuplicateUsers, getUsers, setUsers } from "../../utils";
import { useUser } from "../../contexts/userContext";
import { userActions } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [userError, setUserError] = useState("");

  const { userState, userDispatch } = useUser();
  const navigate = useNavigate();

  const users = userState.users;

  const handleCreateUser = (e) => {
    e.preventDefault();

    if (checkDuplicateUsers(username, users)) {
      setUserError(`${username} already exists. Please pick a different name.`);
      return;
    } else {
      // create new user

      const existingUsers = getUsers();

      userDispatch({
        type: userActions.SET_CURRENT_USER,
        payload: {
          id: existingUsers ? existingUsers.length + 1 : 1,
          username,
          score: 0,
        },
      });

      if (existingUsers) {
        setUsers([
          ...existingUsers,
          { id: existingUsers.length + 1, username, score: 0 },
        ]);
      } else {
        setUsers([{ id: 1, username, score: 0 }]);
      }

      navigate(`/lobby?user=${username}`);

      setUserError("");
      setUsername("");
    }
  };

  return (
    <div className="m-4">
      <form
        onSubmit={handleCreateUser}
        className="flex items-center justify-center "
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="p-2 focus:outline-none rounded-md rounded-r-none"
        />

        <button
          type="submit"
          className="bg-blue-950 p-2 px-4 rounded-md rounded-l-none text-white"
          disabled={!username}
        >
          Create
        </button>
      </form>

      <p className="m-2 text-sm text-red-500">{userError}</p>
    </div>
  );
};

export default CreateUser;
