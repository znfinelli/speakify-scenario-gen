
import React, { useEffect, useState } from "react";

interface AnimatedBotProps {
  speaking?: boolean;
}

const AnimatedBot: React.FC<AnimatedBotProps> = ({ speaking = false }) => {
  const [blinkEyes, setBlinkEyes] = useState(false);
  
  // Set up blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkEyes(true);
      setTimeout(() => setBlinkEyes(false), 200);
    }, 3000 + Math.random() * 2000); // Random blinking between 3-5 seconds
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  return (
    <div className="w-32 h-32 relative">
      {/* Bot face */}
      <div className="absolute inset-0 bg-blue-500 rounded-full shadow-md flex items-center justify-center overflow-hidden">
        {/* Inner face */}
        <div className="w-[90%] h-[90%] bg-blue-400 rounded-full flex items-center justify-center">
          {/* Eyes container */}
          <div className="flex space-x-4 mb-2">
            {/* Left eye */}
            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div 
                className={`w-2 h-2 bg-black rounded-full transition-all duration-100 ${blinkEyes ? 'h-[1px]' : ''}`}
              ></div>
            </div>
            
            {/* Right eye */}
            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div 
                className={`w-2 h-2 bg-black rounded-full transition-all duration-100 ${blinkEyes ? 'h-[1px]' : ''}`}
              ></div>
            </div>
          </div>
          
          {/* Mouth */}
          <div 
            className={`w-10 h-${speaking ? '3' : '1'} bg-white rounded-full absolute bottom-7 transition-all duration-300 ${
              speaking ? 'animate-pulse' : ''
            }`}
          ></div>
          
          {/* Antenna */}
          <div className="absolute top-[-12px] w-1 h-5 bg-blue-600">
            <div className="w-2 h-2 rounded-full bg-red-500 absolute top-[-6px] left-[-2px]"></div>
          </div>
        </div>
      </div>
      
      {/* Speech ripples when speaking */}
      {speaking && (
        <>
          <div className="absolute inset-0 border-2 border-blue-300 rounded-full animate-ping opacity-30"></div>
          <div className="absolute inset-[-10px] border border-blue-200 rounded-full animate-ping opacity-20" style={{ animationDelay: "300ms" }}></div>
        </>
      )}
    </div>
  );
};

export default AnimatedBot;
