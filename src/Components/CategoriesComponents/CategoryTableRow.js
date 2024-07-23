import React from 'react'
import { formatDateString } from '../../Utils/FormateDate'
import { MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { DialogAction } from '../../Redux/Actions/ComponentsAction'

const CategoryTableRow = ({ categories, index }) => {
     const dispatch = useDispatch();
     return (
          <tr key={categories._id}
               className={(index % 2 === 0) ? 'bg-gray-100 text-[#4D4D4D]'
                    :
                    'bg-white text-[#4D4D4D]'}>
               <td className="border px-4 py-2">{index + 1}</td>
               <td className="border px-4 py-2">{categories.category}</td>
               <td className="border text-center px-4 py-2">19</td>
               <td className="border text-center px-4 py-2">10</td>
               <td className="border px-4 py-2">{formatDateString(categories.createdAt)}</td>
               <td className="border px-4 py-2">
                    <div className='flex justify-between'>
                         <span className='cursor-pointer'>
                              <MdEdit onClick={() => dispatch(DialogAction(
                                   { open: 'edit-category', data: categories }))} />
                         </span>
                    </div>
               </td>
          </tr>
     )
}

export default CategoryTableRow