'use client'

import React from 'react'
import SideBar from '../_components/SideBar'
import Nav from '@/app/_components/Nav'
import BottomBar from '../_components/BottomBar'
import { ChevronRight } from 'lucide-react'

function page() {
  return (
    <div className="relative min-h-screen bg-gray-50" style={{backgroundColor: '#f9fafb'}}>
      <Nav isMain={false} value="Contact Us"/>
      <SideBar />
      <div className="pt-5 pb-10 px-4">
      
        <div className="mt-1 mb-6">
          <h2 className="text-[21px] font-normal leading-[100%] tracking-[0%] text-black" style={{fontFamily: 'Poppins'}}>
            Support
          </h2>
        </div>

        {/* Booking Enquiry Section */}
        <div className="mb-6">
          <h3 className="text-[18px] font-bold leading-[28px] tracking-[2%] text-black mb-3" style={{fontFamily: 'Poppins'}}>Booking Enquiry</h3>
          <div className="bg-white rounded-lg shadow-sm">
            
            {/* WhatsApp */}
            <div 
              className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 border-b border-gray-100"
              onClick={() => window.open('https://wa.me/60166201542?text=Hello%20!%20Causeway%20Malaysia%20(Whatsapp)', '_blank')}
            >
              <div className="flex items-center space-x-3">
                <img src="/Support/whatsapp.png" alt="WhatsApp" className="w-6 h-6" style={{width: '24px', height: '24px'}} />
                <span className="text-[14px] font-normal leading-[20px] text-black" style={{fontFamily: 'Poppins'}}>WhatsApp</span>
              </div>
              <ChevronRight className="w-5 h-5 text-teal-500" />
            </div>

            {/* WeChat */}
            <div 
              className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 border-b border-gray-100"
              onClick={() => {
                
                alert('Wechat support is currently unavailable. Please use WhatsApp for assistance.')
              }}
            >
              <div className="flex items-center space-x-3">
                <img src="/Support/WeChat.png" alt="WeChat" className="w-6 h-6" style={{width: '24px', height: '24px'}} />
                <span className="text-[14px] font-normal leading-[20px] text-black" style={{fontFamily: 'Poppins'}}>WeChat</span>
              </div>
              <ChevronRight className="w-5 h-5 text-teal-500" />
            </div>

            {/* Telegram */}
            <div 
              className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 border-b border-gray-100"
              onClick={() => alert('Telegram support is currently unavailable. Please use WhatsApp for assistance.')}
            >
              <div className="flex items-center space-x-3">
                <img src="/Support/Telegram.svg" alt="Telegram" className="w-6 h-6" style={{width: '24px', height: '24px'}} />
                <span className="text-[14px] font-normal leading-[20px] text-black" style={{fontFamily: 'Poppins'}}>Telegram</span>
              </div>
              <ChevronRight className="w-5 h-5 text-teal-500" />
            </div>

            {/* Email */}
            <div 
              className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
              onClick={() => window.open('mailto:bookings@causeway.my', '_blank')}
            >
              <div className="flex items-center space-x-3">
                <img src="/Support/Email.png" alt="Email" className="w-6 h-6" style={{width: '24px', height: '24px'}} />
                <span className="text-[14px] font-normal leading-[20px] text-black" style={{fontFamily: 'Poppins'}}>Email</span>
              </div>
              <ChevronRight className="w-5 h-5 text-teal-500" />
            </div>
          </div>
        </div>

        {/* Road Side Assistance Section */}
        <div className="mb-6">
          <h3 className="text-[18px] font-bold leading-[28px] tracking-[2%] text-black mb-3" style={{fontFamily: 'Poppins'}}>Road Side Assistance</h3>
          <div className="bg-white rounded-lg shadow-sm">
            <div 
              className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
              onClick={() => window.open('tel:+6075354071', '_self')}
            >
              <div className="flex items-center space-x-3">
                <img src="/Support/Call.png" alt="Call" className="w-6 h-6" />
                <span className="text-[14px] font-normal leading-[20px] text-black" style={{fontFamily: 'Poppins'}}>Call</span>
              </div>
              <ChevronRight className="w-5 h-5 text-teal-500" />
            </div>
          </div>
        </div>

        {/* Complaints Section */}
        <div className="mb-6">
          <h3 className="text-[18px] font-bold leading-[28px] tracking-[2%] text-black mb-3" style={{fontFamily: 'Poppins'}}>Complaints</h3>
          <div className="bg-white rounded-lg shadow-sm">
            <div 
              className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
              onClick={() => window.open('mailto:Support@causeway.my', '_blank')}
            >
              <div className="flex items-center space-x-3">
                <img src="/Support/Email.png" alt="Email" className="w-6 h-6" />
                <span className="text-[14px] font-normal leading-[20px] text-black" style={{fontFamily: 'Poppins'}}>Email</span>
              </div>
              <ChevronRight className="w-5 h-5 text-teal-500" />
            </div>
          </div>
        </div>

        {/* What You Can Expect Section */}
        <div className="mb-8">
          <h3 className="text-[21px] font-normal leading-[100%] text-black mb-6" style={{fontFamily: 'Poppins', color: '#080206'}}>What You Can Expect</h3>
          <div className="bg-white rounded-lg shadow-sm p-4">
            
            {/* High Speed Customer Support */}
            <div className="mb-6">
              <div className="flex items-start space-x-4">
                <img src="/Support/customer.png" alt="High Speed Customer Support" className="w-12 h-12 flex-shrink-0" style={{width: '48px', height: '48px'}} />
                <div className="flex-1">
                  <h4 className="text-[16px] font-bold leading-[22px] text-black mb-2" style={{fontFamily: 'Poppins', color: '#080206'}}>High Speed Customer Support</h4>
                  <p className="text-[12px] font-normal leading-[18px]" style={{fontFamily: 'Poppins', color: '#404040'}}>
                    We usually reply to the chat rapidly, ensuring reliable support throughout your journey
                  </p>
                </div>
              </div>
            </div>

            {/* Divider Line 1 */}
            <div className="mb-6">
              <div className="w-full h-0 border-t border-gray-200" style={{borderColor: '#E6E6E6'}}></div>
            </div>

            {/* 24/7 Road Side Assistance */}
            <div className="mb-6">
              <div className="flex items-start space-x-4">
                <img src="/Support/road.png" alt="24/7 Road Side Assistance" className="w-12 h-12 flex-shrink-0" style={{width: '48px', height: '48px'}} />
                <div className="flex-1">
                  <h4 className="text-[16px] font-bold leading-[22px] text-black mb-2" style={{fontFamily: 'Poppins', color: '#080206'}}>24/7 Road Side Assistance</h4>
                  <p className="text-[12px] font-normal leading-[18px]" style={{fontFamily: 'Poppins', color: '#404040'}}>
                    We know travel can be unpredictable. That's why our team is available anytime to assist you
                  </p>
                </div>
              </div>
            </div>

            {/* Divider Line 2 */}
            <div className="mb-6">
              <div className="w-full h-0 border-t border-gray-200" style={{borderColor: '#E6E6E6'}}></div>
            </div>

            {/* Dedicated Rental Agent */}
            <div className="mb-2">
              <div className="flex items-start space-x-4">
                <img src="/Support/agent.png" alt="Dedicated Rental Agent" className="w-12 h-12 flex-shrink-0" style={{width: '48px', height: '48px'}} />
                <div className="flex-1">
                  <h4 className="text-[16px] font-bold leading-[22px] text-black mb-2" style={{fontFamily: 'Poppins', color: '#080206'}}>Dedicated Rental Agent</h4>
                  <p className="text-[12px] font-normal leading-[18px]" style={{fontFamily: 'Poppins', color: '#404040'}}>
                    Each customer is paired with a rental specialist who remains your point of contact
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomBar />
    </div>
  )
}

export default page