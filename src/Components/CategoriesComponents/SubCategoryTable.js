import React from 'react'
import SubCategoryTableRow from './SubCategoryTableRow'
import useAdminState from '../../Hooks/useAdminState'
import { useState } from 'react';

const SubCategoryTable = () => {
     const { subCategories } = useAdminState();
     const [searchedSubCategories, setSearchedSubCategories] = useState([]);
     const [searchResult, setSearchResult] = useState(false);
     const handleCompanySearch = (e) => {
          setSearchResult(false);
          let value = e.target.value.toLowerCase(); // Convert search string to lowercase for case-insensitive search
          const filteredCategories = subCategories.filter((item) => item.subCategory.toLowerCase().includes(value));
          if (filteredCategories?.length === 0) {
               setSearchResult(true);
               return;
          } else {
               setSearchedSubCategories(filteredCategories);
          }
     }
     return (
          <>
               <div className='flex justify-between my-4'>
                    <div>
                         All ({subCategories?.length})
                    </div>
                    <div>
                         <span className='text-2xl font-bold'>Sub Categories Table</span>
                    </div>
                    <div className='ml-4'>
                         <input
                              placeholder='Search Company'
                              onChange={(e) => handleCompanySearch(e)}
                              className='p-2 border-2 border-gray-200 rounded-lg outline-none'
                         />
                    </div>
               </div>
               <div className="overflow-x-auto">
                    <table className="table-auto min-w-full">
                         <thead>
                              <tr>
                                   <th className="px-4 py-2">ID</th>
                                   <th className="px-4 py-2">Categories</th>
                                   <th className="px-4 py-2">Sub Category</th>
                                   <th className="px-4 py-2">Total Sub Products</th>
                                   <th className="px-4 py-2">Created On</th>
                                   <th className="px-4 py-2">Actions</th>
                              </tr>
                         </thead>
                         <tbody>
                              {searchResult ? (
                                   <tr>
                                        <td colSpan="8" className='text-center py-4 pt-24'>
                                             <span className='font-semibold text-2xl text-[#999]'>No sub category Found!</span>
                                        </td>
                                   </tr>
                              ) : (
                                   <>
                                        {searchedSubCategories?.length > 0
                                             ? searchedSubCategories.map((item, index) => (
                                                  <SubCategoryTableRow subCategories={item} index={index} key={index} />
                                             ))
                                             : subCategories.map((item, index) => (
                                                  <SubCategoryTableRow subCategories={item} index={index} key={index} />
                                             ))}
                                   </>
                              )}
                         </tbody>
                    </table>
               </div>
          </>

     )
}

export default SubCategoryTable