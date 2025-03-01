




import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contacts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Studies from "./sections/Studies";

export default function App() {
  const [backgroundClass, setBackgroundClass] = useState("innerdiv");

  const handleBackgroundChange = (className) => {
    setBackgroundClass(className);
  };

  return (
    <Router>
      <div className="min-h-screen maindiv flex flex-col place-items-center justify-center">
        <div className={`rounded-lg mx-auto w-[80%] max-lg:w-[90%] relative ${backgroundClass}`}>
          <Navbar />
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/studies" element={<Studies />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer onBackgroundChange={handleBackgroundChange} />
        </div>
      </div>
    </Router>
  );
}

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import About from "./sections/About";
// import Skills from "./sections/Skills";
// import Projects from "./sections/Projects";
// import Contact from "./sections/Contacts";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Studies from "./sections/Studies";


// export default function App() {
//   return (
//     <Router>
//       <div className="min-h-screen maindiv flex flex-col place-items-center justify-center">
//         <div className=" rounded-lg  mx-auto  w-[80%] max-lg:w-[90%] relative  innerdiv">
//         <Navbar />
//           <Routes>
           
//             <Route path="/" element={<About />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/studies" element={<Studies />} />
//             <Route path="/skills" element={<Skills />} />
//             <Route path="/projects" element={<Projects />} />
//             <Route path="/contact" element={<Contact />} />
//           </Routes>
//           <Footer/>
//         </div>
//       </div>
//     </Router>
//   );
// }
