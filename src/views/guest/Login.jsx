"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../redux/slices/AuthSlice"
import { useNavigate } from "react-router-dom"
import { Chrome } from 'lucide-react'
import toast, { Toaster } from "react-hot-toast"
import FormInput from "../../components/FormInput"

export default function Login() {
    const [formData, setFormData] = useState({
        email: "admin@gmail.com",
        password: "admin123",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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

        if (!formData.email.trim()) {
            newFieldErrors.email = true
            toast.error("Email is required")
            hasErrors = true
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newFieldErrors.email = true
            toast.error("Please enter a valid email address")
            hasErrors = true
        }

        if (!formData.password.trim()) {
            newFieldErrors.password = true
            toast.error("Password is required")
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
        setFieldErrors({})

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                console.log("Login success:", data)
                localStorage.setItem("token", data.token)
                dispatch(login(true))
                toast.success("Login successful! Redirecting...")
                setTimeout(() => navigate("/dashboard"), 1000)
            } else {
                toast.error(data.message || "Login failed. Please try again.")
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
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: '#4ade80',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        duration: 4000,
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />

            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Side - Login Form */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        {/* Logo */}
                        <div className="flex items-center mb-12">
                            <span className="text-3xl font-bold text-indigo-600">KitabPath</span>
                        </div>

                        {/* Welcome Section */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                            <p className="text-gray-600">Enter your email and password to access your account.</p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <FormInput
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="sellostore@company.com"
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
                                placeholder="Sellostore."
                                autoComplete="current-password"
                                hasError={fieldErrors.password}
                            />

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                        Forgot Your Password?
                                    </a>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Logging in..." : "Log In"}
                            </button>
                        </form>

                        {/* Social Login */}
                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or Login With</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-3">
                                <button className="py-3 px-4 w-full inline-flex justify-center items-center border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                                    <Chrome className="w-5 h-5 mr-2" />
                                    Google
                                </button>
                            </div>
                        </div>

                        {/* Register Link */}
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Don't Have An Account ?{" "}
                            <button onClick={() => navigate("/register")} className="font-medium text-blue-600 hover:text-blue-500">
                                Register Now.
                            </button>
                        </p>
                    </div>

                    {/* Right Side - Dashboard Preview */}
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
                <h2 className="text-3xl font-bold mb-4">Discover and manage your library collection.</h2>
                <p className="text-blue-100 mb-8">
                    Log in to access your personalized catalog, borrow history, and recommendations.
                </p>

                {/* Dashboard Preview */}
                <div className="bg-white rounded-2xl p-6 text-gray-900 shadow-2xl">
                    {/* Dashboard Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-4">
                            <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">Top Reads</div>
                            <div className="text-gray-500 px-3 py-1 rounded text-sm">Genres</div>
                            <div className="text-gray-500 px-3 py-1 rounded text-sm">Authors</div>
                        </div>
                        <div className="text-sm text-gray-500">Monthly</div>
                    </div>

                    {/* Metrics Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-600 text-white p-4 rounded-lg">
                            <div className="text-2xl font-bold">12,345</div>
                            <div className="text-blue-100 text-sm">Books Cataloged</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">7.8K</div>
                            <div className="text-gray-500 text-sm">Active Readers</div>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-semibold">Trending Titles</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                            </div>
                        </div>
                        <div className="h-20 bg-gradient-to-r from-blue-100 to-green-100 rounded flex items-end justify-center">
                            <div className="text-xs text-gray-500">Graph of most borrowed books</div>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Reader Activity</div>
                            <div className="space-y-1">
                                <div className="text-xs text-gray-600">● Daily Logins</div>
                                <div className="text-xs text-gray-600">● Books Borrowed</div>
                                <div className="text-xs text-gray-600">● Reviews Added</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">89%</div>
                            <div className="text-sm text-gray-500">User Engagement</div>
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-2">
                                High
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full"></div>
            </div>
        </div>
    )
}
