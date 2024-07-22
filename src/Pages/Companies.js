import React, { useState } from 'react'
import useAdminState from '../Hooks/useAdminState';
import CompaniesTableRow from '../Components/CompaniesComponents/CompaniesTableRow';
import useComponentState from '../Hooks/useComponentState';
import EditCompanyDialog from '../Components/DialogBoxes/EditCompanyDialog';
import AddCompany from './AddCompany';

const Companies = () => {
     const { companies } = useAdminState();
     const { dialog } = useComponentState();
     const [searchResult, setSearchResult] = useState();
     const [searchedCompanies, setSearchedCompanies] = useState([]);     
     const handleCompanySearch = (e) => {
          setSearchResult(false);
          let value = e.target.value.toLowerCase(); // Convert search string to lowercase for case-insensitive search
          const filteredCompanies = companies.filter((item) => item.companyName.toLowerCase().includes(value));
          if (filteredCompanies?.length === 0) {
               setSearchResult(true);
               return;
          } else {
               setSearchedCompanies(filteredCompanies);
          }
     }
     return (
          <>
               <div className='grid grid-cols-2 h-full'>
                    <div>
                         <AddCompany />
                    </div>
                    <div>
                         <div className='flex py-4'>
                              <div className='flex justify-center'>
                                   <div className='flex mt-2'>
                                        <div>All</div>
                                        <div className='ml-1'>({companies?.length})</div>
                                   </div>
                                   <div className='ml-4'>
                                        <input
                                             placeholder='Search Company'
                                             onChange={(e) => handleCompanySearch(e)}
                                             className='p-2 border-2 border-gray-200 rounded-lg outline-none'
                                        />
                                   </div>
                              </div>                              
                         </div>
                         <div className='overflow-x-auto'>
                              <table className='table-auto min-w-full'>
                                   <thead>
                                        <tr>
                                             <th className='px-4 py-2'>ID</th>
                                             <th className='px-4 py-2'>Company Image</th>
                                             <th className='px-4 py-2'>Company Name</th>
                                             <th className='px-4 py-2'>Created On</th>
                                             <th className='px-4 py-2'>Actions</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {searchResult ? (
                                             <tr>
                                                  <td colSpan="8" className='text-center py-4 pt-24'>
                                                       <span className='font-semibold text-2xl text-[#999]'>No Product Found!</span>
                                                  </td>
                                             </tr>
                                        ) : (
                                             <>
                                                  {searchedCompanies?.length > 0
                                                       ? searchedCompanies.map((item, index) => (
                                                            <CompaniesTableRow company={item} index={index} key={index} />
                                                       ))
                                                       : companies.map((item, index) => (
                                                            <CompaniesTableRow company={item} index={index} key={index} />
                                                       ))}
                                             </>
                                        )}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </div>
               {
                    dialog?.open === 'edit-company'
                    &&
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                         <div className="bg-white rounded-md h-auto w-auto">
                              <EditCompanyDialog />
                         </div>
                    </div>
               }
          </>
     )
}

export default Companies;