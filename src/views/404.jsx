"use client"

import { Book, BookOpen, Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function NotFoundPage() {
    useEffect(() => {
        document.title = "404 - Not Found"
    }, [])

    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Decorative books */}
                <div className="flex justify-center items-end mb-8 space-x-2">
                    <div className="w-8 h-24 bg-red-500 rounded-t-sm transform rotate-12 shadow-md"></div>
                    <div className="w-8 h-28 bg-blue-600 rounded-t-sm transform -rotate-6 shadow-md"></div>
                    <div className="w-8 h-32 bg-green-500 rounded-t-sm transform rotate-3 shadow-md"></div>
                    <div className="w-8 h-24 bg-purple-500 rounded-t-sm transform rotate-12 shadow-md"></div>
                    <div className="w-8 h-32 bg-orange-500 rounded-t-sm transform rotate-6 shadow-md"></div>
                </div>

                {/* 404 with book icon */}
                <div className="flex items-center justify-center mb-6">
                    <span className="text-8xl font-bold text-gray-800 mr-4">4</span>
                    <BookOpen className="w-16 h-16 text-amber-700" />
                    <span className="text-8xl font-bold text-gray-800 ml-4">4</span>
                </div>

                {/* Main heading */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Page Not Found</h1>

                {/* Subheading with library theme */}
                <p className="text-xl text-gray-700 mb-2">Oops! This page seems to be checked out</p>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    The page you're looking for might have been moved to a different shelf, or it may no longer exist in our
                    collection.
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <Button onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </Button>

                    <Button variant="outline" onClick={() => navigate("/")}>
                        <Home className="w-4 h-4" />
                        Home
                    </Button>

                    <Button variant="outline" onClick={() => navigate(-1)}>
                        <Search className="w-4 h-4" />
                        Browse Books
                    </Button>
                </div>

                {/* Helpful suggestions */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
                        <Book className="w-5 h-5 text-amber-700" />
                        What can you do instead?
                    </h3>
                    <ul className="text-gray-600 space-y-2 text-left max-w-md mx-auto">
                        <li className="flex items-start gap-2">
                            <span className="text-amber-600 mt-1">•</span>
                            <span>Browse our featured book collections</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-amber-600 mt-1">•</span>
                            <span>Search for books by title, author, or genre</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-amber-600 mt-1">•</span>
                            <span>Check out our new arrivals and bestsellers</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-amber-600 mt-1">•</span>
                            <span>Visit our reading recommendations section</span>
                        </li>
                    </ul>
                </div>

                {/* Footer message */}
                <p className="text-sm text-gray-500 mt-8">
                    Need help finding something specific? Contact our librarians for assistance.
                </p>
            </div>
        </div>
    )
}
