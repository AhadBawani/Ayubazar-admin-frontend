import React from 'react'
import InventoryTableRow from './InventoryTableRow'
import { useNavigate } from 'react-router-dom'


const InventoryTable = ({ products }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className='flex justify-end items-end pt-4 pr-4'>
                <button
                    style={{
                        letterSpacing: '2px',
                        lineHeight: '1.4',
                        height: '42px',
                        fontSize: '12px'
                    }}
                    className='w-[15%] uppercase font-bold bg-[#027148] hover:bg-[#013220]
                    text-white p-2 rounded-md transition-all ease-in-out duration-200' 
                    onClick={() => navigate('/add-product')}>
                    + Add Product
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto min-w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Product Image</th>
                            <th className="px-4 py-2">Product Company</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Created On</th>
                            <th className="px-4 py-2">Actions</th>
                            <th className="px-4 py-2">Out of Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((item, index) => {
                                return <>
                                    <InventoryTableRow product={item} index={index} />
                                </>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default InventoryTable