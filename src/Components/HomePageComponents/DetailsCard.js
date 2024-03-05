import React from 'react'

const DetailsCard = ({ value }) => {
  return (
    <div className='h-[160px] rounded-lg shadow-md m-4 p-4 flex flex-col'
      style={{ backgroundColor: value.color }} id={value.id}>
      <span>{value.title}</span>
      <span className='mt-12'>{value.value}</span>
    </div>
  )
}

export default DetailsCard;