import React from 'react';
import { cn } from '@/lib/utils';

interface DateSelectorProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export function DateSelector({ selectedDate, onSelectDate }: DateSelectorProps) {
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  });

  return (
    <div className="flex justify-between items-center bg-gray-100 p-2 rounded-lg mb-4 overflow-x-auto">
      {dates.map(date => (
        <button
          key={date}
          onClick={() => onSelectDate(date)}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
            selectedDate === date
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-700 hover:bg-gray-200"
          )}
        >
          {date === new Date().toISOString().split('T')[0] ? '今天' : date.substring(5)}
        </button>
      ))}
    </div>
  );
}
