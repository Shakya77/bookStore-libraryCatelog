"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import AuthorModal from "../modals/AuthorModal";

const Author = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState(null);

    useEffect(() => {
        document.title = "Author";
    }, []);

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            width: "80px",
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Phone",
            selector: (row) => row.phone,
            sortable: true,
        },
        {
            name: "Company",
            selector: (row) => row.company?.name || "N/A",
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEdit(row)}
                        className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                    >
                        <Icon icon="tabler:edit" width="18" />
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                    >
                        <Icon icon="tabler:trash" width="18" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            width: "120px",
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            toast.loading("Loading authors...", { id: "loading-authors" });

            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");

                if (!res.ok) throw new Error("Failed to fetch");

                const data = await res.json();
                setUsers(data);

                toast.success(`Loaded ${data.length} authors`, {
                    id: "loading-authors",
                });
            } catch (error) {
                toast.error("Failed to load authors", {
                    id: "loading-authors",
                });
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddAuthor = () => {
        setEditingAuthor(null);
        setIsModalOpen(true);
    };

    const handleEdit = (author) => {
        console.log(author);
        setEditingAuthor(author);
        setIsModalOpen(true);
        toast.success(`Editing ${author.name}`);
    };

    const handleDelete = async (id) => {
        const author = users.find((u) => u.id === id);
        if (window.confirm(`Delete "${author?.name}"?`)) {
            toast.loading("Deleting...", { id: `delete-${id}` });

            await new Promise((r) => setTimeout(r, 1000));

            setUsers(users.filter((u) => u.id !== id));
            toast.success(`Deleted "${author?.name}"`, {
                id: `delete-${id}`,
            });
        }
    };

    const handleModalSubmit = (formData) => {
        if (editingAuthor) {
            setUsers(users.map((u) => (u.id === editingAuthor.id ? { ...u, ...formData } : u)));
        } else {
            const newAuthor = {
                id: Math.max(...users.map((u) => u.id)) + 1,
                ...formData,
                company: { name: formData.company },
            };
            setUsers([...users, newAuthor]);
        }
        setIsModalOpen(false);
        setEditingAuthor(null);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingAuthor(null);
    };

    return (
        <div className="p-4 bg-white rounded shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Author List</h2>
                <button
                    onClick={handleAddAuthor}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                >
                    <Icon icon="tabler:plus" width="18" />
                    <span>Add Author</span>
                </button>
            </div>

            <DataTable
                columns={columns}
                data={users}
                progressPending={loading}
                pagination
                highlightOnHover
                striped
                responsive
                persistTableHead
                customStyles={{
                    headRow: {
                        style: {
                            backgroundColor: "#f8f9fa",
                            fontWeight: "bold",
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

            <AuthorModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                author={editingAuthor}
            />
        </div>
    );
};

export default Author;
