import { Routes, Route, useNavigate } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PrivateRoute from "./components/PrivateRoute";
import { useEffect, useState } from "react";
import DashBoard from "./pages/DashBoard";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";

function App() {
  const URL = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${URL}/auth/user`, {
          method: "GET",
          credentials: "include",
        });

        console.log("Status: ", response.status);

        if (response.status === 401) {
          dispatch(setUser(null));
          return;
        }

        if (!response.ok) {
          const errData = await response.json();
          throw Error(errData.message || "Failed to fetch user.");
        }

        const data = await response.json();
        console.log("Infos: ", data);
        dispatch(setUser(data));
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      fetchUsers();
    }, 2000);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              setUser={(user) => dispatch(setUser(user))}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              username={username}
              setUserName={setUserName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={<DashBoard error={error} isLoading={isLoading} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
