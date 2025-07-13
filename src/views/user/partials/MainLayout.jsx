import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
    return (
        <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row min-h-[50vh]">
            {/* Sidebar Navigation */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 p-4 md:p-8">
                {children}
            </div>
        </div>
    )
}
