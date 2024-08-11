import React, { useState } from 'react';
import Sidebar from '../Components/OrdersPageComponents/Sidebar';
import PendingOrders from '../Components/OrdersPageComponents/PendingOrders';
import CancellationOrders from '../Components/OrdersPageComponents/CancellationOrders';
import OnTheWayOrders from '../Components/OrdersPageComponents/OnTheWayOrders';
import DeleteOrders from '../Components/OrdersPageComponents/DeleteOrders';
import { useLocation } from 'react-router-dom';
import useComponentState from '../Hooks/useComponentState';
import ConfirmationDialog from '../Components/OrdersPageComponents/Dialogs/ConfirmationDialog';
import OrdersToExcel from '../Components/OrdersPageComponents/OrdersToExcel';

const Orders = () => {
  const [state, setState] = useState('pending-orders');
  const { dialog } = useComponentState();
  const location = useLocation();  
  return (
    <>
      <div className='flex pt-8'>
        <div className='w-[400px] sm:block hidden'>
          <Sidebar state={state} setState={setState} />
        </div>
        <div className='sm:mt-4 sm:ml-8 w-full'>
          {state === "pending-orders" && <PendingOrders />}
          {state === "cancel-orders" && <CancellationOrders />}
          {state === "on-the-way-orders" && <OnTheWayOrders />}
          {state === "delete-orders" && <DeleteOrders />}
          {state === "orders-excel" && <OrdersToExcel />}
        </div>
      </div>
      {
        location.pathname === '/orders' && dialog?.open
        &&
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white rounded-md h-auto w-auto">
            <ConfirmationDialog />
          </div>
        </div>
      }
    </>
  );
}

export default Orders;