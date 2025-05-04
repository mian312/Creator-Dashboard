import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const DailyRewardButton = ({ onClaim, disabled }) => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [timeUntilNextClaim, setTimeUntilNextClaim] = useState(null);
  const [lastClaimed, setLastClaimed] = useState(null);
  const { lastRewardDate } = useSelector(state => state.user);
  
  // Check if rewards were claimed today
  useEffect(() => {
    const lastClaimedDate = lastRewardDate;
    if (lastClaimedDate) {
      setLastClaimed(new Date(lastClaimedDate));
      
      const now = new Date();
      const claimed = new Date(lastClaimedDate);
      
      // Check if it's the same day
      if (now.toDateString() === claimed.toDateString()) {
        setTimeUntilNextClaim({
          hours: 23 - now.getHours() + claimed.getHours(),
          minutes: 60 - now.getMinutes() + claimed.getMinutes(),
        });
      }
    }
  }, []);

  const handleClaimReward = async () => {
    if (disabled || isClaiming || timeUntilNextClaim !== null) return;
    
    setIsClaiming(true);
    
    try {
      // Generate a random reward between 10 and 50
      const reward = Math.floor(Math.random() * 41) + 10;
      setRewardAmount(reward);
      
      // Call the actual claim function passed from parent
      await onClaim();
      
      // Save the current time to localStorage
      const now = new Date();
      setLastClaimed(now);
      
      // Set a cooldown until rewards can be claimed again (24 hours)
      setTimeUntilNextClaim({ hours: 23, minutes: 59 });
      
      // Show success animation
      setClaimSuccess(true);
      setTimeout(() => {
        setClaimSuccess(false);
      }, 3000);
    } catch (error) {
      // console.error("Failed to claim daily reward:", error);
    } finally {
      setIsClaiming(false);
    }
  };

  // Update the countdown timer every minute
  useEffect(() => {
    if (!timeUntilNextClaim) return;
    
    const timer = setInterval(() => {
      if (timeUntilNextClaim.hours === 0 && timeUntilNextClaim.minutes === 0) {
        setTimeUntilNextClaim(null);
        clearInterval(timer);
        return;
      }
      
      let { hours, minutes } = timeUntilNextClaim;
      
      if (minutes === 0) {
        hours--;
        minutes = 59;
      } else {
        minutes--;
      }
      
      setTimeUntilNextClaim({ hours, minutes });
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, [timeUntilNextClaim]);

  return (
    <div className="relative">
        <button 
          onClick={handleClaimReward}
          disabled={disabled || isClaiming}
          className={`relative w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-all ${
            disabled || isClaiming 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-md hover:shadow-lg hover:from-yellow-500 hover:to-amber-600 transform hover:-translate-y-0.5'
          }`}
        >
          {isClaiming ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Claiming...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Claim Daily Bonus
            </>
          )}
        </button>
    </div>
  );
};

export default DailyRewardButton;
