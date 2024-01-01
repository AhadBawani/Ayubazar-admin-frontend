import React from 'react';

const Input = ({ type, onChange, name, error, id }) => {
    const borderColor = error ? 'red' : '#d3d3d3';
    return (
        <input
            className='p-2 rounded-lg w-full outline-none'
            style={{ border: `1px solid ${borderColor}` }}
            type={type}
            autoComplete={false}
            onChange={onChange}
            name={name}
            id={id}
        />

    )
}

export default Input;