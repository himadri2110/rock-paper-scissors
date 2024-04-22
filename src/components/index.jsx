import { useState } from "react";
import { useUser } from "../contexts/userContext";
import CreateUser from "./CreateUser";
import LeaderBoard from "./LeaderBoard";

const PlayGame = () => {
  const [createUser, setCreateUser] = useState(false);

  const { userState } = useUser();

  return (
    <div className="m-4">
      {!createUser && !userState.currentUser && (
        <div>
          <button
            className="outline-transparent border-2 p-3 text-lg rounded-md border-neutral-400"
            onClick={() => setCreateUser(true)}
          >
            Create new user
          </button>
        </div>
      )}

      {createUser && <CreateUser />}

      <div>
        <LeaderBoard />
      </div>
    </div>
  );
};

export default PlayGame;
