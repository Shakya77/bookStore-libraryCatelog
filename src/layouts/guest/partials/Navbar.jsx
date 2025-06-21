import { useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, Search } from "lucide-react"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen)

    const linkClass = (path) =>
        location.pathname === path
            ? "text-indigo-600 font-semibold"
            : "text-gray-700 hover:text-indigo-600 transition-colors"

    const mobileLinkClass = (path) =>
        `block py-2 px-4 text-base font-medium transition-colors ${location.pathname === path
            ? "text-indigo-600 font-semibold bg-indigo-50"
            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
        }`

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex justify-center">
                <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-indigo-600">KitabPath</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8">
                            <NavLink to="/" className={() => linkClass("/")}>
                                Home
                            </NavLink>
                            <NavLink to="/about" className={() => linkClass("/about")}>
                                About
                            </NavLink>
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <button onClick={() => navigate("/login")}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                                Login
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-gray-600 hover:text-indigo-600 transition-colors p-2"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white text-center">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <NavLink to="/" className={() => mobileLinkClass("/")} onClick={() => setIsOpen(false)}>
                            Home
                        </NavLink>
                        <NavLink to="/about" className={() => mobileLinkClass("/about")} onClick={() => setIsOpen(false)}>
                            About
                        </NavLink>
                        <NavLink to="/services" className={() => mobileLinkClass("/services")} onClick={() => setIsOpen(false)}>
                            Services
                        </NavLink>
                        <NavLink to="/contact" className={() => mobileLinkClass("/contact")} onClick={() => setIsOpen(false)}>
                            Contact
                        </NavLink>
                    </div>

                    {/* Mobile Search and Sign In */}
                    <div className="px-4 py-3 border-t border-gray-200 space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                            Sign In
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
