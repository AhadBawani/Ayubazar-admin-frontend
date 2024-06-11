import React, { useState } from 'react';
import InventoryTableRow from './InventoryTableRow';
import { useNavigate } from 'react-router-dom';

const InventoryTable = ({ products }) => {
    const [searchedProduct, setSearchedProduct] = useState([]);
    const [searchResult, setSearchResult] = useState(false);
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        setSearchResult(false);
        let value = e.target.value.toLowerCase(); // Convert search string to lowercase for case-insensitive search
        const filteredProducts = products.filter((item) => item.productName.toLowerCase().includes(value));
        if (filteredProducts?.length === 0) {
            setSearchResult(true);
            return;
        } else {
            setSearchedProduct(filteredProducts);
        }
    };    
    return (
        <>
            <div className='flex p-4'>
                <div className='flex justify-center'>
                    <div className='flex mt-2'>
                        <div>All</div>
                        <div className='ml-1'>({products?.length})</div>
                    </div>
                    <div className='ml-4'>
                        <input
                            placeholder='Search Product'
                            onChange={handleOnChange}
                            className='p-2 border-2 border-gray-200 rounded-lg outline-none'
                        />
                    </div>
                </div>
                <div className='flex justify-end items-end w-full'>
                    <button
                        style={{
                            letterSpacing: '2px',
                            lineHeight: '1.4',
                            height: '42px',
                            fontSize: '12px',
                        }}
                        className='w-[15%] uppercase font-bold bg-[#027148] hover:bg-[#013220]
                    text-white p-2 rounded-md transition-all ease-in-out duration-200'
                        onClick={() => navigate('/add-product')}
                    >
                        + Add Product
                    </button>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className='table-auto min-w-full'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2'>ID</th>
                            <th className='px-4 py-2'>Product Image</th>
                            <th className='px-4 py-2'>Product Name</th>
                            <th className='px-4 py-2'>Product Company</th>
                            <th className='px-4 py-2'>Status</th>
                            <th className='px-4 py-2'>Created On</th>
                            <th className='px-4 py-2'>Actions</th>
                            <th className='px-4 py-2'>Out of Stock</th>
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
                                {searchedProduct?.length > 0
                                    ? searchedProduct.map((item, index) => (
                                        <InventoryTableRow product={item} index={index} key={index} />
                                    ))
                                    : products.map((item, index) => (
                                        <InventoryTableRow product={item} index={index} key={index} />
                                    ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default InventoryTable;
