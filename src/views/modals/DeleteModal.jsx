import { Icon } from "@iconify/react"

const DeleteModal = ({ isOpen, onClose, onConfirm, authorName }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto p-6 transform transition-all sm:my-8 sm:w-full">
                <div className="flex flex-col items-center text-center">
                    <Icon icon="tabler:alert-triangle" className="text-red-500 w-16 h-16 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        Are you sure you want to delete <span className="font-medium text-gray-700">{authorName}</span>? This action
                        cannot be undone.
                    </p>
                    <div className="flex justify-center gap-3 w-full">
                        <button onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                            Cancel
                        </button>
                        <button onClick={onConfirm}
                            className="flex-1 px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
