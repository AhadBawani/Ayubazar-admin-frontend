import React, { useState } from 'react';
import Input from './Input';
import { FaPlus } from 'react-icons/fa6';

const DynamicInputs = ({ updateValues }) => {
    const [inputFields, setInputFields] = useState([{ id: 1 }]);
    const [inputValues, setInputValues] = useState([]);

    const handleAddFields = () => {
        const newId = inputFields[inputFields.length - 1].id + 1;
        setInputFields([...inputFields, { id: newId }]);
    };

    const handleInputChange = (index, name, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = { ...newInputValues[index], [name]: value };
        setInputValues(newInputValues);
        updateValues(newInputValues);
    };

    return (
        <div className="flex space-x-3">
            <div className="flex flex-col">
                {inputFields.map((input, index) => (
                    <div key={index} className="flex items-center space-x-4 my-4">
                        <div className="flex flex-col">
                            <span className="text-[#4D4D4D] text-sm font-semibold mb-2">
                                Product Option
                            </span>
                            <Input
                                type="text"
                                name={`option${input.id}`}
                                onChange={(e) => handleInputChange(index, `option ${input.id}`, e.target.value)}
                                id={`input${input.id}`}
                                error={false}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#4D4D4D] text-sm font-semibold mb-2">
                                Product Price
                            </span>
                            <Input
                                type="text"
                                name={`price${input.id}`}
                                onChange={(e) => handleInputChange(index, `price ${input.id}`, e.target.value)}
                                id={`input${input.id + 1}`}
                                error={false}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-11">
                <button className="p-3 h-[40px] bg-blue-500 text-white rounded outline-none" onClick={handleAddFields}>
                    <FaPlus />
                </button>
            </div>
        </div>
    );
};

export default DynamicInputs;
