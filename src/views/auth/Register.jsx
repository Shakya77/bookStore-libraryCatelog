"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../redux/slices/AuthSlice"
import { useNavigate } from "react-router-dom"
import { Chrome } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import FormInput from "../../components/FormInput"
import FormCheckbox from "../../components/FormCheckbox"

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))

        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({
                ...prev,
                [name]: false,
            }))
        }
    }

    const validateForm = () => {
        const newFieldErrors = {}
        let hasErrors = false

        if (!formData.name.trim()) {
            newFieldErrors.name = true
            toast.error("Name is required")
            hasErrors = true
        }

        if (!formData.email.trim()) {
            newFieldErrors.email = true
            toast.error("Email is required")
            hasErrors = true
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newFieldErrors.email = true
            toast.error("Please enter a valid email address")
            hasErrors = true
        }

        if (formData.password.length < 6) {
            newFieldErrors.password = true
            toast.error("Password must be at least 6 characters long")
            hasErrors = true
        }

        if (formData.password !== formData.confirmPassword) {
            newFieldErrors.confirmPassword = true
            toast.error("Passwords do not match")
            hasErrors = true
        }

        if (!formData.acceptTerms) {
            toast.error("You must accept the terms and conditions")
            hasErrors = true
        }

        setFieldErrors(newFieldErrors)
        return !hasErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                console.log("Registration success:", data)
                localStorage.setItem("token", data.token)
                dispatch(login(true))
                toast.success("Account created successfully! Redirecting...")
                setTimeout(() => navigate("/dashboard"), 1000)
            } else {
                toast.error(data.message || "Registration failed. Please try again.")
            }
        } catch (error) {
            console.error("Network error:", error.message)
            toast.error("Network error. Please check your connection.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    className: 'bg-gray-800 text-white px-4 py-2 rounded shadow-md',
                    duration: 4000,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: "#4ade80",
                            secondary: "#fff",
                        },
                    },
                    error: {
                        duration: 4000,
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "#fff",
                        },
                    },
                }}
            />

            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-xl w-full grid grid-cols-1">
                    <div className="p-8 lg:p-12 flex flex-col justify-center">

                        {/* Welcome Section */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                            <p className="text-gray-600">Join KitabPath and start your reading journey today.</p>
                        </div>

                        {/* Register Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <FormInput
                                label="Full Name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                autoComplete="name"
                                hasError={fieldErrors.name}
                            />

                            {/* Email Field */}
                            <FormInput
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="john@example.com"
                                autoComplete="email"
                                hasError={fieldErrors.email}
                            />

                            {/* Password Field */}
                            <FormInput
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Create a strong password"
                                autoComplete="new-password"
                                hasError={fieldErrors.password}
                            />

                            {/* Confirm Password Field */}
                            <FormInput
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                                hasError={fieldErrors.confirmPassword}
                            />

                            {/* Terms and Conditions */}
                            <FormCheckbox
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleInputChange}
                                label={
                                    <>
                                        I agree to the{" "}
                                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                            Privacy Policy
                                        </a>
                                    </>
                                }
                            />

                            {/* Register Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </button>
                        </form>

                        {/* Login Link */}
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Already Have An Account?{" "}
                            <button onClick={() => navigate("/login")} className="font-medium text-blue-600 hover:text-blue-500">
                                Login Now.
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

