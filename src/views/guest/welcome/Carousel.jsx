"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { ShoppingBag, Star } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function Carousel() {
    const slides = [
        {
            id: 1,
            title: "Discover Your Next Great Read",
            subtitle: "Explore thousands of books across all genres",
            buttonText: "Shop Now",
            backgroundColor: "bg-blue-600",
        },
        {
            id: 2,
            title: "Summer Reading Sale",
            subtitle: "Up to 50% Off Selected Books",
            buttonText: "View Deals",
            backgroundColor: "bg-orange-500",
            badge: "Limited Time",
        },
        {
            id: 3,
            title: "New Arrivals This Week",
            subtitle: "Fresh releases from your favorite authors",
            buttonText: "Explore New Books",
            backgroundColor: "bg-green-600",
        },
        {
            id: 4,
            title: "Educational Excellence",
            subtitle: "Textbooks & Academic Resources",
            buttonText: "Browse Categories",
            backgroundColor: "bg-indigo-600",
        },
    ]

    return (
        <div className="">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={'auto'}
                navigation={{
                    prevEl: ".carousel-prev",
                    nextEl: ".carousel-next",
                }}
                grabCursor={true}
                pagination={{
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet w-3 h-3 bg-gray-400 mx-1",
                    bulletActiveClass: "swiper-pagination-bullet-active bg-blue-600",
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="rounded-lg"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className={`${slide.backgroundColor} text-white p-12 h-96 flex flex-col justify-center items-center text-center`}>
                            {slide.badge && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                                    <Star className="w-4 h-4 fill-current" />
                                    {slide.badge}
                                </div>
                            )}

                            <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                            <p className="text-xl mb-8 max-w-2xl">{slide.subtitle}</p>

                            <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                <ShoppingBag className="w-5 h-5" />
                                {slide.buttonText}
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
