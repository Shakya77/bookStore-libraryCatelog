import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./views/guest/Login";
import NotFoundPage from "./views/404";
import Welcome from "./views/Welcome";
import GuestLayout from "./layouts/guest/GuestLayout";
import Register from "./views/guest/Register";
import AuthLayout from "./layouts/auth/AuthLayout";
import Dashboard from "./views/auth/Dashboard";

function App() {
  const status = useSelector((state) => state.auth.isLoggedIn);
  console.log(status);
  return (
    <Router>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Welcome />} />
        </Route>

        {
          status ? (
            <Route>
              <Route element={<AuthLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Route>
          ) : (
            <Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<GuestLayout />}>
                <Route path="/about" element={<>About</>} />
              </Route>
            </Route>
          )
        }
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
