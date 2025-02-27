import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 absolute w-full top-0 z-50">
      <div className=" mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          <img src="./logos.png" alt="logo" className="w-14 rounded-lg" />
        </h1>

        <ul className="flex space-x-4">
          <li>
            <Link to="/about" className="nav-link">
              About Me
            </Link>
          </li>
          <li>
            <Link to="/studies" className="nav-link">
            Studies
            </Link>
          </li>
          <li>
            <Link to="/skills" className="nav-link">
              Skills
            </Link>
          </li>
          <li>
            <Link to="/projects" className="nav-link">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}