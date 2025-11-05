
import React from 'react';
import { Habit } from '../types';
import { CheckIcon, SparklesIcon } from './icons';

interface HabitTrackerProps {
  habit: Habit;
  onUpdateHabit: (updatedHabit: Habit) => void;
  onResetHabit: () => void;
}

const HabitTracker: React.FC<HabitTrackerProps> = ({ habit, onUpdateHabit, onResetHabit }) => {
  const getTodayIndex = () => {
    const start = new Date(habit.startDate);
    const today = new Date();
    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const todayIndex = getTodayIndex();
  const isWeekOver = todayIndex >= 7;

  const handleMarkAsDone = () => {
    if (todayIndex >= 0 && todayIndex < 7) {
      const updatedCompletedDays = [...habit.completedDays];
      updatedCompletedDays[todayIndex] = true;
      onUpdateHabit({ ...habit, completedDays: updatedCompletedDays });
    }
  };

  const dayLabels = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'];

  if (isWeekOver) {
    return (
      <div className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 text-center flex flex-col items-center">
        <SparklesIcon className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Week Complete!</h2>
        <p className="text-gray-600 mb-6">Amazing work sticking with your habit. Ready for a new challenge?</p>
        <button
          onClick={onResetHabit}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105"
        >
          Start a New Habit
        </button>
      </div>
    );
  }

  const isTodayCompleted = todayIndex >= 0 && todayIndex < 7 && habit.completedDays[todayIndex];

  return (
    <div className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8">
      <p className="text-gray-500 text-sm font-medium text-center">THIS WEEK'S FOCUS</p>
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center my-4 break-words">
        {habit.text}
      </h2>

      <div className="flex justify-between items-center my-8">
        {habit.completedDays.map((isCompleted, index) => {
          const isCurrentDay = index === todayIndex;
          let circleClass = 'w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full font-bold transition-all';
          if (isCompleted) {
            circleClass += ' bg-green-500 border-2 border-green-600 text-white';
          } else if (isCurrentDay) {
            circleClass += ' border-4 border-indigo-500 bg-indigo-100 text-indigo-600';
          } else {
            circleClass += ' border-2 border-gray-300 bg-gray-100 text-gray-400';
          }
          return (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className={circleClass}>
                {isCompleted ? <CheckIcon className="w-6 h-6" /> : index + 1}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleMarkAsDone}
        disabled={isTodayCompleted}
        className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:scale-100"
      >
        {isTodayCompleted ? 'Completed for Today!' : 'Mark Today Complete'}
      </button>
    </div>
  );
};

export default HabitTracker;
