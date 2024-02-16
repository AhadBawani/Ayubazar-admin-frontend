import React from 'react';

const Input = ({ type, onChange, name, error, id, ...props }) => {
    const borderColor = error ? 'red' : '#d3d3d3';

    // Calculate the current date in the format YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];

    // Set the min attribute for the date input if the type is 'date'
    const minDate = type === 'date' ? currentDate : undefined;

    return (
        <input
            className='p-2 rounded-lg w-full outline-none'
            style={{ border: `1px solid ${borderColor}` }}
            type={type}
            autoComplete={false}
            onChange={onChange}
            name={name}
            id={id}
            min={minDate} // Set the min attribute based on the type
            {...props}
        />
    );
};

export default Input;
