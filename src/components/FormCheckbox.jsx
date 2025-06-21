export default function FormCheckbox({ label, name, checked, onChange, required = false, className = "", ...props }) {
    return (
        <div className={`flex items-start ${className}`}>
            <input
                id={name}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                required={required}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                {...props}
            />
            {label && (
                <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
        </div>
    )
}
