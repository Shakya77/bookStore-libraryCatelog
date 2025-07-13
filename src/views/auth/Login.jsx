"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../redux/slices/AuthSlice"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import FormInput from "../../components/FormInput"

export default function Login() {
    const [formData, setFormData] = useState({
        email: "admin@gmail.com",
        password: "password",
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
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
                try {
                    const responseData = await fetch(`${import.meta.env.VITE_API_URL}/getinfo`, {
                        method: "GET",
                        headers: {
                            "Authorization": `${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                    })

                    const userData = await responseData.json();
                    console.log("User Data:", userData.user)

                    if (responseData.ok) {
                        localStorage.setItem("user", JSON.stringify(userData.user))
                        localStorage.setItem("role", JSON.stringify(userData.user.role))
                        if (userData.user.role === "admin") {
                            navigate("/admin")
                        } else {
                            navigate("/user")
                        }
                    }
                } catch (error) {
                    console.error("Network error:", error.message)
                    toast.error("Network error. Please check your connection.")
                } finally {
                    setIsLoading(false)
                }
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
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-xl w-full grid grid-cols-1 lg:grid-cols-1">
                    {/* Left Side - Login Form */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
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

                        {/* Register Link */}
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Don't Have An Account ?{" "}
                            <button onClick={() => navigate("/register")} className="font-medium text-blue-600 hover:text-blue-500">
                                Register Now.
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
