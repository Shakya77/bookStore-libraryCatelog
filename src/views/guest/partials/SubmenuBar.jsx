import { Icon } from "@iconify/react"
import { useState } from "react"
import BooksHoverMenu from "./BooksHoverMenu";



export function SubmenuBar() {
    const [isBooksHovered, setIsBooksHovered] = useState(false)

    return (
        <>
            <div className="hidden md:flex items-center space-x-6 mb-3">
                <button
                    className="flex items-center text-gray-700 hover:text-gray-900 font-medium"
                    onMouseEnter={() => {
                        setIsBooksHovered(true);
                    }}>
                    Books{" "}
                    <Icon
                        icon="lucide:chevron-down"
                        className={`ml-1 h-4 w-4 transition-transform ${isBooksHovered ? "rotate-180" : ""}`}
                    />
                </button>
                <button className="text-gray-700 hover:text-gray-900 font-medium">Deals</button>
            </div >

            {isBooksHovered && (
                <div className="" onMouseLeave={() => setIsBooksHovered(false)}>
                    <BooksHoverMenu />
                </div>
            )}
        </>
    )
}
