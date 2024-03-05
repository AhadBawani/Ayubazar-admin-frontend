import React, { useState } from 'react'
import ContactUsTable from '../Components/ContactUsComponents/ContactUsTable';
import ContactUsDialog from '../Components/ContactUsComponents/ContactUsDialog';

const ContactUs = () => {
    const [showContact, setShowContact] = useState();
    return (
        <>
            <div className='m-4 p-4'>
                {
                    showContact?.length > 0
                        ?
                        <ContactUsTable setShowContact={setShowContact} />
                        :
                        <>
                        <div className='flex justify-center items-center mt-6'>
                            <span className='text-2xl font-[#333] font-bold'>No contacts till now!</span>
                        </div>
                        </>
                }
            </div>
            {
                showContact
                &&
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white rounded-md h-auto w-auto">
                        <ContactUsDialog showContact={showContact} setShowContact={setShowContact} />
                    </div>
                </div>
            }
        </>
    )
}

export default ContactUs;