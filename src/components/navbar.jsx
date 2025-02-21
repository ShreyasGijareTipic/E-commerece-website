import { Link} from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          E-Commerce
        </Link>

        <div className="hidden md:flex space-x-6 text-lg items-center">
        <li>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Products
          </Link>
        </li>
      </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <ul className="flex flex-col space-y-4 py-4 text-center">
            <li>
              <Link to="/" className="text-white hover:text-blue-400" onClick={() => setIsOpen(false)}>
                Products
              </Link>
            </li>
          </ul>

          
        </div>
      )}
    </nav>
  );
};

export default Navbar;
