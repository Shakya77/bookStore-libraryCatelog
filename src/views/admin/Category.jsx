import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { Icon } from "@iconify/react"
import toast from "react-hot-toast"
import AuthorModal from "../modals/AuthorModal"
import DeleteModal from "../modals/DeleteModal"
import CategoryModal from "../modals/CategoryModal"

export default function Category() {
    const [authors, setAuthors] = useState([])
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
            selector: (row) => row.name,
        },
        {
            name: "Icon",
            selector: (row) => row.icon,
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
            fetchAuthors() // Refresh the list after deletion
        } catch (err) {
            console.error("Unexpected error during delete:", err)
            toast.error("Unexpected error occurred during deletion", { id: "deleting-author" })
        }
    }

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false)
        setAuthorToDelete(null)
    }

    const fetchAuthors = async () => {
        toast.loading("Loading authors...", { id: "loading-authors" })
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/category/getAll`)
            if (!res.ok) throw new Error("Failed to fetch")
            const data = await res.json()
            setAuthors(data.data)
        } catch (error) {
            toast.error("Failed to load authors", {
                id: "loading-authors",
            })
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAuthors()
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
        if (formData.name) payload.append("name", formData.name)
        if (formData.icon) payload.append("icon", formData.icon)
        if (editingCategory) payload.append("_method", "PUT")

        try {
            const response = await fetch(
                editingCategory
                    ? `${import.meta.env.VITE_API_URL}/category/${editingCategory.id}` // PUT
                    : `${import.meta.env.VITE_API_URL}/category/store`, // POST
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

            toast.success(editingCategory ? "Author updated!" : "Author created!")
            setIsModalOpen(false)
            setEditingCategory(null)
            fetchAuthors()
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


    const filteredAuthors = authors.filter((author) =>
        // Linear Search (also known as sequential search
        [author.name]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-4 bg-white rounded shadow">


            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="text-xl font-semibold">Category List</h2>

                <div className="flex items-center gap-5">
                    <input type="text" placeholder="Search by category name"
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border rounded" />
                    <button onClick={handleAddAuthor}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition w-full sm:w-auto justify-center sm:justify-start">
                        <Icon icon="tabler:plus" width="18" />
                        <span>Add Category</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <DataTable
                    columns={columns}
                    data={filteredAuthors}
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
                            <p className="text-gray-500">No Category found</p>
                        </div>
                    }
                />
            </div>

            <CategoryModal
                key={editingCategory ? `edit-${editingCategory.id}` : `add-${Date.now()}`} // Force remount
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                category={editingCategory}
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
