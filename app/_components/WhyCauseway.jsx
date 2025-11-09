import React from 'react'

const TitleHead = ({ name }) => (
  <h2 className="text-[20px] lg:text-[28px] font-bold text-gray-900 mb-4">{name}</h2>
)

const Image = ({ src, alt, width, height, className }) => (
  <img src={src} alt={alt} width={width} height={height} className={className} />
)

function WhyCauseway() {
  const features = [
    {
      img: '/whyCauseway/why-couseway-01.webp',
      title: "Book now pay later",
      description: "Unlock exclusive car rental prices for your booked flights or hotels"
    },
    {
      img: '/whyCauseway/why-couseway-02.webp',
      title: "24/7 Support",
      description: "We answer your call within 30 seconds, ensuring reliable support throughout your journey"
    },
    {
      img: '/whyCauseway/why-couseway-03.webp',
      title: "Quality Vehicles",
      description: "Well-maintained, modern vehicles from trusted suppliers across destinations"
    },
    {
      img: '/whyCauseway/why-couseway-04.webp',
      title: "Easy Booking",
      description: "Simple and fast booking process - reserve your vehicle in just a few clicks"
    },
    {
      img: '/whyCauseway/why-couseway-05.webp',
      title: "Free Cancellation",
      description: "Flexible cancellation policy - plan your trip with ease and peace of mind"
    },
    {
      img: '/whyCauseway/why-couseway-06.webp',
      title: "New Vehicles Policy",
      description: "Drive with confidence in our regularly updated fleet of latest model vehicles"
    }
  ]

  return (
    <div className='max-w-[1400px] mx-auto w-[90%] sm:w-[95%] mt-[7px]'>
      <TitleHead name={'Why Choose Causeway'} />
     
      
      <div className="flex flex-col gap-3 mt-3 sm:mt-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2.5">
            
            <div className="flex-shrink-0 -mt-1">
              <Image
                src={feature.img}
                alt={`${feature.title} icon`}
                width={60}
                height={60}
                quality={100}
                priority={index < 2}
                className="object-contain w-[52px] sm:w-[58px] md:w-[60px]"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-sm sm:text-[15px] md:text-base font-semibold text-gray-900 mb-0.5">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-[13px] md:text-sm text-gray-600 leading-relaxed">
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