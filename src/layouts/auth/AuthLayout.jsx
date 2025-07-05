import { useState, useEffect, useRef } from "react"
import Navbar from "./partials/Navbar"
import Sidebar from "./partials/Sidebar"
import Preloader from "./partials/Preloader"

const AuthLayout = ({ children, header }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [theme, setTheme] = useState("light")
    const [isLoading, setIsLoading] = useState(false)
    const [userDropdownOpen, setUserDropdownOpen] = useState(false)
    const loaderTimeoutRef = useRef(null)

    // Initialize theme and sidebar state from localStorage
    useEffect(() => {
        // Theme initialization
        const savedTheme = localStorage.getItem("theme")
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const initialTheme = savedTheme || (prefersDark ? "dark" : "light")

        setTheme(initialTheme)
        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }

        // Sidebar initialization
        const savedSidebarState = localStorage.getItem("sidebarCollapsed") === "true"
        setSidebarCollapsed(savedSidebarState)
    }, [])

    // Theme toggle function
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark"
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }

    // Sidebar toggle function
    const toggleSidebar = () => {
        const newState = !sidebarCollapsed
        setSidebarCollapsed(newState)
        localStorage.setItem("sidebarCollapsed", newState.toString())
    }

    // Loading functionality
    const showLoader = () => {
        if (loaderTimeoutRef.current) {
            clearTimeout(loaderTimeoutRef.current)
        }

        setIsLoading(true)
        loaderTimeoutRef.current = setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    // Global loader function
    useEffect(() => {
        window.triggerLoader = showLoader

        return () => {
            if (loaderTimeoutRef.current) {
                clearTimeout(loaderTimeoutRef.current)
            }
        }
    }, [])

    // Handle navigation clicks
    const handleNavigation = (e) => {
        const target = e.target.closest("a")
        if (
            target &&
            target.href &&
            !target.href.startsWith("#") &&
            !target.href.startsWith("javascript:") &&
            !target.href.startsWith("mailto:") &&
            !target.href.startsWith("tel:") &&
            target.hostname === window.location.hostname &&
            !e.ctrlKey &&
            !e.metaKey &&
            e.which !== 2 &&
            target.getAttribute("target") !== "_blank"
        ) {
            showLoader()
        }
    }

    // Handle form submissions
    const handleFormSubmit = () => {
        showLoader()
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest("#user-dropdown-toggle") && !e.target.closest("#user-dropdown-menu")) {
                setUserDropdownOpen(false)
            }
        }

        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [])

    // Responsive sidebar handling
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarCollapsed(true)
            }
        }

        window.addEventListener("resize", handleResize)
        handleResize() // Initial check

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div
            className="min-h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden"
            onClick={handleNavigation}
            onSubmit={handleFormSubmit}
        >
            <Preloader isVisible={isLoading} />

            <Navbar
                sidebarCollapsed={sidebarCollapsed}
                toggleSidebar={toggleSidebar}
                theme={theme}
                toggleTheme={toggleTheme}
                userDropdownOpen={userDropdownOpen}
                setUserDropdownOpen={setUserDropdownOpen}
            />

            <Sidebar collapsed={sidebarCollapsed} />

            <main
                id="main-content"
                className={`pt-16 min-h-screen transition-all duration-300 ${sidebarCollapsed ? "pl-20" : "pl-72"}`}
            >
                <div className="p-8">
                    {header && <div className="mb-8">{header}</div>}
                    {children}
                </div>
            </main>
        </div>
    )
}

export default AuthLayout
