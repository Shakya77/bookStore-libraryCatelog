import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { Icon } from "@iconify/react"
import toast from "react-hot-toast"
import DeleteModal from "../modals/DeleteModal"
import BookModal from "../modals/BookModal"

export default function Book() {
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [editingCategory, setEditingCategory] = useState(null)

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false) // New state for delete confirmation
    const [authorToDelete, setAuthorToDelete] = useState(null) // New state to store author to be deleted

    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        document.title = "Category"
    }, [])

    const columns = [
        {
            name: "Sn",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Name",
            selector: (row) => row.title,
        },
        {
            name: "Description",
            selector: (row) => row.description,
        },
        {
            name: "published_at",
            selector: (row) => row.published_at,
        },
        {
            name: "author",
            selector: (row) => row.author,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex space-x-1 sm:space-x-2">
                    <button onClick={() => handleEdit(row)}
                        className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-50 rounded transition-colors"
                        title="Edit">
                        <Icon icon="tabler:edit" width="16" className="sm:w-[18px]" />
                    </button>
                    <button
                        onClick={() => handleDelete(row)} // Modified to open confirmation dialog
                        className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                    >
                        <Icon icon="tabler:trash" width="16" className="sm:w-[18px]" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            width: "200px",
        },
        {
            name: "Created At",
            selector: (row) => new Date(row.created_at).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
        },
    ]

    const handleDelete = (author) => {
        setAuthorToDelete(author)
        setShowDeleteConfirm(true)
    }

    const handleConfirmDelete = async () => {
        if (!authorToDelete) return

        toast.loading(`Deleting author ${authorToDelete.name}...`, { id: "deleting-author" })
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/category/${authorToDelete.id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                },
            })

            const result = await response.json()

            if (!response.ok) {
                toast.error(result.message || "Failed to delete author", { id: "deleting-author" })
                return
            }

            toast.success("Author deleted successfully!", { id: "deleting-author" })
            setShowDeleteConfirm(false)
            setAuthorToDelete(null)
            fetchCategory() // Refresh the list after deletion
        } catch (err) {
            console.error("Unexpected error during delete:", err)
            toast.error("Unexpected error occurred during deletion", { id: "deleting-author" })
        }
    }

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false)
        setAuthorToDelete(null)
    }

    const fetchCategory = async () => {
        toast.loading("Loading Category...", { id: "loading-category" })
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/book/getAll`)
            if (!res.ok) throw new Error("Failed to fetch")
            const data = await res.json()
            setCategory(data.data)
        } catch (error) {
            toast.error("Failed to load Category", {
                id: "loading-category",
            })
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const handleAddAuthor = () => {
        setEditingCategory(null)
        setIsModalOpen(true)
    }

    const handleEdit = (author) => {
        setEditingCategory(author)
        setIsModalOpen(true)
    }

    const handleModalSubmit = async (formData) => {
        // Handle form submission logic here
        const payload = new FormData()
        if (formData.title) payload.append("title", formData.title)
        if (formData.coverImage) payload.append("coverImage", formData.coverImage)
        if (formData.published_at) payload.append("published_at", formData.published_at.toISOString().split("T")[0])
        if (formData.description) payload.append("description", formData.description)
        if (formData.category) payload.append("category", formData.category)
        if (formData.author) payload.append("author", formData.author)
        if (editingCategory) payload.append("_method", "PUT")

        try {
            const response = await fetch(
                editingCategory
                    ? `${import.meta.env.VITE_API_URL}/category/${editingCategory.id}` // PUT
                    : `${import.meta.env.VITE_API_URL}/book/store`, // POST
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                    },
                    body: payload,
                }
            )

            const result = await response.json()

            if (!response.ok) {
                if (response.status === 422 && result.errors) {
                    Object.values(result.errors).flat().forEach((msg) => toast.error(msg))
                } else {
                    toast.error(result.message || "Something went wrong")
                }
                return
            }

            toast.success(editingCategory ? "Category updated!" : "Category created!")
            setIsModalOpen(false)
            setEditingCategory(null)
            fetchCategory()
        } catch (err) {
            console.error("Unexpected error:", err)
            toast.error("Unexpected error occurred")
        } finally {
            setLoading(false)
        };
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setEditingCategory(null)
    }


    const filteredCategory = category.filter((author) =>
        // Linear Search (also known as sequential search
        [author.name]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-4 bg-white rounded shadow">


            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="text-xl font-semibold">Book List</h2>

                <div className="flex items-center gap-5">
                    <input type="text" placeholder="Search by category name"
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border rounded" />
                    <button onClick={handleAddAuthor}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition w-full sm:w-auto justify-center sm:justify-start">
                        <Icon icon="tabler:plus" width="18" />
                        <span>Add Book</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <DataTable
                    columns={columns}
                    data={filteredCategory}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                    persistTableHead
                    dense={window.innerWidth < 768} // Make table more compact on mobile
                    customStyles={{
                        headRow: {
                            style: {
                                backgroundColor: "#f8f9fa",
                                fontWeight: "bold",
                                fontSize: "14px",
                            },
                        },
                        rows: {
                            style: {
                                fontSize: "13px",
                                minHeight: "48px",
                            },
                        },
                        cells: {
                            style: {
                                paddingLeft: "8px",
                                paddingRight: "8px",
                            },
                        },
                    }}
                    noDataComponent={
                        <div className="text-center py-8">
                            <Icon icon="tabler:users" width="48" className="text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">No Book found</p>
                        </div>
                    }
                />
            </div>

            <BookModal
                key={editingCategory ? `edit-${editingCategory.id}` : `add-${Date.now()}`} // Force remount
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                book={editingCategory}
            />

            {showDeleteConfirm && (
                <DeleteModal
                    isOpen={showDeleteConfirm}
                    onClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    authorName={authorToDelete?.name}
                />
            )}
        </div>
    )
}
