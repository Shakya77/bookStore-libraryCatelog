"use client"

import { Icon } from "@iconify/react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export function CategorySwiper() {
    const categories = [
        {
            name: "Arts & Photography",
            icon: "mdi:palette",
            color: "bg-pink-100 text-pink-600",
            description: "Visual arts and photography",
        },
        {
            name: "Boxed Sets",
            icon: "mdi:package-variant",
            color: "bg-orange-100 text-orange-600",
            description: "Complete book collections",
        },
        {
            name: "Business and Investing",
            icon: "mdi:briefcase",
            color: "bg-amber-100 text-amber-600",
            description: "Business and finance guides",
        },
        {
            name: "Fiction and Literature",
            icon: "mdi:shield-outline",
            color: "bg-red-100 text-red-600",
            description: "Stories and classic literature",
        },
        {
            name: "Foreign Languages",
            icon: "mdi:translate",
            color: "bg-blue-100 text-blue-600",
            description: "Books in different languages",
        },
        {
            name: "History, Biography, and Politics",
            icon: "mdi:message-text",
            color: "bg-cyan-100 text-cyan-600",
            description: "Historical and biographical works",
        },
        {
            name: "Kids and Teens",
            icon: "mdi:emoticon-happy",
            color: "bg-pink-100 text-pink-600",
            description: "Books for young readers",
        },
        {
            name: "Learning and Reference",
            icon: "mdi:feather",
            color: "bg-gray-100 text-gray-600",
            description: "Educational and reference materials",
        },
        {
            name: "Lifestyle and Wellness",
            icon: "mdi:account-star",
            color: "bg-green-100 text-green-600",
            description: "Health and lifestyle guides",
        },
        {
            name: "Manga and Graphic Novels",
            icon: "mdi:lightning-bolt",
            color: "bg-blue-100 text-blue-600",
            description: "Comics and graphic stories",
        },
    ]

    return (
        <section className="">
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
                        640: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 5,
                        },
                        1280: {
                            slidesPerView: 6,
                        },
                    }}
                    className="category-swiper">
                    {categories.map((category, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex-shrink-0 text-center group w-full outline-none border-none cursor-pointer">
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
