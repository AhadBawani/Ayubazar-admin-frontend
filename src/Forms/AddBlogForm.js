import React, { useRef, useState } from 'react'
import DynamicBlogText from '../Fields/DynamicBlogText';
import { toast } from 'react-toastify';
import { addBlogHandler } from '../Requests/RequestHandler/BlogRequestHandler';
import { useDispatch } from 'react-redux';

const AddBlogForm = () => {
    const fileInputRef = useRef();
    const dispatch = useDispatch();
    const [blogImage, setBlogImage] = useState();
    const [blogImageError, setBlogImageError] = useState(false);
    const [blogText, setBlogText] = useState([]);
    const [success, setSuccess] = useState(false);
    const [formValue, setFormValue] = useState({
        blogTitle: null,
        blogText: null
    });

    const [formError, setFormError] = useState({
        blogTitle: false,
        blogText: false
    })
    const handleFileChange = (event) => {
        setBlogImage(event.target.files[0]);
        setBlogImageError(false);
    };
    const handleDescriptionUpdate = (updatedValue) => {
        setBlogText(updatedValue);
    }
    const onInput = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }

    const handleFileUpload = () => {
        fileInputRef.current.click();
    }

    const handleAddBlog = () => {
        let valid = true;
        const newErrors = { ...formError };

        if (!blogImage) {
            setBlogImageError(true);
            toast.error('Blog Image required!');
            return;
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
            formData.append('blogText', JSON.stringify(blogText));

            addBlogHandler(dispatch, formData)
                .then((response) => {
                    if (response) {
                        toast.success('Blog Added successfully!');
                        setBlogImage(null);
                        document.getElementById('blogTitle').value = null;
                        setSuccess(true);
                    }
                })
                .catch((error) => {
                    console.log('error in add blog handler : ', error);
                });
        } else {
            setFormError(newErrors);
            toast.error('Fill all the required fields!');
        }
    }
    return (
        <div className='m-4 p-4'>
            <div>
                <div className='flex justify-center items-center'>
                    <span className='text-3xl font-semibold text-[#333]'>Add Blog</span>
                </div>
                <div>
                    <div className='h-[250px] rounded-lg mt-8'
                        style={blogImageError ?
                            { border: `1px solid red` }
                            :
                            { border: `1px solid #d3d3d3` }}
                        onClick={handleFileUpload}>
                        {blogImage ? (
                            <div className='flex justify-center items-center'>
                                <img id='productImage' src={URL.createObjectURL(blogImage)}
                                    alt='Uploaded'
                                    className='h-[250px] object-cover rounded-lg w-full' />
                            </div>
                        ) : (
                            <span className='flex justify-center items-center cursor-pointer h-full'>
                                Click to Upload
                            </span>
                        )}
                        <input
                            type='file'
                            ref={fileInputRef}
                            className='hidden'
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div>
                    <div className='flex flex-col my-6'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Blog Title *
                        </span>
                        <textarea
                            className='p-2 rounded-md outline-none'
                            name='blogTitle'
                            onChange={onInput}
                            id='blogTitle'
                            rows={3} style={formError.blogTitle ? { border: '1px solid red' } : { border: '1px solid #D3D3D3' }} />
                    </div>
                    <div className='my-4'>
                        <DynamicBlogText updateValues={handleDescriptionUpdate} blogTextError={formError.blogText} success={success}/>
                    </div>
                </div>
                <button
                    className='transition-all ease-in-out duration-200 w-full
                         bg-[#d0bdac] text-white hover:bg-[#bfae9e] uppercase outline-none'
                    style={{
                        letterSpacing: '2px',
                        lineHeight: '1.4',
                        height: '42px',
                        fontSize: '12px',
                        padding: '0 30px',
                        borderRadius: '5px',
                        fontWeight: '600'
                    }} onClick={handleAddBlog}>
                    Add Blog
                </button>
            </div>
        </div>
    )
}

export default AddBlogForm;