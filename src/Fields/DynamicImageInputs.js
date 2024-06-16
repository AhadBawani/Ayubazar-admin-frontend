import React, { useState } from 'react';
import { toast } from 'react-toastify';

const DynamicImageInputs = ({ updateValues }) => {
     const [imageInputs, setImageInputs] = useState([{ id: 1, file: null }]);

     const handleAddInput = () => {
          const newId = imageInputs.length + 1;
          setImageInputs([...imageInputs, { id: newId, file: null }]);
     };

     const handleRemoveInput = (idToRemove) => {
          const updatedImageInputs = imageInputs.filter((input) => input.id !== idToRemove);
          setImageInputs(updatedImageInputs);
          updateValues(updatedImageInputs.map(input => input.file).filter(file => file !== null));
     };

     const handleInputChange = (id, event) => {
          const file = event.target.files[0];
          if (!file) return;

          const isDuplicate = imageInputs.some(input => input.file && input.file.name === file.name);
          if (isDuplicate) {
               toast.error('This image is already selected. Please choose a different image.');
               return;
          }

          const updatedImageInputs = imageInputs.map((input) =>
               input.id === id ? { ...input, file } : input
          );
          setImageInputs(updatedImageInputs);
          updateValues(updatedImageInputs.map(input => input.file).filter(file => file !== null));
     };

     return (
          <div className="mt-4">
               <span className="text-[#4D4D4D] text-sm font-semibold mb-2">Product Images</span>
               {imageInputs.map((input) => (
                    <div key={input.id} className="flex mb-2 items-center w-[220px]">
                         <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleInputChange(input.id, e)}
                              className="border border-gray-300 p-2 rounded-md mr-2 flex-1 outline-none"
                         />
                         {input.id === 1 ? (
                              <button
                                   type="button"
                                   className="bg-blue-500 text-white px-3 py-1 rounded-md outline-none"
                                   onClick={handleAddInput}>
                                   +
                              </button>
                         ) : (
                              <button
                                   type="button"
                                   className="bg-red-500 text-white px-3 py-1 rounded-md outline-none"
                                   onClick={() => handleRemoveInput(input.id)}>
                                   &#x2212;
                              </button>
                         )}
                    </div>
               ))}               
          </div>
     );
};

export default DynamicImageInputs;
