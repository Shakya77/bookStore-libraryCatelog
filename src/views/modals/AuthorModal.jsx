"use client"

import { useState, useEffect } from "react"

const AuthorModal = ({ isOpen, onClose, onSubmit, author }) => {
    const [formData, setFormData] = useState({
        name: "",
        birthday: null,
        bio: "",
        profileImage: null,
    })
    const [imagePreview, setImagePreview] = useState(null)

    useEffect(() => {
        if (author) {
            setFormData({
                name: author.name || "",
                birthday: author.birthday ? new Date(author.birthday) : null,
                bio: author.bio || "",
                profileImage: null,
            })
            setImagePreview(author.profileImageUrl || null)
        } else {
            setFormData({
                name: "",
                birthday: null,
                bio: "",
                profileImage: null,
            })
            setImagePreview(null)
        }
    }, [author])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleDateChange = (date) => {
        setFormData({ ...formData, birthday: date })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData({ ...formData, profileImage: file })

            // Create preview URL
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
        // Reset file input
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
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            {/* Modal Content */}
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
                    <h2 className="text-xl font-bold text-gray-900">{author ? "Edit Author" : "Add New Author"}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors duration-200"
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6" autoComplete="off">
                    {/* Profile Image Upload */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">Profile Picture</label>

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="relative inline-block">
                                <img
                                    src={imagePreview || "/placeholder.svg"}
                                    alt="Profile preview"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors duration-200"
                                    title="Remove image"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {/* File Input */}
                        <div className="flex items-center space-x-3">
                            <label
                                htmlFor="profileImage"
                                className="cursor-pointer bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg px-4 py-3 text-center transition-colors duration-200 flex-1"
                            >
                                <div className="flex flex-col items-center space-y-2">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
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

                    {/* Name Field */}
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
                            required
                            placeholder="Enter author's full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
                        />
                    </div>

                    {/* Bio Field */}
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

                    {/* Modal Footer */}
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
                            {author ? (
                                <>
                                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                        />
                                    </svg>
                                    Update Author
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Create Author
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthorModal
