"use client"

import { useState } from "react"
import { Icon } from "@iconify/react"
// Removed: import Image from "next/image" // No longer needed for standard img tags

// Mock data for the menu with subcategories
const categories = [
    {
        name: "Arts and Photography",
        subcategories: ["All", "Architecture", "Art History", "Design", "Fashion", "Photography"],
    },
    {
        name: "Boxed Sets",
        subcategories: ["All", "Fiction Box Sets", "Non-Fiction Box Sets", "Children's Box Sets"],
    },
    {
        name: "Business and Investing",
        subcategories: [
            "All",
            "Business",
            "Finance",
            "Economics",
            "Marketing and Sales",
            "Management",
            "Money",
            "Investing",
        ],
    },
    {
        name: "Fiction and Literature",
        subcategories: ["All", "Classics", "Contemporary", "Fantasy", "Mystery", "Science Fiction", "Thriller"],
    },
    {
        name: "Foreign Languages",
        subcategories: ["All", "French", "German", "Japanese", "Spanish", "Nepali"],
    },
    {
        name: "History, Biography, and Social Science",
        subcategories: ["All", "Ancient History", "Biographies", "Sociology", "World History"],
    },
    {
        name: "Kids and Teens",
        subcategories: ["All", "Picture Books", "Young Adult", "Middle Grade", "Early Readers"],
    },
    {
        name: "Learning and Reference",
        subcategories: ["All", "Dictionaries", "Encyclopedias", "Study Guides", "Self-Help"],
    },
    {
        name: "Lifestyle and Wellness",
        subcategories: ["All", "Cooking", "Health", "Home & Garden", "Travel", "Self-Improvement"],
    },
    {
        name: "Manga and Graphic Novels",
        subcategories: ["All", "Action", "Fantasy Manga", "Romance Manga", "Shonen", "Shojo"],
    },
    {
        name: "Miscellaneous",
        subcategories: ["All", "Comics", "Humor", "Poetry", "True Crime"],
    },
]

const bestSellerBooks = [
    { title: "Atomic Habits", author: "James Clear", image: "/placeholder.svg?height=200&width=130" },
    {
        title: "IKIGAI",
        author: "The Japanese Secret to a Long and Happy Life",
        image: "/placeholder.svg?height=200&width=130",
    },
    { title: "The Bhagavad Gita", author: "", image: "/placeholder.svg?height=200&width=130" },
    { title: "The Power", author: "", image: "/placeholder.svg?height=200&width=130" },
]

const othersLinks = ["Bundle Deals", "Used Books", "Preorders", "Book Request"]

export default function BooksHoverMenu() {
    const [openCategory, setOpenCategory] = useState(null)

    const handleCategoryClick = (categoryName) => {
        setOpenCategory(openCategory === categoryName ? null : categoryName)
    }

    return (
        <div className="absolute left-0 right-0 top-full bg-white shadow-lg rounded-b-lg z-[100] py-6 px-8 ">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 max-h-[500px] overflow-y-scroll pr-4">
                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li key={category.name}>
                                <button
                                    onClick={() => handleCategoryClick(category.name)}
                                    className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md focus:outline-none"
                                >
                                    {category.name}{" "}
                                    {category.subcategories &&
                                        (openCategory === category.name ? (
                                            <Icon icon="lucide:chevron-up" className="h-4 w-4 text-gray-400" />
                                        ) : (
                                            <Icon icon="lucide:chevron-down" className="h-4 w-4 text-gray-400" />
                                        ))}
                                </button>
                                {openCategory === category.name && category.subcategories && (
                                    <ul className="ml-4 mt-1 space-y-1">
                                        {category.subcategories.map((subcat) => (
                                            <li key={subcat}>
                                                <button className="block w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-50 px-2 py-1 rounded-md text-sm focus:outline-none">
                                                    {subcat}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <div className="flex border-b mb-4">
                        <button className="px-4 py-2 text-sm font-semibold text-gray-900 border-b-2 border-gray-900 focus:outline-none">
                            Best Sellers
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none">
                            New Arrivals
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none">
                            Nepali Books
                        </button>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold mb-3">Popular</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {bestSellerBooks.map((book, index) => (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <div className="relative w-full max-w-[130px] h-[200px] mb-2 flex items-center justify-center">
                                        <img
                                            src={book.image || "/placeholder.svg?height=200&width=130"}
                                            alt={book.title}
                                            className="object-contain rounded-md shadow-sm max-h-full max-w-full"
                                            style={{ height: "100%", width: "100%" }}
                                        />
                                    </div>
                                    <p className="text-sm font-medium text-gray-800 line-clamp-2">{book.title}</p>
                                    {book.author && <p className="text-xs text-gray-500">{book.author}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <h3 className="text-md font-semibold mb-3">Others</h3>
                    <ul className="space-y-2">
                        {othersLinks.map((link) => (
                            <li key={link}>
                                <button className="block w-full text-left text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md focus:outline-none">
                                    {link}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
