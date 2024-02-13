import React, { useState } from 'react';
import Input from './Input';
import { FaPlus } from 'react-icons/fa6';
import { MdDelete } from "react-icons/md";

const DynamicInputs = ({ updateValues }) => {
    const [inputFields, setInputFields] = useState([{ id: 1 }]);
    const [inputValues, setInputValues] = useState([]);

    const handleAddFields = () => {
        const newId = inputFields[inputFields.length - 1].id + 1;
        setInputFields([...inputFields, { id: newId }]);
        setInputValues([...inputValues, {}]); // Add an empty object for the new fields
    };

    const handleInputChange = (index, name, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = { ...newInputValues[index], [name]: value };
        setInputValues(newInputValues);
        updateValues(newInputValues);        
    };

    const handleDeleteInput = (index) => {
        const newInputs = [...inputFields];
        newInputs.splice(index, 1);
        setInputFields(newInputs);

        const newInputValues = [...inputValues];
        newInputValues.splice(index, 1);
        setInputValues(newInputValues);
        updateValues(newInputValues);
    };

    return (
        <div className="flex space-x-3">
            <div className="flex flex-col">
                {inputFields.map((input, index) => (
                    <div key={index} className="flex items-center space-x-4 my-2">
                        <div className="flex flex-col">
                            <span className="text-[#4D4D4D] text-sm font-semibold mb-2">
                                Product Option
                            </span>
                            <Input
                                type="text"
                                name={`option${input.id}`}
                                onChange={(e) => handleInputChange(index, `option`, e.target.value)}
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
                                onChange={(e) => handleInputChange(index, `price`, e.target.value)}
                                id={`input${input.id + 1}`}
                                error={false}
                            />
                        </div>
                        <div className='mt-7'>
                            {
                                index === 0
                                    ?
                                    <>
                                        <button className="p-3 h-[40px] bg-blue-500 text-white rounded outline-none" onClick={handleAddFields}>
                                            <FaPlus />
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button className="p-3 h-[40px] bg-red-500 text-white rounded outline-none" onClick={() => handleDeleteInput(index)}>
                                            <MdDelete />
                                        </button>
                                    </>
                            }
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-11">
                {/* Add any additional content */}
            </div>
        </div>
    );
};

export default DynamicInputs;