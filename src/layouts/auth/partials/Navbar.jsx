import { Icon } from "@iconify/react"

const Navbar = ({
    sidebarCollapsed,
    toggleSidebar,
    theme,
    toggleTheme,
    userDropdownOpen,
    setUserDropdownOpen,
}) => {
    // Mock user data - replace with your actual user data
    const user = {
        name: "Bijan Shakya",
        email: "bijanshakya145@gmail.com",
    }

    const appName = "Admin Panel"

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            // Show loader and navigate
            if (window.triggerLoader) {
                window.triggerLoader()
            }
            setTimeout(() => {
                window.location.href = "/logout"
            }, 100)
        }
    }

    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm fixed top-0 left-0 right-0 z-30">
            <div className="px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {/* Sidebar Toggle Button */}
                        <button
                            onClick={toggleSidebar}
                            className="p-2.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 mr-4 transition-colors duration-200"
                        >
                            <Icon icon={sidebarCollapsed ? "tabler:menu" : "tabler:menu-2"} width={22} />
                        </button>

                        {/* Logo */}
                        <div className="flex items-center">
                            <a href="/dashboard" className="flex items-center">
                                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">{appName.charAt(0)}</span>
                                </div>
                                <span className="ml-3 text-xl font-semibold text-gray-800 dark:text-gray-200">{appName}</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center space-x-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                        >
                            <Icon icon={theme === "dark" ? "tabler:sun-filled" : "tabler:moon-filled"} width={20} />
                        </button>

                        {/* Notifications */}
                        <button className="relative p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                            <Icon icon="tabler:bell" width={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User Dropdown */}
                        <div className="relative">
                            <button
                                id="user-dropdown-toggle"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setUserDropdownOpen(!userDropdownOpen)
                                }}
                                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                <img
                                    className="w-8 h-8 rounded-full mr-3"
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=fff`}
                                    alt="User Avatar"
                                />
                                <span className="hidden md:block text-base">{user.name}</span>
                                <Icon
                                    icon="tabler:chevron-down"
                                    width={18}
                                    className={`ml-2 transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {userDropdownOpen && (
                                <div
                                    id="user-dropdown-menu"
                                    className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700"
                                >
                                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                        <p className="text-base font-medium text-gray-800 dark:text-gray-200">{user.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                    </div>

                                    <a
                                        href="/profile"
                                        className="flex items-center px-4 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <Icon icon="tabler:user" width={18} className="mr-3" />
                                        Profile
                                    </a>

                                    <a
                                        href="/settings"
                                        className="flex items-center px-4 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <Icon icon="tabler:settings" width={18} className="mr-3" />
                                        Settings
                                    </a>

                                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-3 text-base text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Icon icon="tabler:logout" width={18} className="mr-3" />
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
