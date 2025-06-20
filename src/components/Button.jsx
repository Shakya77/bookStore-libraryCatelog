export function Button({ variant = "default", children, className = "", ...props }) {
    const baseClasses =
        "px-6 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"

    const variantClasses = {
        default: "bg-amber-700 hover:bg-amber-800 text-white",
        outline: "border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white bg-transparent",
    }

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    )
}
