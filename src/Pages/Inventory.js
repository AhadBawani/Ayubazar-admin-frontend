import React, { useEffect } from 'react'
import { getAllProductRequestHandler } from '../Requests/RequestHandler/ProductRequestHandler'
import { useDispatch } from 'react-redux'
import InventoryTable from '../Components/InventoryComponent/InventoryTable';
import useAdminState from '../Hooks/useAdminState';
import useComponentState from '../Hooks/useComponentState';
import DeleteProductDialog from '../Components/DialogBoxes/DeleteProductDialog';

const Inventory = () => {
    const dispatch = useDispatch();
    const { products } = useAdminState();
    const { dialog } = useComponentState();
    useEffect(() => {
        getAllProductRequestHandler(dispatch);
    }, [dispatch])
    return (
        <>
            <div>
                <InventoryTable products={products} />
            </div>
            {
                dialog?.open === 'delete-product'
                &&
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white rounded-md h-auto w-auto">
                        <DeleteProductDialog />
                    </div>
                </div>
            }
        </>
    )
}

export default Inventory;