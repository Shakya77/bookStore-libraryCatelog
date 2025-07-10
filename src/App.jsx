import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./views/guest/Login";
import NotFoundPage from "./views/404";
import Welcome from "./views/Welcome";
import GuestLayout from "./layouts/guest/GuestLayout";
import Register from "./views/guest/Register";
import AuthLayout from "./layouts/auth/AuthLayout";
import Dashboard from "./views/auth/Dashboard";
import Author from "./views/auth/Author";

function App() {
  const status = useSelector((state) => state.auth.isLoggedIn);
  console.log(status);
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Welcome />} />
        </Route>
        <Route>
          <Route element={<AuthLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/author" element={<Author />} />
          </Route>
        </Route>
        {
          status ? (
            <></>
          ) : (
            <Route>
              <Route element={<GuestLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<>About</>} />
              </Route>
            </Route>
          )
        }
      </Routes >
    </Router >
  );
}

export default App;
