import React from 'react'
import AddCategory from './AddCategory';
import AddSubCategoryForm from '../Forms/AddSubCategoryForm';
import CategoryTable from '../Components/CategoriesComponents/CategoryTable';
import SubCategoryTable from '../Components/CategoriesComponents/SubCategoryTable';

const Categories = () => {
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
          </>
     )
}

export default Categories;