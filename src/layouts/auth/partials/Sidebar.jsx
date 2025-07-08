import { Icon } from "@iconify/react"
import { Link, NavLink } from "react-router-dom"

const Sidebar = ({ collapsed }) => {
    // Mock current route - replace with your actual routing logic
    const currentRoute = typeof window !== "undefined" ? window.location.pathname : "/"

    const navigationItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: "tabler:dashboard",
            current: currentRoute === "/dashboard",
        },
        {
            name: "Author",
            href: "/author",
            icon: "tabler:users",
            current: currentRoute === "/author",
        },
        {
            name: "Products",
            href: "/products",
            icon: "tabler:package",
            current: currentRoute.startsWith("/products"),
        },
        {
            name: "Orders",
            href: "/orders",
            icon: "tabler:shopping-cart",
            current: currentRoute.startsWith("/orders"),
        },
        {
            name: "Analytics",
            href: "/analytics",
            icon: "tabler:chart-line",
            current: currentRoute.startsWith("/analytics"),
        },
        {
            name: "Reports",
            href: "/reports",
            icon: "tabler:file-text",
            current: currentRoute.startsWith("/reports"),
        },
    ]

    const bottomNavigationItems = [
        {
            name: "Settings",
            href: "/settings",
            icon: "tabler:settings",
            current: currentRoute.startsWith("/settings"),
        },
        {
            name: "Help",
            href: "/help",
            icon: "tabler:help",
            current: false,
        },
    ]

    const SidebarLink = ({ item, collapsed }) => {
        return (
            <Link
                to={item.href}
                className={`sidebar-link group flex items-center py-3 text-base font-medium rounded-lg relative whitespace-nowrap transition-all duration-200 ${collapsed ? "justify-start px-3" : "justify-start px-4"
                    } ${item.current
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                title={item.name}
            >
                <Icon icon={item.icon} width={22} className="flex-shrink-0" />
                {!collapsed && <span className="sidebar-text ml-4">{item.name}</span>}

                {collapsed && (
                    <div className="sidebar-tooltip hidden absolute left-full ml-3 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                        {item.name}
                    </div>
                )}
            </Link>
        )
    }

    return (
        <div
            id="sidebar"
            className={`lg:fixed absolute inset-y-0 left-0 z-20 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out pt-16 overflow-hidden ${collapsed ? "w-20" : "w-72"
                }`}
        >
            <div className="flex flex-col h-full">
                <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto overflow-x-hidden">
                    {navigationItems.map((item) => (
                        <SidebarLink key={item.name} item={item} collapsed={collapsed} />
                    ))}

                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

                    {bottomNavigationItems.map((item) => (
                        <SidebarLink key={item.name} item={item} collapsed={collapsed} />
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
