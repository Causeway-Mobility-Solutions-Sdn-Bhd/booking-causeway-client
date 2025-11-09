import React from 'react'

// Mock TitleHead component
const TitleHead = ({ name }) => (
  <h2 className="text-[20px] lg:text-[28px] font-bold text-gray-900 mb-4">{name}</h2>
)

// Mock Image component (using img for demo)
const Image = ({ src, alt, width, height, className }) => (
  <img src={src} alt={alt} width={width} height={height} className={className} />
)

function WhyCauseway() {
  const features = [
     {
      img: '/whyCauseway/why-couseway-04.webp',
      title: "Book Now - Pay Later",
      description: "Unlock exclusive car rental prices for your booked flights or hotels"
    },
       {
      img: '/whyCauseway/why-couseway-03.webp',
      title: "CDW - 0 Excess Insurnace",
      description: "Drive with confidence in our regularly updated fleet of latest model vehicles"
    },
    {
      img: '/whyCauseway/why-couseway-06.webp',
      title: "Modern Fleets - Less Than 3 Years",
      description: "Well-maintained, modern vehicles from trusted suppliers across destinations"
    },
   
    {
      img: '/whyCauseway/why-couseway-05.webp',
      title: "Flexible - Free Cancelation",
      description: "Flexible cancellation policy - plan your trip with ease and peace of mind"
    },
 
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
                width={68}
                height={68}
                quality={100}
                priority={index < 2}
                className="object-contain w-[58px] sm:w-[64px] md:w-[68px]"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-[15px] sm:text-base md:text-[17px] font-semibold text-gray-900 mb-0.5">
                {feature.title}
              </h3>
              <p className="text-[13px] sm:text-sm md:text-[15px] text-gray-600 leading-relaxed">
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