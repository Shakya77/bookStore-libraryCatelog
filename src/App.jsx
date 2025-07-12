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
import Category from "./views/auth/Category";
import { Toaster } from "react-hot-toast";

function App() {
  const status = useSelector((state) => state.auth.isLoggedIn);
  console.log(status);
  return (
    <>

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
              <Route path="/category" element={<Category />} />
            </Route>
          </Route>
          {
            status ? (
              <></>
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
        </Routes >
      </Router >

      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-gray-800 text-white px-4 py-2 rounded shadow-md',
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      /></>
  );
}

export default App;
