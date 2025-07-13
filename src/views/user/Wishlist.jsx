import MainLayout from "./partials/MainLayout"

export default function Wishlist() {
    const wishlistItems = [
        { id: 1, title: "Dune", author: "Frank Herbert", image: "/placeholder.svg?height=100&width=70" },
        { id: 2, title: "The Lord of the Rings", author: "J.R.R. Tolkien", image: "/placeholder.svg?height=100&width=70" },
    ]
    return (
        <MainLayout>
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
        </MainLayout>
    )
}
