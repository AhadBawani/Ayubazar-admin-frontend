import React from 'react';
import Requests from '../../Requests/Requests/Request';
import { MdDelete, MdEdit } from 'react-icons/md';
import { DialogAction } from '../../Redux/Actions/ComponentsAction';
import { useDispatch } from 'react-redux';

const CompaniesTableRow = ({ company, index }) => {
     const dispatch = useDispatch();
     function formatDateString(dateString) {
          const date = new Date(dateString);
          const formattedDate = `${padZero(date.getDate())}-${padZero(date.getMonth() + 1)}-${date.getFullYear()}`;
          return formattedDate;
     }
     function padZero(num) {
          return num.toString().padStart(2, '0');
     }
     return (
          <tr key={company._id} className={(index % 2 === 0) ? 'bg-gray-100 text-[#4D4D4D]' : 'bg-white text-[#4D4D4D]'}>
               <td className="border px-4 py-2 text-center">{index + 1}</td>
               <td className="border p-4 text-center">
                    <div className='h-[60px] w-[60px] rounded-sm mx-auto'
                         style={{ border: '1px solid #ececec' }}>
                         {
                              company?.companyImage
                                   ?
                                   <>
                                        <img
                                             src={Requests.GET_COMPANY_IMAGES + company?.companyImage}
                                             alt={company?.companyName}
                                             className="h-full w-full object-cover"
                                        />
                                   </>
                                   :
                                   <>
                                        <span>Upload Images</span>
                                   </>
                         }
                    </div>
               </td>
               <td className="border px-4 py-2 text-center">{company.companyName}</td>
               <td className="border px-4 py-2 text-center">{formatDateString(company.createdAt)}</td>
               <td className="border px-4 py-2 text-center">
                    <div className='flex justify-between'>
                         <span className='relative cursor-pointer'>
                              <MdEdit
                                   className="w-7 h-7 p-1 cursor-pointer rounded-full hover:bg-gray-200 m-1"
                                   onClick={() => dispatch(DialogAction({ open: 'edit-company', data: company }))} />
                         </span>
                         <span className="relative cursor-pointer">
                              <MdDelete
                                   className="w-7 h-7 p-1 cursor-pointer rounded-full hover:bg-gray-200 m-1"
                                   onClick={() => dispatch(DialogAction({ open: 'delete-company', data: company }))} />
                         </span>
                    </div>
               </td>
          </tr>
     )
}

export default CompaniesTableRow