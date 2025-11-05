import TitleHead from '@/components/custom/TitleHead'
import Image from 'next/image'
import React from 'react'

function WhyCauseway() {
  const features = [
    {
      img: '/whyCauseway/why-couseway-01.webp',
      title: "Book now pay later",
      description: "Lorem Ipsum is simply dummy text"
    },
    {
      img: '/whyCauseway/why-couseway-02.webp',
      title: "24/7 Support",
      description: "Lorem Ipsum is simply dummy text"
    },
    {
      img: '/whyCauseway/why-couseway-03.webp',
      title: "Quality Vehicles",
      description: "Lorem Ipsum is simply dummy text"
    },
    {
      img: '/whyCauseway/why-couseway-04.webp',
      title: "Easy Booking",
      description: "Lorem Ipsum is simply dummy text"
    }
  ]

  return (
    <div className='max-w-[1400px] mx-auto w-[90%] sm:w-[95%] mt-[7px]'>
      <TitleHead name={'Why Choose Causeway'} />
     
      {/* Vertical List Layout */}
      <div className="flex flex-col gap-7 mt-5 sm:mt-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-5 sm:gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <Image
                src={feature.img}
                alt={`${feature.title} icon`}
                width={80}
                height={80}
                className="object-contain w-[70px] sm:w-[80px]"
              />
            </div>
            
            {/* Text Content */}
            <div className="flex-1 pt-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 ">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyCauseway