import React, { useEffect, useState } from "react";

function Preloader() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // After 2.5 seconds, show the pop-up text
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1500); // Delay to show text after preloader

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 animate-gradient">
      <div className="flex flex-col items-center space-y-4">
        {/* Rotating and moving loader */}
        <div className="w-20 h-20 border-8 border-t-8 border-light-green rounded-full animate-spinAndMove"></div>

        {/* Short text for the pop-up effect */}
        {showText && (
          <p className="text-2xl text-white font-bold mt-4 transform scale-100 transition-all duration-700 opacity-100 animate-popUp">
            Your One Way PDF Solution
          </p>
        )}
      </div>
    </div>
  );
}

export default Preloader;
