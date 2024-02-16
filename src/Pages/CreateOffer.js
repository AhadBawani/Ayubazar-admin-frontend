import React from 'react'
import AddOfferForm from '../Forms/AddOfferForm';
import OfferTable from '../Components/OfferPageComponents/OfferTable';

const CreateOffer = () => {
    return (
        <div className='flex'>
            <div className='w-[40%]'>
                <AddOfferForm/>
            </div>
            <div className='flex justify-center border-l border-gray-400 w-[60%]'>
                <OfferTable />
            </div>
        </div>
    )
}

export default CreateOffer;