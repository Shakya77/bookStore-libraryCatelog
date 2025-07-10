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
        <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            {/* Image Section */}
            <div>
                <img
                    src={image || "/placeholder.svg?height=200&width=150"}
                    alt={title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => onViewProduct(id)}
                />
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-3">
                <div>
                    <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-md">{category}</span>
                </div>

                <div>
                    <h3
                        title={title}
                        className="font-medium text-gray-900 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => onViewProduct(id)}
                    >
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{author}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Icon
                                key={i}
                                icon="ic:round-star"
                                className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500">({reviewCount})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg text-gray-900">${price.toFixed(2)}</span>
                    {originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <Icon icon="mdi:cart" className="w-4 h-4" />
                        Add to Cart
                    </button>
                    <button
                        onClick={() => onViewProduct(id)}
                        className="px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm transition-colors"
                    >
                        <Icon icon="mdi:eye" className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleWishlist}
                        className="px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm transition-colors"
                    >
                        <Icon
                            icon="mdi:heart"
                            className={`w-4 h-4 ${wishlisted ? "text-red-500" : "text-gray-400"}`}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}
