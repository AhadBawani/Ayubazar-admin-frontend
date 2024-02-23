import React from 'react'
import InventoryTableRow from './InventoryTableRow'


const InventoryTable = ({ products }) => {
    return (
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
    )
}

export default InventoryTable