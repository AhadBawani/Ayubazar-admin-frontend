import React from 'react'

const ComponentsButton = ({text, onclick}) => {
    return (
        <button
            className='transition-all ease-in-out duration-200 w-full
                         bg-[#d0bdac] text-white hover:bg-[#bfae9e] uppercase outline-none'
            style={{
                letterSpacing: '2px',
                lineHeight: '1.4',
                height: '42px',
                fontSize: '12px',
                padding: '0 30px',
                borderRadius: '5px',
                fontWeight: '600'
            }} onClick={onclick}>
            {text}
        </button>
    )
}

export default ComponentsButton