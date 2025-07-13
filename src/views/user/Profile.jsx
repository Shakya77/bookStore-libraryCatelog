"use client"

import { useState } from "react"
import { Icon } from "@iconify/react"

// Placeholder components for different sections
function ProfileOverview() {
    return (
        <div className="bg-white pt-6 rounded-lg">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Profile Overview</h2>
                <p className="text-gray-500 text-sm">Summary of your account activity.</p>
            </div>
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    {/* Replaced Avatar with plain div/img */}
                    <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img src="/placeholder.svg?height=80&width=80" alt="User Avatar" className="object-cover h-full w-full" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
                        <p className="text-gray-500 text-sm">johndoe@example.com</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-md">
                        <p className="text-sm text-gray-500">Books Read</p>
                        <p className="text-2xl font-bold text-gray-900">124</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-md">
                        <p className="text-sm text-gray-500">Wishlist Items</p>
                        <p className="text-2xl font-bold text-gray-900">18</p>
                    </div>
                </div>
                {/* Replaced Button with plain button */}
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 h-10 px-4 py-2">
                    Edit Profile
                </button>
            </div>
        </div>
    )
}

function ProfileBookReads() {
    const readBooks = [
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            date: "2023-10-15",
            image: "/placeholder.svg?height=100&width=70",
        },
        {
            id: 2,
            title: "1984",
            author: "George Orwell",
            date: "2023-08-22",
            image: "/placeholder.svg?height=100&width=70",
        },
        {
            id: 3,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            date: "2023-06-01",
            image: "/placeholder.svg?height=100&width=70",
        },
    ]
    return (
        <div className="bg-white pt-6 rounded-lg">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Your Book Reads</h2>
                <p className="text-gray-500 text-sm">A list of books you have read.</p>
            </div>
            <div>
                <ul className="space-y-4">
                    {readBooks.map((book) => (
                        <li key={book.id} className="flex items-center space-x-4 p-2 border border-gray-200 rounded-md">
                            <img
                                src={book.image || "/placeholder.svg"}
                                alt={book.title}
                                className="h-24 w-auto object-contain rounded-sm"
                            />
                            <div>
                                <h4 className="font-semibold text-gray-800">{book.title}</h4>
                                <p className="text-sm text-gray-600">{book.author}</p>
                                <p className="text-xs text-gray-500">Read on: {book.date}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function ProfileWishlist() {
    const wishlistItems = [
        { id: 1, title: "Dune", author: "Frank Herbert", image: "/placeholder.svg?height=100&width=70" },
        { id: 2, title: "The Lord of the Rings", author: "J.R.R. Tolkien", image: "/placeholder.svg?height=100&width=70" },
    ]
    return (
        <div className="bg-white pt-6 rounded-lg">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Your Wishlist</h2>
                <p className="text-gray-500 text-sm">Books you want to read or buy.</p>
            </div>
            <div>
                <ul className="space-y-4">
                    {wishlistItems.map((item) => (
                        <li key={item.id} className="flex items-center space-x-4 p-2 border border-gray-200 rounded-md">
                            <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="h-24 w-auto object-contain rounded-sm"
                            />
                            <div>
                                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                                <p className="text-sm text-gray-600">{item.author}</p>
                                {/* Replaced Button with plain button */}
                                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-100 h-8 px-3 py-1 mt-2">
                                    Add to Cart
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function ProfileSettings() {
    return (
        <div className="bg-white pt-6 rounded-lg">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
                <p className="text-gray-500 text-sm">Manage your account preferences.</p>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        defaultValue="johndoe@example.com"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {/* Replaced Button with plain button */}
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 h-10 px-4 py-2">
                    Save Changes
                </button>
            </div>
        </div>
    )
}

export default function Profile() {
    const [activeSection, setActiveSection] = useState("overview")

    const renderSection = () => {
        switch (activeSection) {
            case "overview":
                return <ProfileOverview />
            case "book-reads":
                return <ProfileBookReads />
            case "wishlist":
                return <ProfileWishlist />
            case "settings":
                return <ProfileSettings />
            default:
                return <ProfileOverview />
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row min-h-[50vh]">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 border-b md:border-r md:border-b-0 p-4 space-y-2">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">My Account</h2>
                {/* Replaced Button with plain button, manually applying styles for active/inactive states */}
                <button
                    className={`w-full justify-start inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${activeSection === "overview"
                        ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        : "text-gray-700 hover:bg-gray-50"
                        }`}
                    onClick={() => setActiveSection("overview")}
                >
                    <Icon icon="lucide:layout-dashboard" className="mr-2 h-4 w-4" />
                    Overview
                </button>
                <button
                    className={`w-full justify-start inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${activeSection === "book-reads"
                        ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        : "text-gray-700 hover:bg-gray-50"
                        }`}
                    onClick={() => setActiveSection("book-reads")}
                >
                    <Icon icon="lucide:book-open" className="mr-2 h-4 w-4" />
                    Book Reads
                </button>
                <button
                    className={`w-full justify-start inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${activeSection === "wishlist"
                        ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        : "text-gray-700 hover:bg-gray-50"
                        }`}
                    onClick={() => setActiveSection("wishlist")}
                >
                    <Icon icon="lucide:heart" className="mr-2 h-4 w-4" />
                    Wishlist
                </button>
                <button
                    className={`w-full justify-start inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${activeSection === "settings"
                        ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        : "text-gray-700 hover:bg-gray-50"
                        }`}
                    onClick={() => setActiveSection("settings")}
                >
                    <Icon icon="lucide:settings" className="mr-2 h-4 w-4" />
                    Settings
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 md:p-8">
                {renderSection()}
            </div>
        </div>
    )
}
