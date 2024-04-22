import { getUsers } from "../../utils";

const LeaderBoard = () => {
  const allUsers = getUsers();

  if (!allUsers) return <></>;

  return (
    <div className="m-4">
      <p className="text-xl font-semibold text-blue-950">Leaderboard</p>

      <ul>
        {allUsers
          ?.sort((a, b) => b.score - a.score)
          .map((user) => (
            <li key={user.id} className="text-md">
              {user.username}: {user.score} points
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
