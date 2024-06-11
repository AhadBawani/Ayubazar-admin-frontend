import React from 'react'
import Requests from '../../Requests/Requests/Request';
import { LuIndianRupee } from "react-icons/lu";

const DetailsCard = ({ value }) => {  
  return (
    <div className='h-[160px] shadow-md m-4 p-4 flex flex-col text-[#333] 
    font-bold hover:text-[#999] hover:bg-gray-50
    rounded-lg transition-all ease-in-out duration-200 bg-white'>
      <span>{value.text}</span>
      <div>
        {
          value.text === 'Best Saling Product'
            ?
            <>
              <div className='flex mt-4 items-center'>
                <div className='min-h-[90px] max-h-[90px] min-w-[90px] max-w-[90px] flex justify-center items-center rounded-md' style={{ border: '1px solid #ececec' }}>
                  <img className='min-h-[80px] max-h-[80px] min-w-[80px] max-w-[80px]' src={Requests.GET_PRODUCT_IMAGE + value?.value?.productImage} alt='Ayubazar' />
                </div>
                <div className='ml-2 flex flex-col flex-grow'>
                  <div style={{ maxWidth: '240px' }} className="whitespace-normal">
                    <span
                      className='text-[#333] hover:text-[#d0bdac]
                        cursor-pointer text-sm font-semibold overflow-hidden'
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2, // Limit to two lines
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {value?.value?.productName}
                    </span>
                  </div>
                </div>
              </div>
            </>
            :
            <>
              <div className='mt-12'>
                {
                  value.text === 'Total Sales'
                    ?
                    <div className='flex'>
                      <LuIndianRupee className='mt-1' />
                      <span>{value?.value.toLocaleString('en-IN')}</span>
                    </div>
                    :
                    <span>{value.value}</span>
                }
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default DetailsCard;