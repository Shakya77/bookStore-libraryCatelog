"use client"

import { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css" // Keep react-datepicker CSS for calendar styling
import { Icon } from "@iconify/react" // Using Iconify for icons

const BookModal = ({ isOpen, onClose, onSubmit, book }) => {
    const [formData, setFormData] = useState({
        title: "",
        published_at: null,
        description: "",
        coverImage: null,
        category: "", // Will store category ID
        author: "", // Will store author ID
    })
    const [imagePreview, setImagePreview] = useState(null)
    const [categories, setCategories] = useState([])
    const [authors, setAuthors] = useState([])

    // Fetch categories and authors from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Assuming a similar endpoint for categories
                const res = await fetch(`${import.meta.env.VITE_API_URL}/book/getCategories`)
                if (!res.ok) {
                    throw new Error("Failed to fetch categories")
                }
                const data = await res.json()
                setCategories(data.data) // Assuming data.data is an array like [{ id: 1, name: "Action" }]
            } catch (error) {
                console.error("Failed to load Categories:", error)
                // You might want to add a user-facing error message here
            }
        }

        const fetchAuthors = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/book/getAuthor`)
                if (!res.ok) {
                    throw new Error("Failed to fetch authors")
                }
                const data = await res.json()
                setAuthors(data.data) // Assuming data.data is an array like [{ id: 1, name: "J.K. Rowling" }]
            } catch (error) {
                console.error("Failed to load Authors:", error)
                // You might want to add a user-facing error message here
            }
        }

        fetchCategories()
        fetchAuthors()
    }, [isOpen]) // Empty dependency array means these run once on mount

    useEffect(() => {
        if (book) {
            const checkImage = `${book.image}`
            setFormData({
                title: book.title || "",
                published_at: book.published_at ? new Date(book.published_at) : null,
                description: book.description || "",
                coverImage: null,
                category: book.category || "", // Assuming book.category will be the ID
                author: book.author || "", // Assuming book.author will be the ID
            })
            if (checkImage !== "null" && book.image) {
                setImagePreview(book.image.startsWith("http") ? book.image : `/placeholder.svg?height=96&width=96`)
            }
        } else {
            setFormData({
                title: "",
                published_at: null,
                description: "",
                coverImage: null,
                category: "",
                author: "",
            })
            setImagePreview(null)
        }
    }, [book, isOpen])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleDateChange = (date) => {
        setFormData({ ...formData, published_at: date })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData({ ...formData, coverImage: file })
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setFormData({ ...formData, coverImage: null })
        setImagePreview(null)
        const fileInput = document.getElementById("coverImage")
        if (fileInput) fileInput.value = ""
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
                    <h2 className="text-xl font-bold text-gray-900">{book ? "Edit Book" : "Add New Book"}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors duration-200"
                        aria-label="Close modal"
                    >
                        <Icon icon="mdi:close" className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6" autoComplete="off">
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">Cover Picture</label>
                        {imagePreview && (
                            <div className="relative inline-block">
                                <img src={imagePreview || "/placeholder.svg?height=96&width=96"} alt="Cover preview"
                                    className="w-24 h-24 rounded-full object-cover border border-gray-200 shadow-sm" />
                                <button type="button" onClick={removeImage} title="Remove image"
                                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors duration-200">
                                    <Icon icon="mdi:close" className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        <div className="flex items-center space-x-3">
                            <label htmlFor="coverImage"
                                className="cursor-pointer bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg px-4 py-3 text-center transition-colors duration-200 flex-1">
                                <div className="flex flex-col items-center space-y-2">
                                    <Icon icon="mdi:image-plus-outline" className="w-6 h-6 text-gray-400" />
                                    <span className="text-sm text-gray-600">{imagePreview ? "Change Picture" : "Upload Picture"}</span>
                                </div>
                            </label>
                            <input
                                id="coverImage"
                                name="coverImage"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        <p className="text-xs text-gray-500">Recommended: Square image, max 5MB (JPG, PNG, GIF)</p>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="title">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter book's title"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 bg-white appearance-none pr-8"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="author" className="block text-sm font-semibold text-gray-700">
                                Author
                            </label>
                            <select id="author" name="author" value={formData.author} onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 bg-white appearance-none pr-8">
                                <option value="">Select an author</option>
                                {authors.map((auth) => (
                                    <option key={auth.id} value={auth.id}>
                                        {auth.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Published Date</label>
                        <div className="relative">
                            <DatePicker
                                selected={formData.published_at}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select a date"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 pr-10"
                                wrapperClassName="w-full"
                            />
                            <Icon
                                icon="mdi:calendar"
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Tell us about the book..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 resize-none"
                        />
                        <p className="text-xs text-gray-500">Optional: Brief description about the book</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
                        >
                            <Icon icon={book ? "mdi:pencil" : "mdi:plus"} className="w-4 h-4 inline mr-2" />
                            {book ? "Update book" : "Create book"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BookModal
