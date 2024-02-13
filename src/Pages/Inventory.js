import React, { useEffect } from 'react'
import { getAllProductRequestHandler } from '../Requests/RequestHandler/ProductRequestHandler'
import { useDispatch } from 'react-redux'
import InventoryTable from '../Components/InventoryComponent/InventoryTable';
import useAdminState from '../Hooks/useCouponState';

const Inventory = () => {
    const dispatch = useDispatch();
    const { products } = useAdminState();
    useEffect(() => {
        getAllProductRequestHandler(dispatch);
    }, [dispatch])
    return (
        <div>
            <InventoryTable products={products}/>
        </div>
    )
}

export default Inventory;