import { Outlet } from "react-router-dom";
import Footer from "./partials/Footer";
import Navbar from "./partials/Navbar";
import { SubmenuBar } from "../../views/guest/partials/SubmenuBar";

export default function GuestLayout() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-full max-w-7xl p-4 sm:px-6 lg:px-8 ">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}

