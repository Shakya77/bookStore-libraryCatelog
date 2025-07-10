import { Icon } from "@iconify/react"
import { useState } from "react"

const categories = [
    {
        name: "Fiction",
        subcategories: [
            "Literary Fiction",
            "Mystery & Thriller",
            "Romance",
            "Science Fiction",
            "Fantasy",
            "Historical Fiction",
            "Horror",
        ],
    },
    {
        name: "Non-Fiction",
        subcategories: [
            "Biography & Memoir",
            "History",
            "Science & Nature",
            "Self-Help",
            "Business",
            "Health & Fitness",
            "Travel",
        ],
    },
    {
        name: "Academic",
        subcategories: ["Textbooks", "Reference", "Research", "Professional", "Study Guides"],
    },
    {
        name: "Children's",
        subcategories: ["Picture Books", "Early Readers", "Middle Grade", "Young Adult", "Educational"],
    },
    {
        name: "Genres",
        subcategories: ["Poetry", "Drama", "Essays", "Comics & Graphic Novels", "Art & Design"],
    },
]

export function SubmenuBar() {
    const [activeDropdown, setActiveDropdown] = useState(null)

    const handleDropdownToggle = (categoryName) => {
        setActiveDropdown(activeDropdown === categoryName ? null : categoryName)
    }

    const handleSubcategoryClick = (subcategory) => {
        console.log(`Selected: ${subcategory}`)
        setActiveDropdown(null)
    }

    return (
        <div>
            <nav className="flex items-center space-x-1 py-2">
                <button className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                    All Books
                </button>

                {categories.map((category) => (
                    <div key={category.name} className="relative">
                        <button
                            onClick={() => handleDropdownToggle(category.name)}
                            className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors flex items-center gap-1"
                        >
                            {category.name}
                            <Icon
                                icon="mdi:chevron-down"
                                className={`w-3 h-3 transition-transform ${activeDropdown === category.name ? "rotate-180" : ""}`}
                            />
                        </button>

                        {activeDropdown === category.name && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                <div className="py-1">
                                    {category.subcategories.map((subcategory, index) => (
                                        <div key={subcategory}>
                                            <button onClick={() => handleSubcategoryClick(subcategory)}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                                {subcategory}
                                            </button>
                                            {index === 2 && index < category.subcategories.length - 1 && (
                                                <div className="border-t border-gray-100 my-1"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                <button className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                    New Releases
                </button>

                <button className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                    Best Sellers
                </button>

                <button className="px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors font-medium">
                    Sale
                </button>
            </nav>

            {activeDropdown && (
                <div className="fixed inset-0 z-50" onClick={() => setActiveDropdown(null)}></div>
            )}
        </div>
    )
}
