"use client"

import { Icon } from "@iconify/react"
import { useState } from "react"

export function BookCard({
    id,
    title,
    author,
    price,
    originalPrice,
    rating,
    reviewCount,
    image,
    category,
    isWishlisted = false,
    onViewProduct,
}) {
    const [wishlisted, setWishlisted] = useState(isWishlisted)

    const handleWishlist = () => {
        setWishlisted(!wishlisted)
    }

    const handleAddToCart = () => {
        console.log(`Added ${title} to cart`)
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <div className="p-4">
                <div className="">
                    <img
                        src={image || "/placeholder.svg?height=200&width=150"}
                        alt={title}
                        className="w-full h-48 object-cover rounded-md bg-gray-100 cursor-pointer"
                        onClick={() => onViewProduct(id)}
                    />
                    <button
                        onClick={handleWishlist}
                        className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full transition-colors"
                    >
                        <Icon
                            icon={wishlisted ? "mdi:heart" : "mdi:heart-outline"}
                            className={`w-4 h-4 ${wishlisted ? "text-red-500" : "text-gray-600"}`}
                        />
                    </button>
                    <span className="absolute top-2 left-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                        {category}
                    </span>
                </div>

                <div className="space-y-2">
                    <h3
                        className="font-semibold text-sm text-gray-900 line-clamp-2 leading-tight cursor-pointer hover:text-blue-600"
                        onClick={() => onViewProduct(id)}
                    >
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600">{author}</p>

                    <div className="flex items-center gap-1">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Icon
                                    key={i}
                                    icon="mdi:star"
                                    className={`w-3 h-3 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500">({reviewCount})</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">${price.toFixed(2)}</span>
                        {originalPrice && (
                            <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-4 pt-0 space-y-2">
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <Icon icon="mdi:cart-plus" className="w-4 h-4" />
                    Add to Cart
                </button>
                <button
                    onClick={() => onViewProduct(id)}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <Icon icon="mdi:eye" className="w-4 h-4" />
                    View Details
                </button>
            </div>
        </div>
    )
}
