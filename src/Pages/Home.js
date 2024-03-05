import React from 'react';
import DetailsCard from '../Components/HomePageComponents/DetailsCard';
import { MdInventory } from "react-icons/md";
import { MdLocalOffer } from "react-icons/md";
import { RiCouponFill } from "react-icons/ri";
import { FaFileInvoice } from "react-icons/fa";
import { SiBloglovin } from "react-icons/si";
import { TbReportSearch } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const details = [
        {
            id: 1,
            title: 'Total Sales',
            value: 15000,
            color: '#FF9096'
        },
        {
            id: 2,
            title: 'Total Order Complete',
            value: 149,
            color: '#A05AFF'
        },
        {
            id: 3,
            title: 'Current Order Pending',
            value: 95,
            color: '#3A9BE8'
        },
        {
            id: 4,
            title: 'Best Saling Product',
            value: null,
            color: '#41D3BF'
        }
    ]
    const actionOptions = [
        {
            id: 1,
            icon: <FaFileInvoice />,
            title: 'Orders',
            navigate: '/orders'
        },
        {
            id: 2,
            icon: <MdInventory />,
            title: 'Inventory',
            navigate: '/inventory'
        },
        {
            id: 3,
            icon: <MdLocalOffer />,
            title: 'Offers',
            navigate: '/create-offer'
        },
        {
            id: 4,
            icon: <RiCouponFill />,
            title: 'Coupons',
            navigate: '/coupons'
        },
        {
            id: 5,
            icon: <SiBloglovin />,
            title: 'Blogs',
            navigate: '/blogs'
        },
        {
            id: 6,
            icon: <TbReportSearch />,
            title: 'Reports',
            navigate: '/reports'
        }
    ]
    return (
        <div className='p-4 bg-gray-300'>
            <div className='grid grid-cols-4 gap-4'>
                {
                    details.map((item) => {
                        return <>
                            <DetailsCard value={item} />
                        </>
                    })
                }
            </div>
            <div className='mt-6 flex justify-center items-center'>
                <div className='grid grid-cols-3 gap-6 w-full max-w-4xl'>
                    {actionOptions.map((item, index) => (
                        <div key={index} className='flex flex-col justify-center items-center p-6 shadow-lg 
                            space-y-2 text-[#333] font-bold hover:text-[#999] hover:bg-gray-50
                            rounded-lg transition-all ease-in-out duration-200 bg-white
                            border border-gray-100 h-[140px] text-2xl cursor-pointer'
                            onClick={() => navigate(item.navigate)}>
                            <span className='text-3xl'>{item.icon}</span>
                            <span>{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Home;