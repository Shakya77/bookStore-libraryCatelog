import { BookOpen, Truck, Shield, Star, Phone, Mail } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white ">
            {/* Newsletter */}
            <Newsletter />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {/* Categories */}
                    <Categories />

                    {/* Customer Support */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-white border-b border-gray-700 pb-2">Customer Support</h3>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm py-1">
                                Returns
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm py-1">
                                Shipping Info
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm py-1">
                                Contact Us
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm py-1">
                                FAQ
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-white border-b border-gray-700 pb-2">Get in Touch</h3>
                        <div className="space-y-3">
                            <a href={`tel:${import.meta.env.VITE_CONTACT_PHONE}`} className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">{import.meta.env.VITE_CONTACT_PHONE}</span>
                            </a>
                            <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`} className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">{import.meta.env.VITE_CONTACT_EMAIL}</span>
                            </a>
                        </div>
                    </div>

                    {/* Features */}
                    <Features />
                </div>
            </div>

            {/* Bottom */}
            <Bottom />
        </footer>
    )
}

function Features() {
    return (
        <div className="space-y-4 md:col-span-2 xl:col-span-1">
            <h3 className="font-semibold text-lg text-white border-b border-gray-700 pb-2">Why Shop With Us</h3>
            <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                    <Truck className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <div className="text-sm font-medium text-white">Free Shipping</div>
                        <div className="text-xs text-gray-400 mt-1">Free delivery on orders over $35</div>
                    </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                    <Shield className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <div className="text-sm font-medium text-white">Secure Shopping</div>
                        <div className="text-xs text-gray-400 mt-1">SSL encrypted checkout process</div>
                    </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                    <Star className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <div className="text-sm font-medium text-white">Highly Rated</div>
                        <div className="text-xs text-gray-400 mt-1">4.8/5 stars from 10k+ reviews</div>
                    </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <div className="text-sm font-medium text-white">Easy Returns</div>
                        <div className="text-xs text-gray-400 mt-1">30-day hassle-free returns</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Newsletter() {
    return (
        <div className="bg-indigo-600">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <Mail className="w-5 h-5" />
                        <span className="font-medium">Get book recommendations & deals</span>
                    </div>
                    <div className="flex w-full md:w-auto max-w-sm">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="flex-1 px-3 py-2 rounded-l text-gray-900 text-sm focus:outline-none"
                        />
                        <button className="bg-indigo-800 hover:bg-indigo-700 px-4 py-2 rounded-r text-sm font-medium transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


function Categories() {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white border-b border-gray-700 pb-2">Top Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm py-1">
                    Fiction
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm py-1">
                    Non-Fiction
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm py-1">
                    Children's Books
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm py-1">
                    Textbooks
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm py-1">
                    Romance
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm py-1">
                    Mystery & Thriller
                </a>
            </div>
        </div>
    )
}

function Bottom() {
    return (
        <div className="border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-indigo-400" />
                        <span className="font-bold text-indigo-400">KitabPath</span>
                    </div>
                    <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} KitabPath. All rights reserved.</p>
                    <div className="flex space-x-4 text-xs text-gray-400">
                        <a href="#" className="hover:text-white">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-white">
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}