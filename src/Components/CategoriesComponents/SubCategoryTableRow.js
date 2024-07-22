import React from 'react'
import { MdEdit } from 'react-icons/md';

const SubCategoryTableRow = ({ subCategories, index }) => {
     const formatDateString = (dateString) => {
          const date = new Date(dateString);     
          const formattedDate = `${padZero(date.getDate())}-${padZero(date.getMonth() + 1)}-${date.getFullYear()}`;
          return formattedDate;
     }

     function padZero(num) {
          return num.toString().padStart(2, '0');
     }
     return (
          <tr key={subCategories._id}
               className={(index % 2 === 0) ? 'bg-gray-100 text-[#4D4D4D]' : 'bg-white text-[#4D4D4D]'}>
               <td className="border px-4 py-2">{index + 1}</td>
               <td className="border px-4 py-2">{subCategories.category?.category}</td>
               <td className="border px-4 py-2">{subCategories.subCategory}</td>
               <td className="border text-center px-4 py-2">19</td>
               <td className="border text-center px-4 py-2">10</td>
               <td className="border px-4 py-2">{formatDateString(subCategories.createdAt)}</td>
               <td className="border px-4 py-2">
                    <div className='flex justify-between'>
                         <span className='cursor-pointer'>
                              <MdEdit />
                         </span>
                    </div>
               </td>
          </tr>
     )
}

export default SubCategoryTableRow;