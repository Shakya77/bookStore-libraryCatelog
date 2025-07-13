import MainLayout from "./partials/MainLayout";

export default function BookRead() {

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
        <MainLayout>
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
        </MainLayout>
    )
}
