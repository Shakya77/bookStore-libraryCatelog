import MainLayout from "./partials/MainLayout";

export default function Settings() {
    return (
        <MainLayout>
            <div className="bg-white pt-6 rounded-lg">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
                    <p className="text-gray-500 text-sm">Manage your account preferences.</p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            defaultValue="johndoe@example.com"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {/* Replaced Button with plain button */}
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 h-10 px-4 py-2">
                        Save Changes
                    </button>
                </div>
            </div>
        </MainLayout>
    )
}