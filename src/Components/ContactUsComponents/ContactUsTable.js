import React, { useEffect, useState } from 'react'
import { getAllContactUsHandler } from '../../Requests/RequestHandler/ContactUsRequestHandler';
import { formatDateString } from '../../Utils/FormateDate';
import { MdDelete } from "react-icons/md";

const ContactUsTable = ({ setShowContact }) => {
    const [contactUs, setContactUs] = useState([]);
    useEffect(() => {
        getAllContactUsHandler(setContactUs);
    }, [])

    const handleShowContact = (contact) => {
        setShowContact(contact);
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table-auto min-w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Phone Number</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">City</th>
                            <th className="px-4 py-2">State</th>
                            <th className="px-4 py-2">Message</th>
                            <th className="px-4 py-2">Sended On</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contactUs?.length > 0 && contactUs?.map((item, index) => (
                                <tr key={item._id} onClick={() => handleShowContact(item)}
                                    className={(index % 2 === 0) ? 'bg-gray-100 text-[#4D4D4D] cursor-pointer' : 'bg-white text-[#4D4D4D] cursor-pointer'}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{item.name}</td>
                                    <td className="border text-center px-4 py-2">{item.phoneNumber}</td>
                                    <td className="border text-center px-4 py-2">{item.email}</td>
                                    <td className="border text-center px-4 py-2">{item.city}</td>
                                    <td className="border text-center px-4 py-2">{item.state}</td>
                                    <td className="border text-center px-4 py-2">{item.message}</td>
                                    <td className="border px-4 py-2">{formatDateString(item.createdAt)}</td>
                                    <td className="border px-4 py-2 cursor-pointer">
                                        <div className='flex justify-center items-center'>
                                            <MdDelete />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ContactUsTable;