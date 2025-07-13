import { Link, useNavigate } from "react-router-dom"
import { SubmenuBar } from "../../../views/guest/partials/SubmenuBar"

export default function Navbar() {
    const navigate = useNavigate()

    const handleNavigation = (url) => {
        navigate(url)
    }

    const isLoggedIn = localStorage.getItem('token');

    return (
        <header className="bg-white/90  backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <button onClick={() => handleNavigation("/")}
                            className="text-xl font-bold text-gray-900  hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            KitabNagar
                        </button>
                    </div>

                    <div className="flex items-center space-x-4 ">
                        <button onClick={() => handleNavigation('/dashboard')}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Dashboard
                        </button>
                        {isLoggedIn ?
                            <button onClick={() => handleNavigation('/user')}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Profile
                            </button>
                            :
                            <>
                                <button onClick={() => handleNavigation('/login')}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    Log in
                                </button>
                            </>
                        }
                    </div>
                </div>
                <SubmenuBar />
            </div>
        </header >
    )
}
