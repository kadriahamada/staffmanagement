import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PrivateRoute from "./components/PrivateRoute";
import { useEffect, useState } from "react";
import DashBoard from "./pages/DashBoard";

function App() {
  const API_URL = "http://localhost:3500";

  const [user, setUser] = useState({});

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return console.error("Fetching reqires access token.");

      const response = await fetch(`${API_URL}/auth/user`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        console.log("Failed to fetch the user.");
        return;
      }

      try {
        const data = await response.json();
        console.log("Data infos: ", data);
        setUser(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUsers();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const newName = nameRegex.test(username);
    const newEmail = emailRegex.test(email);
    const newPassword = passwordRegex.test(password);

    if (!newName) {
      alert(
        "Provide a valid name start with capital no special chars allowed.",
      );
      return;
    } else if (!newEmail) {
      alert("Please enter a valid email.");
      return;
    } else if (!newPassword) {
      alert("Enater a valid password");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to register.");
      }
      console.log("Registered user ", data);

      setEmail("");
      setPassword("");
      router("/login");

      return data;
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const newEmail = emailRegex.test(email);
    const newPassword = passwordRegex.test(password);
    if (!newEmail) {
      alert("Please enter a valid email.");
      return;
    } else if (!newPassword) {
      alert("Enter a valid password");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error(`${data.message}`);
        return;
      }
      localStorage.setItem("accessToken", data.accessToken);

      const responseData = await fetch(`${API_URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      });
      const currentUser = await responseData.json();
      setUser(currentUser);
      localStorage.setItem("user", JSON.stringify(currentUser));

      setEmail("");
      setPassword("");
      router("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser({});
    router("/login");
  };
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
              handleLogin={handleLogin}
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
              handleRegister={handleRegister}
            />
          }
        />
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={<DashBoard user={user} handleLogout={handleLogout} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
