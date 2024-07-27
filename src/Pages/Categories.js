import React from 'react'
import AddCategory from './AddCategory';
import AddSubCategoryForm from '../Forms/AddSubCategoryForm';
import CategoryTable from '../Components/CategoriesComponents/CategoryTable';
import SubCategoryTable from '../Components/CategoriesComponents/SubCategoryTable';
import EditCategoryDialog from '../Components/DialogBoxes/EditCategoryDialog';
import useComponentState from '../Hooks/useComponentState';
import EditSubCategoryDialog from '../Components/DialogBoxes/EditSubCategoryDialog';

const Categories = () => {
     const { dialog } = useComponentState();
     return (
          <>
               <div className='grid grid-cols-2'>
                    <div>
                         <AddCategory />
                         <hr className='my-4' />
                         <AddSubCategoryForm />
                    </div>
                    <div className='flex flex-col justify-center border-l border-gray-400 pl-2'>
                         <CategoryTable />
                         <hr className='my-4' />
                         <SubCategoryTable />
                    </div>
               </div>
               {
                    dialog?.open === 'edit-category'
                    &&
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                         <div className="bg-white rounded-md h-auto w-auto">
                              <EditCategoryDialog />
                         </div>
                    </div>
               }
               {
                    dialog?.open === 'edit-sub-category'
                    &&
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                         <div className="bg-white rounded-md h-auto w-auto">
                              <EditSubCategoryDialog />
                         </div>
                    </div>
               }
          </>
     )
}

export default Categories;