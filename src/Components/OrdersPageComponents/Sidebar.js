import React from 'react';
import { MdPending } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SiMicrosoftexcel } from "react-icons/si";

const Sidebar = ({ state, setState }) => {
     const options = [
          { text: 'Pending Orders', icon: <MdPending />, action: 'pending-orders' },
          { text: 'Cancellation Orders', icon: <MdCancel />, action: 'cancel-orders' },
          { text: 'On the way Orders', icon: <FaTruck />, action: 'on-the-way-orders' },
          { text: 'Delete Orders', icon: <MdDelete />, action: 'delete-orders' },
          { text: 'Orders Excel', icon: <SiMicrosoftexcel />, action: 'orders-excel' },
     ]
     return (
          <div className='uppercase'>
               {
                    options.map((item, index) => {
                         return <>
                              <div className={state === item.action ?
                                   'text-black bg-[#f6f6f6] p-3 mx-4 cursor-pointer' : 'p-3 mx-4 cursor-pointer'}
                                   style={{ border: 'solid 1px #eee' }}
                                   key={index} onClick={() => setState(item.action)}>
                                   <div
                                        className={state === item.action ? 'text-black flex font-medium text-lg' :
                                             'text-[#999999] flex font-medium text-lg'}>
                                        <span className='mt-1'>
                                             {item?.icon}
                                        </span>
                                        <span className='ml-1'>
                                             {item?.text}
                                        </span>
                                   </div>
                              </div>
                         </>
                    })
               }
          </div>
     )
}

export default Sidebar