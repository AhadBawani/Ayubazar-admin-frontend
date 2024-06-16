import React from 'react';
import Requests from '../../Requests/Requests/Request';
import { formatDateString } from '../../Utils/FormateDate';
import { MdEdit } from 'react-icons/md';
import { DialogAction } from '../../Redux/Actions/ComponentsAction';
import { useDispatch } from 'react-redux';

const CompaniesTableRow = ({ company, index }) => {
     const dispatch = useDispatch();
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
                    <span className='relative cursor-pointer'>
                         <MdEdit
                              className="w-7 h-7 p-1 cursor-pointer rounded-full hover:bg-gray-200 m-1"
                              onClick={() => dispatch(DialogAction({ open: 'edit-company', data: company }))} />
                    </span>
               </td>
          </tr>
     )
}

export default CompaniesTableRow