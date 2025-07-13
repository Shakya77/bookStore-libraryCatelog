import { Icon } from "@iconify/react"
import { Link, useLocation } from "react-router-dom"

export default function Sidebar() {
    const location = useLocation()
    const currentRoute = location.pathname

    const navigationItems = [
        { name: "Overview", href: "/user", icon: "lucide:layout-dashboard" },
        { name: "Book Reads", href: "/user/author", icon: "lucide:book-open" },
        { name: "Wishlist", href: "/user/category", icon: "lucide:heart" },
        { name: "Settings", href: "/user/settings", icon: "lucide:settings" },
    ]

    const isCurrent = (href) => currentRoute === href

    return (
        <div className="w-full md:w-64 border-b md:border-r md:border-b-0 p-4 space-y-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">My Account</h2>
            {navigationItems.map((item) => (
                <SidebarLink
                    key={item.name}
                    item={item}
                    current={isCurrent(item.href)}
                />
            ))}
        </div>
    )
}

const SidebarLink = (({ item, current }) => {
    console.log(item, current);
    return (
        <Link to={item.href} className={`w-full justify-start inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 
            ${current ? "bg-gray-100 text-gray-900 hover:bg-gray-200" : "text-gray-700 hover:bg-gray-50"}`} title={item.name}>
            <Icon icon={item.icon} className="mr-2 h-4 w-4" />
            {item.name}
        </Link>
    )
})