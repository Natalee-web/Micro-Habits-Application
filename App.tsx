
import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { Habit } from './types';
import HabitSetup from './components/HabitSetup';
import HabitTracker from './components/HabitTracker';

const App: React.FC = () => {
  const [habit, setHabit] = useLocalStorage<Habit | null>('micro-habit', null);

  const handleSetHabit = (habitText: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const newHabit: Habit = {
      text: habitText,
      startDate: today.toISOString(),
      completedDays: Array(7).fill(false),
    };
    setHabit(newHabit);
  };

  const handleResetHabit = () => {
    setHabit(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
          Micro<span className="text-indigo-600">Habits</span>
        </h1>
        <p className="text-gray-500 mt-2">Build tiny habits, one week at a time.</p>
      </header>
      <main className="w-full">
        {habit ? (
          <HabitTracker 
            habit={habit} 
            onUpdateHabit={setHabit} 
            onResetHabit={handleResetHabit} 
          />
        ) : (
          <HabitSetup onHabitSet={handleSetHabit} />
        )}
      </main>
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Your progress is saved in your browser.</p>
      </footer>
    </div>
  );
};

export default App;
