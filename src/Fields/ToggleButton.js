import React, { useState } from 'react';

function ToggleButton({ onToggle, title, defaultValue }) {
     const [isCODAvailable, setIsCODAvailable] = useState(defaultValue);

     const handleToggle = () => {
          const newState = !isCODAvailable;
          setIsCODAvailable(newState);
          onToggle(newState); // Pass the new state to the parent
     };

     return (
          <div className="flex flex-col">
               {/* COD label */}
               <span className="text-gray-700 mb-2">{title}</span>

               {/* Toggle button */}
               <label className="flex items-center cursor-pointer">
                    <div className="relative">
                         <input
                              type="checkbox"
                              className="sr-only"
                              checked={isCODAvailable}
                              onChange={handleToggle}
                         />
                         <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                         <div
                              className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${isCODAvailable ? 'transform translate-x-full bg-green-700' : ''
                                   }`}
                         ></div>
                    </div>
               </label>
               <p className="mt-2 text-sm text-gray-600">
                    {isCODAvailable ?
                         <span className='font-semibold text-green-600'>{title} Available</span>
                         :
                         `${title} Disabled`}
               </p>
          </div>
     );
}

export default ToggleButton;