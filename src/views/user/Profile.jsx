import MainLayout from "./partials/MainLayout"

export default function Profile() {
    return (
        <MainLayout>
            <div className="bg-white pt-6 rounded-lg">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Profile Overview</h2>
                    <p className="text-gray-500 text-sm">Summary of your account activity.</p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        {/* Replaced Avatar with plain div/img */}
                        <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            <img src="/placeholder.svg?height=80&width=80" alt="User Avatar" className="object-cover h-full w-full" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
                            <p className="text-gray-500 text-sm">johndoe@example.com</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 rounded-md">
                            <p className="text-sm text-gray-500">Books Read</p>
                            <p className="text-2xl font-bold text-gray-900">124</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-md">
                            <p className="text-sm text-gray-500">Wishlist Items</p>
                            <p className="text-2xl font-bold text-gray-900">18</p>
                        </div>
                    </div>
                    {/* Replaced Button with plain button */}
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 h-10 px-4 py-2">
                        Edit Profile
                    </button>
                </div>
            </div>
        </MainLayout>
    )
}
