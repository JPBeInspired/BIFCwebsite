import { useState, useEffect } from 'react';

interface DynamicCounterProps {
  baseValue: number;
  minIncrease: number;
  maxIncrease: number;
}

export default function DynamicCounter({ baseValue, minIncrease, maxIncrease }: DynamicCounterProps) {
  const [count, setCount] = useState(baseValue);

  useEffect(() => {
    // Get the initial date and stored count
    const storedData = localStorage.getItem('trainerCount');
    const data = storedData ? JSON.parse(storedData) : { date: new Date().toDateString(), count: baseValue };
    
    // Check if it's a new day
    if (data.date !== new Date().toDateString()) {
      // Generate random increase
      const increase = Math.floor(Math.random() * (maxIncrease - minIncrease + 1)) + minIncrease;
      const newCount = data.count + increase;
      
      // Store new count and date
      const newData = { date: new Date().toDateString(), count: newCount };
      localStorage.setItem('trainerCount', JSON.stringify(newData));
      setCount(newCount);
    } else {
      setCount(data.count);
    }
  }, [baseValue, minIncrease, maxIncrease]);

  return (
    <span className="text-3xl font-bold text-accent-primary">{count.toLocaleString()}</span>
  );
}