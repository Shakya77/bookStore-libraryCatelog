import { useState, useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css" // Keep react-datepicker CSS for calendar styling
import { Icon } from "@iconify/react" // Using Iconify for icons

const CategoryModal = ({ isOpen, onClose, onSubmit, author }) => {
    const [formData, setFormData] = useState({
        name: "",
        birthday: null,
        bio: "",
        profileImage: null,
    })
    const [imagePreview, setImagePreview] = useState(null)

    useEffect(() => {
        if (author) {
            var check = `${author.image}`
            setFormData({
                name: author.name || "",
                birthday: author.birthday ? new Date(author.birthday) : null,
                bio: author.bio || "",
                profileImage: null, // Profile image is not carried over from author object for security/upload reasons
            })
            if (check !== "null") {
                const baseUrl = `${import.meta.env.VITE_IMAGE_URL}/authors/${check}`;
                setImagePreview(baseUrl)
            }
        } else {
            setFormData({
                name: "",
                birthday: null,
                bio: "",
                profileImage: null,
            })
            setImagePreview(null)
        }
    }, [author, isOpen])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData({ ...formData, profileImage: file })
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setFormData({ ...formData, profileImage: null })
        setImagePreview(null)
        const fileInput = document.getElementById("profileImage")
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
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleBackdropClick}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
                    <h2 className="text-xl font-bold text-gray-900">{author ? "Edit Author" : "Add New Author"}</h2>
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
                        <label className="block text-sm font-semibold text-gray-700">Profile Picture</label>
                        {imagePreview && (
                            <div className="relative inline-block">
                                <img
                                    src={imagePreview || "/placeholder.svg"}
                                    alt="Profile preview"
                                    className="w-24 h-24 rounded-full object-cover border border-gray-200 shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors duration-200"
                                    title="Remove image"
                                >
                                    <Icon icon="mdi:close" className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        <div className="flex items-center space-x-3">
                            <label htmlFor="profileImage"
                                className="cursor-pointer bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg px-4 py-3 text-center transition-colors duration-200 flex-1"
                            >
                                <div className="flex flex-col items-center space-y-2">
                                    <Icon icon="mdi:image-plus-outline" className="w-6 h-6 text-gray-400" />
                                    <span className="text-sm text-gray-600">{imagePreview ? "Change Picture" : "Upload Picture"}</span>
                                </div>
                            </label>
                            <input
                                id="profileImage"
                                name="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        <p className="text-xs text-gray-500">Recommended: Square image, max 5MB (JPG, PNG, GIF)</p>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="name">
                            Full Name <span className="text-red-500">*</span>
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
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="bio">
                            Biography
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Tell us about the author..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 resize-none"
                        />
                        <p className="text-xs text-gray-500">Optional: Brief description about the author</p>
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
                            <Icon icon={author ? "mdi:pencil" : "mdi:plus"} className="w-4 h-4 inline mr-2" />
                            {author ? "Update Author" : "Create Author"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryModal
