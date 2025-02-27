// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import About from "./sections/About";
// import Skills from "./sections/Skills";
// import Projects from "./sections/Projects";
// import Contact from "./sections/Contacts";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Studies from "./sections/Studies";

// export default function App() {
//   const [activeDiv, setActiveDiv] = useState("innerdiv");

//   useEffect(() => {
//     const divs = ["innerdiv", "innerdiv2", "innerdiv3", "innerdiv4"];
//     let currentIndex = 0;

//     const interval = setInterval(() => {
//       currentIndex = (currentIndex + 1) % divs.length; // Cycle through the array
//       setActiveDiv(divs[currentIndex]);
//     }, 2000); // Change every 2000ms (2 seconds)

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, []);

//   return (
//     <Router>
//       <div className="min-h-screen maindiv flex flex-col place-items-center justify-center">
//         <div className={`mx-auto w-[80%] max-lg:w-[90%] relative ${activeDiv}`}>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<About />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/studies" element={<Studies />} />
//             <Route path="/skills" element={<Skills />} />
//             <Route path="/projects" element={<Projects />} />
//             <Route path="/contact" element={<Contact />} />
//           </Routes>
//           <Footer />
//         </div>
//       </div>
//     </Router>
//   );
// }

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contacts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Studies from "./sections/Studies";


export default function App() {
  return (
    <Router>
      <div className="min-h-screen maindiv flex flex-col place-items-center justify-center">
        <div className=" rounded-lg  mx-auto w-[80%] max-lg:w-[90%] relative  innerdiv">
        <Navbar />
          <Routes>
           
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/studies" element={<Studies />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer/>
        </div>
      </div>
    </Router>
  );
}
