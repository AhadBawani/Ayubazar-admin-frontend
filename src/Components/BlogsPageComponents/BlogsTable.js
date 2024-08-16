import React from 'react';
import Requests from '../../Requests/Requests/Request';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { ConfirmationDialogAction, DialogAction } from '../../Redux/Actions/ComponentsAction';

const BlogsTable = ({ blogs }) => {
    const dispatch = useDispatch();
    function formatDateString(dateString) {
        const date = new Date(dateString);
        // const hours = date.getHours();
        // const ampm = hours >= 12 ? 'PM' : 'AM';
        // const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        // const formattedDate = `${padZero(date.getDate())}-${padZero(date.getMonth() + 1)}-${date.getFullYear()} ${formattedHours}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())} ${ampm}`;
        const formattedDate = `${padZero(date.getDate())}-${padZero(date.getMonth() + 1)}-${date.getFullYear()}`;
        return formattedDate;
    }

    function padZero(num) {
        return num.toString().padStart(2, '0');
    }

    const handleDeleteBlog = (blog) => {
        dispatch(
            ConfirmationDialogAction(
                {
                    open: 'blog',
                    id: blog?._id,
                    body: `Are you sure you want to delete blog ?`
                }));
    }

    const handleEditBlog = (blog) => {
        dispatch(DialogAction({ open: 'edit-blog', data: blog }))
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table-auto min-w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Blog Image</th>
                            <th className="px-4 py-2">Blog Title</th>
                            <th className="px-4 py-2">Created On</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            blogs?.map((blog, index) => {
                                return <>
                                    <tr key={blog._id} className={(index % 2 === 0) ? 'bg-gray-100 text-[#4D4D4D]' : 'bg-white text-[#4D4D4D]'}>
                                        <td className="border px-4 py-2 text-center">{index + 1}</td>
                                        <td className="border p-4 text-center">
                                            <div className='h-[60px] w-[60px] rounded-sm mx-auto'
                                                style={{ border: '1px solid #ececec' }}>
                                                <img
                                                    src={Requests.GET_BLOG_IMAGE + blog.blogImage}
                                                    alt={blog?.blogImage}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            <b>{blog?.blogTitle}</b>
                                        </td>
                                        <td className="border px-4 py-2 text-center">{formatDateString(blog?.createdAt)}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <div className='flex justify-between'>
                                                <span className="relative cursor-pointer">
                                                    <MdDelete
                                                        className="w-7 h-7 p-1 cursor-pointer rounded-full hover:bg-gray-200 m-2"
                                                        onClick={() => handleDeleteBlog(blog)} />
                                                </span>
                                                <span className='relative cursor-pointer'>
                                                    <MdEdit
                                                        className="w-7 h-7 p-1 cursor-pointer rounded-full hover:bg-gray-200 m-2"
                                                        onClick={() => handleEditBlog(blog)} />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BlogsTable