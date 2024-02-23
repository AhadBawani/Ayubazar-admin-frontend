import React from 'react'
import AddBlogForm from '../Forms/AddBlogForm';
import BlogsTable from '../Components/BlogsPageComponents/BlogsTable';
import useAdminState from '../Hooks/useAdminState';

const Blogs = () => {
  const { blogs } = useAdminState();
  return (
    <div className='flex'>
      <div className='w-1/2'>
        <AddBlogForm />
      </div>
      <div className='flex justify-center border-l border-gray-400 w-1/2 p-4'>
        <BlogsTable blogs={blogs}/>
      </div>
    </div>
  )
}

export default Blogs;