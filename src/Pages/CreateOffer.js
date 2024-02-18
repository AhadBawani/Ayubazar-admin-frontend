import React from 'react'
import AddOfferForm from '../Forms/AddOfferForm';
import OfferCountdown from '../Components/OfferPageComponents/OfferCountdown';

const CreateOffer = () => {
    return (
        <div className='flex'>
            <div className='w-[50%]'>
                <AddOfferForm/>
            </div>
            <div className='flex justify-center border-l border-gray-400 w-[50%]'>
                <OfferCountdown />
            </div>
        </div>
    )
}

export default CreateOffer;