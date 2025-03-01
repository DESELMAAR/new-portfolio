

import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4 absolute max-md:static w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-2xl font-bold">
          <img src="./logos.png" alt="logo" className="w-14  rounded-lg" />
        </h1>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none lg:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`lg:flex lg:space-x-4 lg:items-center ${
            isMenuOpen
              ? "block absolute z-50 top-16 left-0 w-full bg-black bg-opacity-90 p-4"
              : "hidden"
          }`}
        >
          <li>
            <Link to="/about" className="nav-link block py-2 text-white">
              About Me
            </Link>
          </li>
          <li>
            <Link to="/studies" className="nav-link block py-2 text-white">
              Studies
            </Link>
          </li>
          <li>
            <Link to="/skills" className="nav-link block py-2 text-white">
              Skills
            </Link>
          </li>
          <li>
            <Link to="/projects" className="nav-link block py-2 text-white">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link block py-2 text-white">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}



// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="p-4 absolute w-full top-0 z-50">
//       <div className=" mx-auto flex justify-between items-center">
//         <h1 className="text-white text-2xl font-bold">
//           <img src="./logos.png" alt="logo" className="w-14 rounded-lg" />
//         </h1>

//         <ul className="flex space-x-4">
//           <li>
//             <Link to="/about" className="nav-link">
//               About Me
//             </Link>
//           </li>
//           <li>
//             <Link to="/studies" className="nav-link">
//             Studies
//             </Link>
//           </li>
//           <li>
//             <Link to="/skills" className="nav-link">
//               Skills
//             </Link>
//           </li>
//           <li>
//             <Link to="/projects" className="nav-link">
//               Projects
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" className="nav-link">
//               Contact
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }