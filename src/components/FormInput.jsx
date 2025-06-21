import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react'

export default function FormInput({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    required = false,
    autoComplete,
    hasError = false,
    className = "",
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false)
    const isPasswordType = type === "password"
    const inputType = isPasswordType && showPassword ? "text" : type

    return (
        <div className={`${className}`}>
            {/* Label */}
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {/* Input Container */}
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    autoComplete={autoComplete}
                    className={`
            w-full px-4 py-3 border rounded-lg transition-colors
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${isPasswordType ? "pr-12" : ""}
            ${hasError ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
          `}
                    {...props}
                />

                {/* Password Toggle Button */}
                {isPasswordType && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}
