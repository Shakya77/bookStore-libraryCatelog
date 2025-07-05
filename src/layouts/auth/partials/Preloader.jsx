const Preloader = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div id="page-loader" className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
                {/* Spinner */}
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400"></div>
                {/* Loading Text */}
                <p className="mt-4 text-white text-lg font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default Preloader;
