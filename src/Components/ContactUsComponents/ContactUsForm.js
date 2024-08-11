import React from 'react'
import Input from '../../Fields/Input';

const ContactUsForm = ({ value }) => {
    return (
        <div>
            <div className='flex flex-col mb-4'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                    Name *
                </span>
                <Input name="name" id="name" value={value?.name} />
            </div>
            <div className='flex w-full'>
                <div className='flex flex-col mb-2 flex-grow'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        Phone Number *
                    </span>
                    <Input
                        name="phoneNumber"
                        id="phoneNumber"
                        value={value?.phoneNumber}
                     />
                </div>
                <div className='flex flex-col mb-2 ml-2 flex-grow'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        Email Address *
                    </span>
                    <Input name="email" id="email" value={value?.email} />
                </div>
            </div>
            <div className='flex w-full'>
                <div className='flex flex-col mb-2 flex-grow'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        State *
                    </span>
                    <Input name="state" id="state" value={value?.state} />
                </div>
                <div className='flex flex-col mb-2 ml-2 flex-grow'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        City *
                    </span>
                    <Input name="city" id="city" value={value?.city} />
                </div>
            </div>
            <div className='flex flex-col'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                    Message *
                </span>
                <textarea
                    id="message"
                    name="message"
                    className="border border-gray-300 rounded px-3 py-2 w-full h-32 outline-none"
                    placeholder="Your Message"
                    required
                    value={value?.message}
                />
            </div>
        </div>
    )
}

export default ContactUsForm;