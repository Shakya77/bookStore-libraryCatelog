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
            const response = await fetch("http://127.0.0.1:8000/api/register", {
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

            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Side - Register Form */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        {/* Logo */}
                        <div className="flex items-center mb-12">
                            <span className="text-3xl font-bold text-indigo-600">KitabPath</span>
                        </div>

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

                        {/* Social Register */}
                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or Register With</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-3">
                                <button className="py-3 px-4 w-full inline-flex justify-center items-center border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                                    <Chrome className="w-5 h-5 mr-2" />
                                    Google
                                </button>
                            </div>
                        </div>

                        {/* Login Link */}
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Already Have An Account?{" "}
                            <button onClick={() => navigate("/login")} className="font-medium text-blue-600 hover:text-blue-500">
                                Login Now.
                            </button>
                        </p>
                    </div>

                    {/* Right Side - Welcome Preview */}
                    <RightSide />
                </div>
            </div>
        </>
    )
}

function RightSide() {
    return (
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">Join thousands of book lovers worldwide.</h2>
                <p className="text-blue-100 mb-8">
                    Create your account to access our vast library collection, track your reading progress, and connect with
                    fellow readers.
                </p>

                {/* Features Preview */}
                <div className="bg-white rounded-2xl p-6 text-gray-900 shadow-2xl">
                    {/* Features Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">What You'll Get</h3>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Free</div>
                    </div>

                    {/* Feature List */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div>
                                <div className="font-medium">Unlimited Book Access</div>
                                <div className="text-sm text-gray-500">Browse and borrow from 50,000+ titles</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div>
                                <div className="font-medium">Reading Analytics</div>
                                <div className="text-sm text-gray-500">Track your progress and reading habits</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div>
                                <div className="font-medium">Personalized Recommendations</div>
                                <div className="text-sm text-gray-500">Discover books tailored to your taste</div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">50K+</div>
                            <div className="text-xs text-gray-500">Books</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">25K+</div>
                            <div className="text-xs text-gray-500">Readers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">4.9</div>
                            <div className="text-xs text-gray-500">Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
            </div>
        </div>
    )
}
