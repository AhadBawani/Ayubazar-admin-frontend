import React, { useEffect, useRef } from 'react'
import { IoMdClose } from "react-icons/io";
import ContactUsForm from './ContactUsForm';

const ContactUsDialog = ({ showContact, setShowContact }) => {
    const wrapperRef = useRef();
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                // Click outside the component
                setShowContact(null);
            }
        };

        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleOutsideClick);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [setShowContact]);
    return (
        <div className="p-4 m-4" ref={wrapperRef}>
            <div className='flex justify-between'>
                <div>
                    <span className='font-semibold text-xl'>Contact Us</span>
                </div>
                <div>
                    <span className="relative">
                        <IoMdClose
                            className="w-7 h-7 cursor-pointer rounded-full hover:bg-gray-200 m-2 mt-[-1px]"
                            onClick={() => setShowContact(null)} />
                    </span>
                </div>
            </div>
            <div className='mt-4'>
                <ContactUsForm value={showContact}/>
            </div>
        </div>
    )
}

export default ContactUsDialog;