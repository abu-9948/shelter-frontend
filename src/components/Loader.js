import React from 'react';

const Loader = ({ size = 200, className = '' }) => {
  return (
    <div className={`h-[40vw] flex items-center justify-center ${className}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 200 200" 
        width={size} 
        height={size}
        className="animate-fade-in"
      >
        {/* Main background shape with pulse animation */}
        <path 
          d="M30 100 L100 30 L170 100 Q170 170 100 170 Q30 170 30 100" 
          fill="#6366F1" 
          opacity="0.9"
          className="animate-pulse"
        />
        
        {/* Shelter shape with fade animation */}
        <path 
          d="M55 105 L100 60 L145 105 Q145 150 100 150 Q55 150 55 105" 
          fill="#CDD0F9" 
          opacity="0.95"
          className="animate-shelter"
        />
        
        {/* Search icon with rotating animation */}
        <g className="animate-search">
          <circle 
            cx="115" 
            cy="105" 
            r="15" 
            fill="none" 
            stroke="#6366F1" 
            strokeWidth="6"
          />
          <path 
            d="M125 115 L140 130" 
            stroke="#6366F1" 
            strokeWidth="6" 
            strokeLinecap="round"
          />
        </g>
        
        {/* Dots with sequential fade animation */}
        <g className="animate-dots">
          <circle cx="85" cy="105" r="4" fill="#6366F1" className="dot-1"/>
          <circle cx="100" cy="105" r="4" fill="#6366F1" className="dot-2"/>
          <circle cx="115" cy="105" r="4" fill="#6366F1" className="dot-3"/>
        </g>
        
        {/* Lines with slide animation */}
        <g className="animate-lines">
          <path 
            d="M60 120 L80 120" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          <path 
            d="M65 130 L75 130" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
        </g>
        
        {/* Accent shape with bounce animation */}
        <path 
          d="M140 70 Q150 60 160 70" 
          fill="none" 
          stroke="#4F46E5" 
          strokeWidth="4" 
          strokeLinecap="round"
          className="animate-accent"
        />
      </svg>
      
      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.02); opacity: 0.8; }
        }
        
        @keyframes rotate-search {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes dots {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        
        @keyframes slide {
          0% { transform: translateX(-10px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-pulse path {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-search {
          transform-origin: 115px 105px;
          animation: rotate-search 3s linear infinite;
        }
        
        .animate-dots circle {
          animation: dots 1.5s ease-in-out infinite;
        }
        
        .dot-1 { animation-delay: 0s; }
        .dot-2 { animation-delay: 0.2s; }
        .dot-3 { animation-delay: 0.4s; }
        
        .animate-lines path {
          animation: slide 1s ease-out infinite alternate;
        }
        
        .animate-accent {
          animation: bounce 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;