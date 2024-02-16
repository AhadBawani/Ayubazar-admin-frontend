import { useState, useRef } from 'react';
import { RiMenuAddFill } from 'react-icons/ri';

const Dropdown = ({ navigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300); // Delay in milliseconds
    };

    const clearTimeOut = () => clearTimeout(timeoutRef.current);

    const handleNavigation = (route) => {
        navigate(route);
        setIsOpen(false);
    }
    return (
        <div
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={clearTimeOut}
        >
            <RiMenuAddFill size={30} className="cursor-pointer" />
            {isOpen && (
                <div className="absolute right-0 z-10 w-40 bg-white shadow-md py-2 rounded-md mt-2 transition-opacity duration-300 opacity-100">
                    {/* Your options or component content here */}
                    <ul>
                        <li className="py-2 px-4
                         hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleNavigation('/add-product')}>
                            Add Product
                        </li>
                        <li className="py-2 px-4
                         hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleNavigation('/orders')}>
                            Orders
                        </li>
                        <li className="py-2 px-4
                         hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleNavigation('/reports')}>
                            Reports
                        </li>
                        <li className="py-2 px-4
                         hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleNavigation('/coupons')}>
                            Coupons
                        </li>
                        <li className="py-2 px-4
                         hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleNavigation('/blogs')}>
                            Blogs
                        </li>
                        <li className="py-2 px-4
                         hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleNavigation('/inventory')}>
                            Inventory
                        </li>
                        <li className="py-2 px-4
                         hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleNavigation('/create-offer')}>
                            Create Offer
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
