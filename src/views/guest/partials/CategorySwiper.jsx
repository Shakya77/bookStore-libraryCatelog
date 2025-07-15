import { useState, useEffect } from "react"
import { Icon } from "@iconify/react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useNavigate } from "react-router-dom"

export function CategorySwiper() {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/welcome/category`) // ⬅️ Replace with your actual API endpoint
            const data = await response.json()
            setCategories(data.categories)
        } catch (error) {
            console.error("Failed to fetch categories:", error)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <section>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Category</h3>
                    <p className="text-gray-600">Browse Our Extensive Collection of Books Across Different Category.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="swiper-button-prev-custom w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:text-gray-300 disabled:cursor-not-allowed">
                        <Icon icon="mdi:chevron-left" className="w-5 h-5" />
                    </button>
                    <button className="swiper-button-next-custom w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:text-gray-300 disabled:cursor-not-allowed">
                        <Icon icon="mdi:chevron-right" className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="relative">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={2}
                    navigation={{
                        nextEl: ".swiper-button-next-custom",
                        prevEl: ".swiper-button-prev-custom",
                    }}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                        1280: { slidesPerView: 7 },
                    }}
                    className="category-swiper">
                    {categories.map((category, index) => (
                        <SwiperSlide key={index} onClick={() => (navigate(`/category/${category.slug}`))}>
                            <div className="flex-shrink-0 text-center group w-full outline-none border-none cursor-pointer p-2">
                                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                                    <Icon icon={category.icon} className="w-8 h-8" />
                                </div>
                                <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                                    {category.name}
                                </h4>
                                <div className="text-xs text-gray-500 leading-tight">{category.description}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}
