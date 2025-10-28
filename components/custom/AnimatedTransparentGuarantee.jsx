"use client"
import React, { useState, useEffect } from 'react';
import { Headset, BadgeCheck } from 'lucide-react';

const AnimatedTransparentGuarantee = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const guaranteeItems = [
    {
      icon: "/icons/file-validation.svg",
      text: "Transport booking guarantee",
      isImage: true
    },
    {
      icon: Headset,
      text: "Rapid customer support",
      isImage: false
    },
    {
      icon: BadgeCheck,
      text: "Instant confirmation",
      isImage: false
    },
    {
      icon: "/icons/security.svg",
      text: "Comprehensive Insurance",
      isImage: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % guaranteeItems.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full text-center mt-2 relative h-8 overflow-hidden">
      <style jsx>{`
        @keyframes slideUpOut {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        
        @keyframes slideUpIn {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-slide-cycle {
          animation: slideUpOut 0.5s ease-in-out 2.5s forwards,
                     slideUpIn 0.5s ease-in-out 3s forwards;
        }
      `}</style>
      
      {guaranteeItems.map((item, index) => {
        const isActive = index === currentIndex;
        const isPrevious = index === (currentIndex - 1 + guaranteeItems.length) % guaranteeItems.length;
        
        return (
          <div
            key={index}
            className={`absolute inset-0 flex justify-center items-center gap-1 text-[14px] lg:text-[15px] transition-all duration-500 ease-in-out ${
              isActive
                ? 'translate-y-0 opacity-100'
                : isPrevious
                ? '-translate-y-full opacity-0'
                : 'translate-y-full opacity-0'
            }`}
          >
            {item.isImage ? (
              <img 
                src={item.icon} 
                alt="" 
                className="w-[18px] xl:w-[20px]"
              />
            ) : (
              <item.icon className="w-[18px] xl:w-[20px]" />
            )}
            <span>{item.text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedTransparentGuarantee;