"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"
import { ChevronLeft, ChevronRight, ShoppingBag, Star, ArrowRight } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

export function PageCarousel() {
    const pages = [
        {
            id: 1,
            type: "hero",
            title: "Discover Your Next Great Read",
            subtitle: "Explore thousands of books across all genres",
            description: "From bestselling novels to educational masterpieces, find the perfect book for every moment.",
            buttonText: "Shop Now",
            backgroundImage: "/placeholder.svg?height=600&width=1200",
            backgroundColor: "bg-gradient-to-br from-blue-600 to-purple-700",
        },
        {
            id: 2,
            type: "promotion",
            title: "Summer Reading Sale",
            subtitle: "Up to 50% Off Selected Books",
            description: "Limited time offer on bestselling fiction, self-help, and educational books.",
            buttonText: "View Deals",
            backgroundImage: "/placeholder.svg?height=600&width=1200",
            backgroundColor: "bg-gradient-to-br from-orange-500 to-red-600",
            badge: "Limited Time",
        },
        {
            id: 3,
            type: "featured",
            title: "New Arrivals This Week",
            subtitle: "Fresh releases from your favorite authors",
            description: "Be the first to read the latest books from bestselling authors and emerging voices.",
            buttonText: "Explore New Books",
            backgroundImage: "/placeholder.svg?height=600&width=1200",
            backgroundColor: "bg-gradient-to-br from-green-600 to-teal-700",
        },
        {
            id: 4,
            type: "category",
            title: "Educational Excellence",
            subtitle: "Textbooks & Academic Resources",
            description: "Comprehensive collection of textbooks, study guides, and academic materials for all levels.",
            buttonText: "Browse Categories",
            backgroundImage: "/placeholder.svg?height=600&width=1200",
            backgroundColor: "bg-gradient-to-br from-indigo-600 to-blue-700",
        },
    ]

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                effect="fade"
                fadeEffect={{
                    crossFade: true,
                }}
                navigation={{
                    prevEl: ".page-carousel-prev",
                    nextEl: ".page-carousel-next",
                }}
                pagination={{
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet !w-3 !h-3 !bg-white/50 !opacity-100 !mx-2",
                    bulletActiveClass: "swiper-pagination-bullet-active !bg-white !scale-125",
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                loop={true}
                className="page-carousel h-full"
            >
                {pages.map((page) => (
                    <SwiperSlide key={page.id}>
                        <PageSlide page={page} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation */}
            <button className="page-carousel-prev absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all duration-300 group">
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
            <button className="page-carousel-next absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all duration-300 group">
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
                <div className="flex items-center gap-4 text-white/80 text-sm">
                    <span>01</span>
                    <div className="w-16 h-0.5 bg-white/30">
                        <div className="h-full bg-white animate-pulse"></div>
                    </div>
                    <span>04</span>
                </div>
            </div>
        </div>
    )
}

function PageSlide({ page }) {
    return (
        <div className={`relative w-full h-full flex items-center justify-center ${page.backgroundColor}`}>
            {/* Background Image Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
                {/* Badge */}
                {page.badge && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                        <Star className="w-4 h-4 fill-current" />
                        {page.badge}
                    </div>
                )}

                {/* Main Content */}
                <div className="space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        {page.title}
                    </h1>

                    <h2 className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto">
                        {page.subtitle}
                    </h2>

                    <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
                        {page.description}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-4">
                        <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                            <ShoppingBag className="w-5 h-5" />
                            {page.buttonText}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Stats or Additional Info */}
                <div className="flex items-center justify-center gap-8 mt-12 text-white/70">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white">10K+</div>
                        <div className="text-sm">Books Available</div>
                    </div>
                    <div className="w-px h-8 bg-white/30"></div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white">50K+</div>
                        <div className="text-sm">Happy Readers</div>
                    </div>
                    <div className="w-px h-8 bg-white/30"></div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white">4.8★</div>
                        <div className="text-sm">Average Rating</div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        </div >
    )
}
