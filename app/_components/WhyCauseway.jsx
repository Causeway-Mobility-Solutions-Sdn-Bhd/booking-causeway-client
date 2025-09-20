import TitleHead from '@/components/custom/TitleHead'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    <div className='max-w-[1400px] mx-auto w-[90%] sm:w-[95%] mt-[30px]'>
      <TitleHead name={'Why Choose Causeway'} />
     
      {/* Grid Layout - 4 columns on desktop, 2 columns on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 mt-5 sm:mt-8">
        {features.map((feature, index) => (
          <Card key={index} className="h-full gap-2 px-3 py-2 sm:py-5 sm:px-5">
            <CardHeader className="text-center gap-2">
              <div className="flex justify-center">
                <Image
                  src={feature.img}
                  alt={`${feature.title} icon`}
                  width={80}
                  height={80}
                  className="object-contain w-[50px] lg:w-[80px]"
                />
              </div>
              <CardTitle className="text-md sm:text-lg font-bold leading-[20px]">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-center w-full text-sm text-muted-foreground">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default WhyCauseway