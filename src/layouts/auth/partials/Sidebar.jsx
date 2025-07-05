import { useState } from "react";
import {
    LayoutDashboard,
    User,
    FileText,
    Table,
    Folder,
    ChevronDown,
} from "lucide-react";

export default function Sidebar({ page }) {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    const toggleSidebar = () => setSidebarToggle(!sidebarToggle);

    return (
        <aside
            className={`sidebar fixed top-0 left-0 z-[9999] h-screen flex flex-col border-r border-gray-200 bg-white px-5 transition-all duration-300 ease-in-out ${sidebarToggle ? "translate-x-0 lg:w-[90px]" : "-translate-x-full lg:translate-x-0 lg:w-[290px]"
                }`}
        >
            {/* SIDEBAR HEADER */}
            <div className={`flex items-center pt-8 pb-7 ${sidebarToggle ? "justify-center" : "justify-between"}`}>
                <a href="index.html" className="flex items-center gap-2">
                    {!sidebarToggle && (
                        <span className="logo">
                            <img className="hidden dark:block" src="./images/logo/logo-dark.svg" alt="Logo" />
                        </span>
                    )}
                    <img
                        className={`${sidebarToggle ? "lg:block" : "hidden"} logo-icon`}
                        src="./images/logo/logo-icon.svg"
                        alt="Logo"
                    />
                </a>
                <button className="lg:hidden" onClick={toggleSidebar}>☰</button>
            </div>

            {/* SIDEBAR MENU */}
            <nav className="overflow-y-auto no-scrollbar">
                <h3 className="mb-4 text-xs uppercase text-gray-400">Menu</h3>
                <ul className="flex flex-col gap-4">

                    {/* --- Dashboard --- */}
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSelected(selected === "Dashboard" ? "" : "Dashboard");
                            }}
                            className={`group flex items-center justify-between px-3 py-2 text-sm font-medium rounded hover:bg-gray-100  ${selected === "Dashboard" || ["ecommerce", "analytics", "marketing", "crm", "stocks"].includes(page)
                                ? "bg-gray-200 "
                                : ""
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                <LayoutDashboard className="h-5 w-5" />
                                {!sidebarToggle && <span>Dashboard</span>}
                            </span>
                            {!sidebarToggle && (
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${selected === "Dashboard" ? "rotate-180" : ""
                                        }`}
                                />
                            )}
                        </a>
                        {selected === "Dashboard" && (
                            <ul className="ml-8 mt-2 flex flex-col gap-2 text-sm">
                                <li>
                                    <a
                                        href="index.html"
                                        className={`block px-2 py-1 rounded hover:bg-gray-100 ${page === "ecommerce" ? "font-semibold text-indigo-600" : ""
                                            }`}
                                    >
                                        eCommerce
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* --- Profile --- */}
                    <li>
                        <a
                            href="profile.html"
                            onClick={() => setSelected("Profile")}
                            className={`group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded hover:bg-gray-100  ${selected === "Profile" && page === "profile"
                                ? "bg-gray-200 "
                                : ""
                                }`}
                        >
                            <User className="h-5 w-5" />
                            {!sidebarToggle && <span>User Profile</span>}
                        </a>
                    </li>

                    {/* --- Forms --- */}
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSelected(selected === "Forms" ? "" : "Forms");
                            }}
                            className={`group flex items-center justify-between px-3 py-2 text-sm font-medium rounded hover:bg-gray-100 ${selected === "Forms" || ["formElements"].includes(page)
                                ? "bg-gray-200 "
                                : ""
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                <FileText className="h-5 w-5" />
                                {!sidebarToggle && <span>Forms</span>}
                            </span>
                            {!sidebarToggle && (
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${selected === "Forms" ? "rotate-180" : ""
                                        }`}
                                />
                            )}
                        </a>
                        {selected === "Forms" && (
                            <ul className="ml-8 mt-2 flex flex-col gap-2 text-sm">
                                <li>
                                    <a
                                        href="form-elements.html"
                                        className={`block px-2 py-1 rounded hover:bg-gray-100 ${page === "formElements" ? "font-semibold text-indigo-600" : ""
                                            }`}
                                    >
                                        Form Elements
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* --- Tables --- */}
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSelected(selected === "Tables" ? "" : "Tables");
                            }}
                            className={`group flex items-center justify-between px-3 py-2 text-sm font-medium rounded hover:bg-gray-100  ${selected === "Tables" || ["basicTables"].includes(page)
                                ? "bg-gray-200"
                                : ""
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                <Table className="h-5 w-5" />
                                {!sidebarToggle && <span>Tables</span>}
                            </span>
                            {!sidebarToggle && (
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${selected === "Tables" ? "rotate-180" : ""
                                        }`}
                                />
                            )}
                        </a>
                        {selected === "Tables" && (
                            <ul className="ml-8 mt-2 flex flex-col gap-2 text-sm">
                                <li>
                                    <a
                                        href="basic-tables.html"
                                        className={`block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${page === "basicTables" ? "font-semibold text-indigo-600" : ""
                                            }`}
                                    >
                                        Basic Tables
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* --- Pages --- */}
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSelected(selected === "Pages" ? "" : "Pages");
                            }}
                            className={`group flex items-center justify-between px-3 py-2 text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${selected === "Pages" || ["blank"].includes(page)
                                ? "bg-gray-200 dark:bg-gray-700"
                                : ""
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                <Folder className="h-5 w-5" />
                                {!sidebarToggle && <span>Pages</span>}
                            </span>
                            {!sidebarToggle && (
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${selected === "Pages" ? "rotate-180" : ""
                                        }`}
                                />
                            )}
                        </a>
                        {selected === "Pages" && (
                            <ul className="ml-8 mt-2 flex flex-col gap-2 text-sm">
                                <li>
                                    <a
                                        href="blank.html"
                                        className={`block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${page === "blank" ? "font-semibold text-indigo-600" : ""
                                            }`}
                                    >
                                        Blank Page
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
