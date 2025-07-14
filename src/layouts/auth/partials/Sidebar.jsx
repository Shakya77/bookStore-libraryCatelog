import { Icon } from "@iconify/react"
import { Link, useLocation } from "react-router-dom"

const SidebarLink = (({ item, collapsed, current }) => {
    return (
        <Link
            to={item.href}
            className={`sidebar-link group flex items-center py-3 text-base font-medium rounded-lg relative whitespace-nowrap transition-all duration-200 ${collapsed ? "justify-start px-3" : "justify-start px-4"
                } ${current
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
})

const Sidebar = ({ collapsed }) => {
    const location = useLocation()
    const currentRoute = location.pathname

    const navigationItems = [
        { name: "Dashboard", href: "/admin", icon: "tabler:dashboard" },
        { name: "Author", href: "/author", icon: "tabler:users" },
        { name: "Category", href: "/category", icon: "tabler:package" },
        { name: "Book", href: "/book", icon: "solar:book-bold" },
        { name: "Analytics", href: "/analytics", icon: "tabler:chart-line" },
        { name: "Reports", href: "/reports", icon: "tabler:file-text" },
    ]

    const bottomNavigationItems = [
        { name: "Settings", href: "/settings", icon: "tabler:settings" },
        { name: "Help", href: "/help", icon: "tabler:help" },
    ]

    const isCurrent = (href) => currentRoute === href || currentRoute.startsWith(href)

    return (
        <div
            id="sidebar"
            className={`lg:fixed absolute inset-y-0 left-0 z-20 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out pt-16 overflow-hidden ${collapsed ? "w-20" : "w-72"
                }`}
        >
            <div className="flex flex-col h-full">
                <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto overflow-x-hidden">
                    {navigationItems.map((item) => (
                        <SidebarLink
                            key={item.name}
                            item={item}
                            collapsed={collapsed}
                            current={isCurrent(item.href)}
                        />
                    ))}

                    <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

                    {bottomNavigationItems.map((item) => (
                        <SidebarLink
                            key={item.name}
                            item={item}
                            collapsed={collapsed}
                            current={isCurrent(item.href)}
                        />
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default (Sidebar)
