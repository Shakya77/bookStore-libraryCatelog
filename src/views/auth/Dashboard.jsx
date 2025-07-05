const Dashboard = () => {
    const header = (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome to your admin dashboard</p>
        </div>
    )

    return (
        <>
            {header}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-600">1,234</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Orders</h3>
                    <p className="text-3xl font-bold text-green-600">567</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Revenue</h3>
                    <p className="text-3xl font-bold text-purple-600">$12,345</p>
                </div>
            </div>

            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-400">New user registered</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-400">Order #1234 completed</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-400">Payment pending for order #1235</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
