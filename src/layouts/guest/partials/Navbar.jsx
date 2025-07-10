import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SubmenuBar } from "../../../views/guest/partials/SubmenuBar"

export default function Navbar() {
    const [isDark, setIsDark] = useState(false)
    const navigate = useNavigate()

    // Initialize theme on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)

        setIsDark(shouldBeDark)

        if (shouldBeDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = !isDark
        setIsDark(newTheme)

        if (newTheme) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }

    const handleNavigation = (url) => {
        navigate(url)
    }

    return (
        <header className="bg-white/90  backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <button onClick={() => handleNavigation("/")}
                            className="text-xl font-bold text-gray-900  hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            KitabNagar
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100  hover:bg-gray-200  transition-colors"
                            aria-label="Toggle theme">
                            {isDark ? (
                                <Icon icon="tabler:moon-filled" width="18" className="text-gray-600 dark:text-gray-300" />
                            ) : (
                                <Icon icon="tabler:sun-filled" width="18" className="text-gray-600 dark:text-gray-300" />
                            )}
                        </button>

                        {/* Authentication Navigation */}
                        <button onClick={() => handleNavigation('/dashboard')}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Dashboard
                        </button>
                        <>
                            <button onClick={() => handleNavigation('/login')}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Log in
                            </button>
                            <button onClick={() => handleNavigation('/register')}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Register
                            </button>
                        </>
                    </div>
                </div>
                <SubmenuBar />
            </div>
        </header >
    )
}
