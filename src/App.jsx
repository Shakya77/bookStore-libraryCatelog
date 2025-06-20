import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./views/guest/Login";
import NotFoundPage from "./views/404";
import Welcome from "./views/Welcome";

function App() {
  const status = useSelector((state) => state.auth.isLoggedIn);
  console.log(status);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        {
          status ? (
            <Route path="/dashboard" element={<>Logged in vayo hai ta</>} />
          ) : (
            <Route path="/login" element={<Login />} />
          )
        }
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
