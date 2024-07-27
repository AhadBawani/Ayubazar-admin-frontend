import React, { useState, useEffect } from 'react';
import useAdminState from '../../Hooks/useAdminState';

const OfferCountdown = () => {
  const { discount } = useAdminState();
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    if (!discount || !discount.expiryDate) return;

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const expiryTime = new Date(discount.expiryDate).getTime();
      let distance = expiryTime - now;

      // Check if the expiry time has passed
      if (distance < 0) {
        clearInterval(intervalId);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update the timeLeft state
      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [discount]);

  return (
    <>
      {
        discount
          ?
          <>
            <div className="flex flex-col items-start justify-center">
              <div className='flex justify-center items-center ml-4 font-semibold mt-8'>
                <span>OFFER EXPIRE IN : </span>
              </div>
              <div className='flex items-center justify-center space-x-2'>
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="flex flex-col items-center">
                    <div className="text-2xl font-semibold animate-pulse">{value}</div>
                    <div className="text-xs font-semibold">{unit}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
          :
          <>
            <div className='flex justify-center items-center ml-4 font-semibold mt-8'>
              <span>CURRENTLY NO OFFER</span>
            </div>
          </>
      }
    </>
  );
};

export default OfferCountdown;
