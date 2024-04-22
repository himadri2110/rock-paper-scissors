import { useEffect } from "react";
import "./App.css";
import { PublicRoutes } from "./routes";
import { useUser } from "./contexts/userContext";
import { userActions } from "./reducers/userReducer";
import { getUsers } from "./utils";

function App() {
  const { userDispatch } = useUser();

  useEffect(() => {
    const intervalId = setInterval(() => {
      userDispatch({ type: userActions.SET_USERS, payload: getUsers() });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [userDispatch]);

  return (
    <div className="App h-screen p-4 bg-cyan-300 text-gray-900">
      <p className="text-3xl font-semibold text-blue-950">
        Rock, Paper, Scissors
      </p>

      <PublicRoutes />
    </div>
  );
}

export default App;
