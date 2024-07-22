import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { DialogAction } from '../../Redux/Actions/ComponentsAction';
import { IoMdClose } from "react-icons/io";
import Requests from '../../Requests/Requests/Request';
import useComponentState from '../../Hooks/useComponentState';
import DynamicBlogText from '../../Fields/DynamicBlogText';
import ComponentsButton from '../../Fields/ComponentsButton';
import { editBlogHandler } from '../../Requests/RequestHandler/BlogRequestHandler';
import { toast } from 'react-toastify';

const EditBlogDialog = () => {
    const { dialog } = useComponentState();
    const [blogImage, setBlogImage] = useState(dialog?.data?.blogImage);
    const [imageChange, setImageChange] = useState(false);
    const [blogText, setBlogText] = useState(dialog?.data?.blogText);
    const [formValue, setFormValue] = useState({
        blogTitle: dialog?.data?.blogTitle || null
    })
    const [formError, setFormError] = useState({
        blogImage: false,
        blogTitle: false,
        blogText: false
    });
    const wrapperRef = useRef();
    const fileInputRef = useRef();
    const dispatch = useDispatch();
    const handleFileUpload = () => {
        fileInputRef.current.click();
    }
    const onInput = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }
    const handleFileChange = (event) => {
        setBlogImage(event.target.files[0]);
        setImageChange(true);
    };
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                // Click outside the component
                dispatch(DialogAction(null));
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [dispatch]);

    const handleDescriptionUpdate = (updatedValue) => {
        setBlogText(JSON.stringify(updatedValue));
    }

    const handleEditBlog = () => {
        let valid = true;
        const newErrors = { ...formError };

        if (!blogImage) {
            newErrors.blogImage = true;
            valid = false;
        }

        if (!formValue.blogTitle) {
            newErrors.blogTitle = true;
            valid = false;
        } else {
            newErrors.blogTitle = false;
        }

        if (blogText.length === 0) {
            newErrors.blogText = true;
            valid = false;
        } else {
            newErrors.blogText = false;
        }
        if (valid) {
            const formData = new FormData();
            formData.append('blogImage', blogImage);
            formData.append('blogTitle', formValue.blogTitle);
            formData.append('blogText', blogText);            
            editBlogHandler(dispatch, dialog?.data?._id, formData)
                .then((response) => {
                    if (response) {
                        dispatch(DialogAction(null));
                        toast.success('Blog edited successfully!');
                    }
                })
                .catch((error) => {
                    if (error) {
                        toast.error(error);
                    }
                })
        } else {
            setFormError(newErrors);
        }
    }
    return (
        <div className='p-4 m-4 w-[700px] h-[500px] overflow-y-scroll' ref={wrapperRef}>
            <div className='flex justify-between'>
                <div>
                    <span className='font-semibold text-xl'>Edit Coupon</span>
                </div>
                <div>
                    <span className="relative">
                        <IoMdClose
                            className="w-7 h-7 cursor-pointer rounded-full hover:bg-gray-200 m-2 mt-[-1px]"
                            onClick={() => dispatch(DialogAction(null))} />
                    </span>
                </div>
            </div>
            <div className='flex flex-col'>
                <div className='h-[250px] rounded-lg mt-8'
                    style={{ border: `1px solid #d3d3d3` }}
                    onClick={handleFileUpload}>
                    <div className='flex justify-center items-center'>
                        <img
                            id='productImage'
                            src={imageChange ? URL.createObjectURL(blogImage) : Requests.GET_BLOG_IMAGE + dialog?.data?.blogImage}
                            alt='Uploaded'
                            className='h-[250px] object-cover rounded-lg w-full' />
                    </div>
                    <input
                        type='file'
                        ref={fileInputRef}
                        className='hidden'
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <div className='flex flex-col my-6'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Blog Title *
                        </span>
                        <textarea
                            className='p-2 rounded-md outline-none'
                            name='blogTitle'
                            defaultValue={dialog?.data?.blogTitle}
                            onChange={onInput}
                            rows={3} style={{ border: '1px solid #D3D3D3' }} />
                    </div>
                    <div className='my-4'>
                        <DynamicBlogText updateValues={handleDescriptionUpdate} initialDescriptions={JSON.parse(dialog?.data?.blogText)} />
                    </div>
                </div>
                <div>
                    <ComponentsButton text={'Edit Blog'} onclick={handleEditBlog} />
                </div>
            </div>
        </div>
    )
}

export default EditBlogDialog;