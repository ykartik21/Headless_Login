import React, { useState, useEffect } from 'react';

const TimerButton = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleClick = () => {
    setIsDisabled(true);
    setTimer(30); // Start the timer at 30 seconds
  };

  useEffect(() => {
    let interval;
    if (isDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsDisabled(false); // Enable the button again
    }
    return () => clearInterval(interval);
  }, [isDisabled, timer]);

  return (
    <div>
      <button onClick={handleClick} disabled={isDisabled}>
        {isDisabled ? `Wait ${timer} seconds` : 'Click Me'}
      </button>
    </div>
  );
};

export default TimerButton;
