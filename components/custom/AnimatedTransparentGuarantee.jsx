"use client"
import React, { useState, useEffect } from 'react';
import { Shield, HeadphonesIcon, Lock, UserCheck } from 'lucide-react';

const AnimatedTransparentGuarantee = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

 const guaranteeItems = [
    {
      icon: Shield,
      text: "Transparent booking guarantee"
    },
    {
      icon: HeadphonesIcon,
      text: "24/7 Customer support"
    },
    {
      icon: Lock,
      text: "Secure payment protection"
    },
    {
      icon: UserCheck,
      text: "Professional drivers only"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % guaranteeItems.length
      );
    }, 3000); // Change every 3 seconds

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
        const Icon = item.icon;
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
            <Icon className="w-[18px] xl:w-[20px]" />
            <span>{item.text}</span>
          </div>
        );
      })}
    </div>
  );
};

// Alternative simpler version with pure Tailwind CSS
export const SimpleTailwindVersion = () => {
  return (
    <div className="w-full text-center mt-2 h-8 overflow-hidden">
      <div className="animate-pulse">
        <div className="flex justify-center items-center gap-1 text-[14px] lg:text-[12px] animate-bounce">
          <LiaCertificateSolid className="text-[25px] xl:text-[20px]" />
          <span>Transport booking guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTransparentGuarantee;