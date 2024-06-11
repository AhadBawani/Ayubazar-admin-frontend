import React from 'react'
import { useDispatch } from 'react-redux';
import useComponentState from '../../Hooks/useComponentState';
import { ConfirmationDialogAction } from '../../Redux/Actions/ComponentsAction';
import { IoMdClose } from 'react-icons/io';
import { deleteBlogHandler } from '../../Requests/RequestHandler/BlogRequestHandler';
import { toast } from 'react-toastify';

const BlogConfirmationDialog = () => {
    const dispatch = useDispatch();
    const { confirmation } = useComponentState();

    const handleCloseDialog = () => {
        dispatch(ConfirmationDialogAction(false));
    }

    const handleDialogConfirmation = () => {        
        deleteBlogHandler(dispatch, confirmation?.id)
            .then((response) => {
                if (response) {
                    handleCloseDialog();
                    toast.success('blog deleted successfully!');
                }
            })
            .catch((error) => {
                console.log('error in delete blog : ', error);
            })
    }
    
    return (
        <div className="w-full m-2 p-2">
            <div className="flex justify-between">
                <span className="text-xl font-semibold">Are you sure you want to delete?</span>
                <div className="rounded-full p-1 w-9 h-9 
                    transition-all ease-in-out duration-200 hover:bg-[#f1f1f1]
                    flex justify-center items-center cursor-pointer ml-4 mr-2">
                    <IoMdClose
                        className="mt-[-4px]"
                        size={24}
                        onClick={handleCloseDialog} />
                </div>
            </div>
            <div className="mt-3">
                <span>{confirmation?.body}</span>
            </div>
            <div className="mt-6 flex justify-end space-x-4 mr-2">
                <button
                    className="px-4 py-2 bg-blue-500 text-white outline-none
                    rounded-md hover:bg-blue-600 transition-colors duration-200"
                    onClick={handleDialogConfirmation}>
                    Confirm
                </button>
                <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 outline-none
                    rounded-md hover:bg-gray-400 transition-colors duration-200"
                    onClick={handleCloseDialog}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default BlogConfirmationDialog