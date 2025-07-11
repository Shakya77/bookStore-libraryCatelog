function FeaturedAuthors() {
    return (
        <section className="mb-16" >
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Featured Authors</h3>
                <p className="text-gray-600">Meet the brilliant minds behind your favorite stories</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        name: "Taylor Jenkins Reid",
                        books: "12 Books",
                        image: "/placeholder.svg?height=150&width=150",
                        bio: "Bestselling author known for compelling contemporary fiction and unforgettable characters.",
                    },
                    {
                        name: "James Clear",
                        books: "3 Books",
                        image: "/placeholder.svg?height=150&width=150",
                        bio: "Expert on habits, decision making, and continuous improvement. Author of Atomic Habits.",
                    },
                    {
                        name: "Michelle Obama",
                        books: "2 Books",
                        image: "/placeholder.svg?height=150&width=150",
                        bio: "Former First Lady, lawyer, and author of the bestselling memoir 'Becoming'.",
                    },
                ].map((author) => (
                    <div
                        key={author.name}
                        className="text-center p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                    >
                        <img
                            src={author.image || "/placeholder.svg"}
                            alt={author.name}
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                        />
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{author.name}</h4>
                        <p className="text-sm text-blue-600 mb-3">{author.books}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{author.bio}</p>
                        <button onClick={() => { }} className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
                            View Books
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeaturedAuthors
