import { Book, BookOpen, Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Decorative books */}
                <div className="flex justify-center items-end mb-8 space-x-2">
                    <div className="w-8 h-24 bg-red-600 rounded-t-sm transform rotate-12 shadow-lg"></div>
                    <div className="w-8 h-28 bg-blue-700 rounded-t-sm transform -rotate-6 shadow-lg"></div>
                    <div className="w-8 h-32 bg-green-600 rounded-t-sm transform rotate-3 shadow-lg"></div>
                    <div className="w-8 h-24 bg-red-600 rounded-t-sm transform rotate-12 shadow-lg"></div>
                    <div className="w-8 h-32 bg-yellow-600 rounded-t-sm transform rotate-6 shadow-lg"></div>
                </div>

                {/* 404 with book icon */}
                <div className="flex items-center justify-center mb-6">
                    <span className="text-8xl font-bold text-amber-800 mr-4">4</span>
                    <BookOpen className="w-16 h-16 text-amber-700" />
                    <span className="text-8xl font-bold text-amber-800 ml-4">4</span>
                </div>

                {/* Main heading */}
                <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Page Not Found</h1>

                {/* Subheading with library theme */}
                <p className="text-xl text-amber-700 mb-2">Oops! This page seems to be checked out</p>
                <p className="text-lg text-amber-600 mb-8 max-w-md mx-auto">
                    The page you're looking for might have been moved to a different shelf, or it may no longer exist in our
                    collection.
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <Button
                        className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </Button>

                    <Button
                        variant="outline"
                        className="border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
                        onClick={() => navigate('/')}
                    >
                        <Home className="w-4 h-4" />
                        Home
                    </Button>

                    <Button
                        variant="outline"
                        className="border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
                        onClick={() => navigate(-1)}
                    >
                        <Search className="w-4 h-4" />
                        Browse Books
                    </Button>
                </div>

                {/* Helpful suggestions */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
                    <h3 className="text-lg font-semibold text-amber-800 mb-3 flex items-center justify-center gap-2">
                        <Book className="w-5 h-5" />
                        What can you do instead?
                    </h3>
                    <ul className="text-amber-700 space-y-2 text-left max-w-md mx-auto">
                        <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-1">•</span>
                            <span>Browse our featured book collections</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-1">•</span>
                            <span>Search for books by title, author, or genre</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-1">•</span>
                            <span>Check out our new arrivals and bestsellers</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-1">•</span>
                            <span>Visit our reading recommendations section</span>
                        </li>
                    </ul>
                </div>

                {/* Footer message */}
                <p className="text-sm text-amber-600 mt-8">
                    Need help finding something specific? Contact our librarians for assistance.
                </p>
            </div>
        </div>
    )
}
