import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/auth/Login";
import NotFoundPage from "./views/404";
import Welcome from "./views/Welcome";
import GuestLayout from "./layouts/guest/GuestLayout";
import Register from "./views/auth/Register";
import AuthLayout from "./layouts/auth/AuthLayout";
import Dashboard from "./views/admin/Dashboard";
import Author from "./views/admin/Author";
import Category from "./views/admin/Category";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./utils/PrivateRoutes";
import Profile from "./views/user/Profile";
import BookRead from "./views/user/BookRead";
import Settings from "./views/user/Settings";
import Wishlist from "./views/user/Wishlist";
import PublicRoute from "./utils/PublicRoutes";

function App() {
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />

          <Route element={<GuestLayout />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/about" element={<>About</>} />
          </Route>

          <Route element={<PrivateRoutes role="admin" />}>
            <Route element={<AuthLayout logout={handleLogout} />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/author" element={<Author />} />
              <Route path="/category" element={<Category />} />
            </Route>
          </Route>

          <Route element={<PrivateRoutes role="user" />}>
            <Route element={<GuestLayout logout={handleLogout} />}>
              <Route path="/user" element={<Profile />} />
              <Route path="/user/author" element={<BookRead />} />
              <Route path="/user/category" element={<Wishlist />} />
              <Route path="/user/settings" element={<Settings />} />
            </Route>
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

        </Routes >
      </Router >

      <Toaster position="top-right" toastOptions=
        {{
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
      />
    </>
  );
}

export default App;
