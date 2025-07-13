import { useEffect, useState } from "react";
import { BookCard } from "../components/BookCard";
import Carousel from "./guest/welcome/Carousel";
import Popular from "./guest/welcome/Popular";
import FeaturedAuthors from "./guest/welcome/FeaturedAuthors";
import { CategorySwiper } from "./guest/partials/CategorySwiper";

const sampleBooks = [
    {
        id: "1",
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        price: 16.99,
        originalPrice: 19.99,
        rating: 4.5,
        reviewCount: 2847,
        image: "/placeholder.svg?height=200&width=150",
        category: "Fiction",
        description:
            "A captivating novel about a reclusive Hollywood icon who finally decides to tell her story to a young journalist. This sweeping tale of ambition, love, and sacrifice spans decades and reveals the price of fame. Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself.",
        pages: 400,
        publisher: "Atria Books",
        publishDate: "June 13, 2017",
        isbn: "978-1501161933",
        language: "English",
        format: ["Hardcover", "Paperback", "eBook", "Audiobook"],
        isWishlisted: true,
    },
    {
        id: "2",
        title: "Atomic Habits",
        author: "James Clear",
        price: 18.99,
        rating: 4.8,
        reviewCount: 5632,
        image: "/placeholder.svg?height=200&width=150",
        category: "Self-Help",
        description:
            "An easy and proven way to build good habits and break bad ones. This book provides practical strategies for forming good habits, breaking bad ones, and mastering the tiny behaviors that lead to remarkable results. No matter your goals, Atomic Habits offers a proven framework for improving every day.",
        pages: 320,
        publisher: "Avery",
        publishDate: "October 16, 2018",
        isbn: "978-0735211292",
        language: "English",
        format: ["Hardcover", "Paperback", "eBook", "Audiobook"],
    },
    {
        id: "3",
        title: "The Thursday Murder Club",
        author: "Richard Osman",
        price: 15.99,
        originalPrice: 17.99,
        rating: 4.3,
        reviewCount: 1923,
        image: "/placeholder.svg?height=200&width=150",
        category: "Mystery",
        description:
            "Four unlikely friends meet weekly to investigate cold cases. When a real murder occurs in their retirement community, they find themselves in the middle of their first live case. In a peaceful retirement village, four unlikely friends meet weekly in the Jigsaw Room to discuss unsolved crimes; together they call themselves the Thursday Murder Club.",
        pages: 368,
        publisher: "Pamela Dorman Books",
        publishDate: "September 3, 2020",
        isbn: "978-0525557814",
        language: "English",
        format: ["Hardcover", "Paperback", "eBook"],
    },
    {
        id: "4",
        title: "Educated",
        author: "Tara Westover",
        price: 17.99,
        rating: 4.6,
        reviewCount: 3456,
        image: "/placeholder.svg?height=200&width=150",
        category: "Biography",
        description:
            "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University. A story about the struggle for self-invention and the power of education. Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom.",
        pages: 334,
        publisher: "Random House",
        publishDate: "February 20, 2018",
        isbn: "978-0399590504",
        language: "English",
        format: ["Hardcover", "Paperback", "eBook", "Audiobook"],
    },
    {
        id: "5",
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 14.99,
        rating: 4.2,
        reviewCount: 2134,
        image: "/placeholder.svg?height=200&width=150",
        category: "Fiction",
        description:
            "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. A novel about all the choices that go into a life well-lived. When Nora Seed finds herself faced with the possibility of changing her life for a new one, following a different career, undoing old breakups, realizing her dreams of becoming a glaciologist.",
        pages: 288,
        publisher: "Viking",
        publishDate: "August 13, 2020",
        isbn: "978-0525559474",
        language: "English",
        format: ["Hardcover", "Paperback", "eBook"],
        isWishlisted: true,
    },
    {
        id: "6",
        title: "Sapiens",
        author: "Yuval Noah Harari",
        price: 19.99,
        rating: 4.7,
        reviewCount: 4521,
        image: "/placeholder.svg?height=200&width=150",
        category: "History",
        description:
            "A brief history of humankind. From the Stone Age to the Silicon Age, this book explores how Homo sapiens came to dominate the world and what our future might hold. How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities and kingdoms?",
        pages: 464,
        publisher: "Harper",
        publishDate: "February 10, 2015",
        isbn: "978-0062316097",
        language: "English",
        format: ["Hardcover", "Paperback", "eBook", "Audiobook"],
    },
    {
        id: "7",
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 16.99,
        originalPrice: 18.99,
        rating: 4.4,
        reviewCount: 2876,
        image: "/placeholder.svg?height=200&width=150",
        category: "Thriller",
        description:
            "A woman's act of violence against her husband and her refusal to speak sends shockwaves through London. The price of her art skyrockets, and she, the silent patient, is hidden away from the tabloids and spotlight at the Grove, a secure forensic unit in North London.",
        pages: 336,
        publisher: "Celadon Books",
        publishDate: "February 5, 2019",
        isbn: "978-1250301697",
        language: "English",
        format: ["Hardcover", "Paperback", "eBook", "Audiobook"],
    },
    {
        id: "8",
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        price: 15.99,
        rating: 4.5,
        reviewCount: 3987,
        image: "/placeholder.svg?height=200&width=150",
        category: "Fiction",
        description:
            "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl.",
        pages: 384,
        publisher: "G.P. Putnam's Sons",
        publishDate: "August 14, 2018",
        isbn: "978-0735219090",
        language: "English",
        format: ["Hardcover", "Paperback", "eBook", "Audiobook"],
    },
]

export default function Welcome() {
    useEffect(() => {
        document.title = "BOOK STORE / LIBRARY CATALOG - Welcome";
    }, []);

    const [currentView, setCurrentView] = useState();
    const [selectedBook, setSelectedBook] = useState();

    const handleViewProduct = (bookId) => {
        const book = sampleBooks.find((b) => b.id === bookId)
        if (book) {
            setSelectedBook(book)
            setCurrentView("product")
        }
    }

    return (
        <div className="flex flex-col gap-10 z-0">
            <Carousel />
            <CategorySwiper />
            <Popular />
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6">
                {sampleBooks.map((book) => (
                    <BookCard key={book.id} {...book} onViewProduct={handleViewProduct} />
                ))}
            </div>
            <FeaturedAuthors />
        </div>
    )
}
