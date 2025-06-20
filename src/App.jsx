import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./views/guest/Login";
import NotFoundPage from "./views/404";
import Welcome from "./views/Welcome";
import GuestLayout from "./views/layouts/guest/GuestLayout";

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
            <Route path="/dashboard" element={<>Logged in vayo hai ta</>} />
          ) : (
            <Route>
              <Route path="/login" element={<Login />} />
              <Route element={<GuestLayout />}>
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
