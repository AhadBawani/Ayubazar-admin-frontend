import React, { useState } from 'react';

const DynamicBulletDescription = ({ existingDescriptions, updateValues }) => {
  const [descriptions, setDescriptions] = useState(
    existingDescriptions && existingDescriptions.length > 0 ?
      existingDescriptions.map((desc, index) => ({ id: index + 1, value: desc.value }))
      : [{ id: 1, value: '' }]);

  const handleAddInput = () => {
    const newId = descriptions.length + 1;
    setDescriptions([...descriptions, { id: newId, value: '' }]);
    updateValues(descriptions);
  };

  const handleRemoveInput = (idToRemove) => {
    const updatedDescriptions = descriptions.filter((desc) => desc.id !== idToRemove);
    setDescriptions(updatedDescriptions);
    updateValues(updatedDescriptions);
  };

  const handleInputChange = (id, e) => {
    const updatedDescriptions = descriptions.map((desc) =>
      desc.id === id ? { ...desc, value: e.target.value } : desc
    );
    setDescriptions(updatedDescriptions);
    updateValues(updatedDescriptions);
  };

  return (
    <div className="mt-4">
      <span className="text-[#4D4D4D] text-sm font-semibold mb-2">Product Bullet Description</span>
      {descriptions.map((desc, index) => (
        <div key={index} className="flex mb-2">
          <div className='flex items-center'>
            <div className="w-4 h-4 flex items-center justify-center text-xl font-bold rounded-full mr-1">
              <span>&#8226;</span>
            </div>
          </div>
          <div className="flex-1 mr-2">
            <textarea
              value={desc.value}
              onChange={(e) => handleInputChange(desc.id, e)}
              className="border border-gray-300 p-2 rounded-md w-full outline-none"
              rows={5}
            />
          </div>
          {index === 0 ? (
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-md outline-none"
              onClick={handleAddInput}>
              +
            </button>
          ) : (
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-md outline-none"
              onClick={() => handleRemoveInput(desc.id)}
            >
              &#x2212;
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicBulletDescription;
