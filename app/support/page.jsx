'use client'

import React from 'react'
import SideBar from '../_components/SideBar'
import Nav from '@/components/custom/Nav'
import BottomBar from '../_components/BottomBar'
import { ChevronRight } from 'lucide-react'

function page() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <Nav isMain={false} value="Support" />
      <SideBar />
      
      {/* Main Content */}
      <div className="pt-5 pb-10 px-4">
        {/* Support Header - Updated with correct typography */}
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
              onClick={() => window.open('https://wa.me/YOUR_WHATSAPP_NUMBER', '_blank')}
            >
              <div className="flex items-center space-x-3">
                <img src="/path/to/whatsapp-icon.png" alt="WhatsApp" className="w-6 h-6" style={{width: '24px', height: '24px'}} />
                <span className="text-[14px] font-normal leading-[20px] text-black" style={{fontFamily: 'Poppins'}}>WhatsApp</span>
              </div>
              <ChevronRight className="w-5 h-5 text-teal-500" />
            </div>

            {/* WeChat */}
            <div 
              className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 border-b border-gray-100"
              onClick={() => {
                // Add your WeChat contact logic here
                alert('WeChat ID: YOUR_WECHAT_ID')
              }}
            >
              <div className="flex items-center space-x-3">
                <img src="/path/to/wechat-icon.png" alt="WeChat" className="w-6 h-6" style={{width: '24px', height: '24px'}} />
                <span className="text-[14px] font-normal leading-[20px] text-black" style={{fontFamily: 'Poppins'}}>WeChat</span>
              </div>
              <ChevronRight className="w-5 h-5 text-teal-500" />
            </div>

            {/* Telegram */}
            <div 
              className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 border-b border-gray-100"
              onClick={() => window.open('https://t.me/YOUR_TELEGRAM_USERNAME', '_blank')}
            >
              <div className="flex items-center space-x-3">
                <img src="/path/to/telegram-icon.png" alt="Telegram" className="w-6 h-6" style={{width: '24px', height: '24px'}} />
                <span className="text-[14px] font-normal leading-[20px] text-black" style={{fontFamily: 'Poppins'}}>Telegram</span>
              </div>
              <ChevronRight className="w-5 h-5 text-teal-500" />
            </div>

            {/* Email */}
            <div 
              className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
              onClick={() => window.open('mailto:your-email@example.com', '_blank')}
            >
              <div className="flex items-center space-x-3">
                <img src="/path/to/email-icon.png" alt="Email" className="w-6 h-6" style={{width: '24px', height: '24px'}} />
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
              onClick={() => window.open('tel:+YOUR_PHONE_NUMBER', '_self')}
            >
              <div className="flex items-center space-x-3">
                <img src="/path/to/call-icon.png" alt="Call" className="w-6 h-6" />
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
              onClick={() => window.open('mailto:complaints@example.com', '_blank')}
            >
              <div className="flex items-center space-x-3">
                <img src="/path/to/email-icon.png" alt="Email" className="w-6 h-6" />
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
                <img src="/path/to/high-speed-support.png" alt="High Speed Customer Support" className="w-12 h-12 flex-shrink-0" style={{width: '48px', height: '48px'}} />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">High Speed Customer Support</h4>
                  <p className="text-gray-600 text-sm">
                    We usually reply to the chat rapidly, ensuring reliable support throughout your journey
                  </p>
                </div>
              </div>
            </div>

            {/* 24/7 Road Side Assistance */}
            <div className="mb-6">
              <div className="flex items-start space-x-4">
                <img src="/path/to/24-7-roadside.png" alt="24/7 Road Side Assistance" className="w-12 h-12 flex-shrink-0" style={{width: '48px', height: '48px'}} />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">24/7 Road Side Assistance</h4>
                  <p className="text-gray-600 text-sm">
                    We know travel can be unpredictable. That's why our team is available anytime to assist you
                  </p>
                </div>
              </div>
            </div>

            {/* Dedicated Rental Agent */}
            <div className="mb-2">
              <div className="flex items-start space-x-4">
                <img src="/path/to/dedicated-agent.png" alt="Dedicated Rental Agent" className="w-12 h-12 flex-shrink-0" style={{width: '48px', height: '48px'}} />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Dedicated Rental Agent</h4>
                  <p className="text-gray-600 text-sm">
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