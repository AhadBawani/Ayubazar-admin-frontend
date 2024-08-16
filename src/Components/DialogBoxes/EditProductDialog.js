import React, { useEffect, useRef } from 'react'
import { DialogAction } from '../../Redux/Actions/ComponentsAction';
import { useDispatch } from 'react-redux';
import { IoMdClose } from "react-icons/io";
import EditProductForm from '../../Forms/EditProductForm';
import useComponentState from '../../Hooks/useComponentState';

const EditProductDialog = () => {
    const dispatch = useDispatch();
    const { dialog } = useComponentState();
    const wrapperRef = useRef();
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                // Click outside the component
                dispatch(DialogAction(null));
            }
        };

        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleOutsideClick);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [dispatch]);
    return (
        <div className="p-4 m-4 h-[500px] overflow-y-scroll" ref={wrapperRef}>
            <div className='flex justify-between'>
                <div>
                    <span className='font-semibold text-xl'>{dialog?.title}</span>
                </div>
                <div>
                    <span className="relative">
                        <IoMdClose
                            className="w-7 h-7 cursor-pointer rounded-full hover:bg-gray-200 m-2 mt-[-1px]"
                            onClick={() => dispatch(DialogAction(null))} />
                    </span>
                </div>
            </div>
            <div className='mt-4'>
                <EditProductForm product={dialog?.data}/>
            </div>
        </div>
    )
}

export default EditProductDialog;