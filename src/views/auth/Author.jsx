import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { Icon } from "@iconify/react"
import toast, { Toaster } from "react-hot-toast"
import AuthorModal from "../modals/AuthorModal"
import DeleteModal from "../modals/DeleteModal"

const Author = () => {
    const [authors, setAuthors] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingAuthor, setEditingAuthor] = useState(null)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false) // New state for delete confirmation
    const [authorToDelete, setAuthorToDelete] = useState(null) // New state to store author to be deleted

    useEffect(() => {
        document.title = "Author"
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
            width: "300px",
        },
        {
            name: "Birthday",
            selector: (row) => row.birthday,
            width: "200px",
        },
        {
            name: "Bio",
            selector: (row) => row.bio,
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
            const response = await fetch(`http://127.0.0.1:8000/api/author/${authorToDelete.id}`, {
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
            const res = await fetch("http://127.0.0.1:8000/api/author/getAll")
            if (!res.ok) throw new Error("Failed to fetch")
            const data = await res.json()
            setAuthors(data.data)
            toast.success(`Loaded ${data.data.length} authors`, {
                id: "loading-authors",
            })
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
        setEditingAuthor(null)
        setIsModalOpen(true)
    }

    const handleEdit = (author) => {
        setEditingAuthor(author)
        setIsModalOpen(true)
    }

    const handleModalSubmit = async (formData) => {
        // Handle form submission logic here
        const payload = new FormData()
        payload.append("name", formData.name)
        if (formData.bio) payload.append("bio", formData.bio)
        if (formData.birthday)
            payload.append("birthday", formData.birthday.toISOString().split("T")[0])
        if (formData.profileImage) payload.append("profileImage", formData.profileImage)
        if (editingAuthor) payload.append("_method", "PUT")

        try {
            const response = await fetch(
                editingAuthor
                    ? `http://127.0.0.1:8000/api/author/${editingAuthor.id}` // PUT
                    : `http://127.0.0.1:8000/api/author/store`, // POST
                {
                    method: editingAuthor ? "POST" : "POST", // If Laravel, use POST and spoof PUT with `_method`
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

            toast.success(editingAuthor ? "Author updated!" : "Author created!")
            setIsModalOpen(false)
            setEditingAuthor(null)
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
        setEditingAuthor(null)
    }

    return (
        <div className="p-4 bg-white rounded shadow">
            <Toaster
                position="top-right"
                toastOptions={{
                    className: 'bg-gray-800 text-white px-4 py-2 rounded shadow-md',
                    duration: 4000,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: "#4ade80",
                            secondary: "#fff",
                        },
                    },
                    error: {
                        duration: 4000,
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "#fff",
                        },
                    },
                }}
            />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="text-xl font-semibold">Author List</h2>
                <button onClick={handleAddAuthor}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition w-full sm:w-auto justify-center sm:justify-start"
                >
                    <Icon icon="tabler:plus" width="18" />
                    <span>Add Author</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <DataTable
                    columns={columns}
                    data={authors}
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
                            <p className="text-gray-500">No authors found</p>
                        </div>
                    }
                />
            </div>

            <AuthorModal
                key={editingAuthor ? `edit-${editingAuthor.id}` : `add-${Date.now()}`} // Force remount
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                author={editingAuthor}
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

export default Author
