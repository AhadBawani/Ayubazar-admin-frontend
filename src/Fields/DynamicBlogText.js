import React, { useState } from 'react';

const DynamicBlogText = ({ initialDescriptions, updateValues, blogTextError }) => {
    const [descriptions, setDescriptions] = useState(
        initialDescriptions && initialDescriptions.length > 0 ?
            initialDescriptions.map((desc, index) => ({ id: index + 1, value: desc.value }))
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
            <span className="text-[#4D4D4D] text-sm font-semibold mb-2">Blog Description *</span>
            {descriptions.map((desc) => (
                <div key={desc.id} className="flex mb-2">
                    <textarea
                        defaultValue={desc.value}
                        onChange={(e) => handleInputChange(desc.id, e)}
                        className="p-2 rounded-md mr-2 flex-1 outline-none"
                        style={blogTextError ? { border: '1px solid red' } : { border: '1px solid #D3D3D3' }}
                        rows={6}
                    />
                    {desc.id === 1 ? (
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

export default DynamicBlogText;