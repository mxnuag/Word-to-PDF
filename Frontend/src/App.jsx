import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloder";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    // Simulate loading time (e.g., fetching data, loading assets)
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide preloader after 3 seconds
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="transition-opacity duration-1000 opacity-100">
          <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
          <Home />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
