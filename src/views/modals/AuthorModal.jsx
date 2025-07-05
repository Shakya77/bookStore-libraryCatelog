import { useState, useEffect } from "react";

const AuthorModal = ({ isOpen, onClose, onSubmit, author }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
    });

    useEffect(() => {
        if (author) {
            setFormData({
                name: author.name || "",
                email: author.email || "",
                phone: author.phone || "",
                company: author.company?.name || "",
            });
        } else {
            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
            });
        }
    }, [author]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            ></div>

            {/* Modal Content */}
            <div
                className="bg-white z-50 p-6 rounded-lg shadow-lg w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-semibold mb-4">
                    {author ? "Edit Author" : "Add Author"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                    <div>
                        <label className="block text-sm font-medium" htmlFor="name">Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium" htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium" htmlFor="phone">Phone</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium" htmlFor="bio">Bio</label>
                        <textarea name="bio" id="bio" className="w-full border rounded px-3 py-2 mt-1" rows={5}></textarea>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            {author ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthorModal;
