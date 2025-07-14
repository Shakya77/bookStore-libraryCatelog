import { useState, useEffect } from "react"
import { Icon } from "@iconify/react" // Using Iconify for icons

const CategoryModal = ({ isOpen, onClose, onSubmit, category }) => {
    const [formData, setFormData] = useState({
        name: "",
        icon: null,
    })
    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || "",
                icon: category.icon || "",
            })
        } else {
            setFormData({
                name: "",
                icon: null,
            })
        }
    }, [category, isOpen])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
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
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleBackdropClick}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
                    <h2 className="text-xl font-bold text-gray-900">{category ? "Edit Category" : "Add New Category"}</h2>
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
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="name">
                            Category Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter author's full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="name">
                            Icon <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="icon"
                            name="icon"
                            type="text"
                            value={formData.icon}
                            onChange={handleChange}
                            placeholder="Enter icon name from iconify"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                        <button type="button" onClick={onClose}
                            className="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
                            Cancel
                        </button>
                        <button type="submit"
                            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm">
                            <Icon icon={category ? "mdi:pencil" : "mdi:plus"} className="w-4 h-4 inline mr-2" />
                            {category ? "Update Category" : "Create Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryModal
