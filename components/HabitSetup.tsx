
import React, { useState } from 'react';

interface HabitSetupProps {
  onHabitSet: (habitText: string) => void;
}

const HabitSetup: React.FC<HabitSetupProps> = ({ onHabitSet }) => {
  const [habitText, setHabitText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitText.trim()) {
      onHabitSet(habitText.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">One Week, One Habit</h2>
        <p className="text-gray-600 mb-6">What small habit will you focus on this week?</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={habitText}
            onChange={(e) => setHabitText(e.target.value)}
            placeholder="e.g., Drink a glass of water first thing"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            aria-label="New habit"
          />
          <button
            type="submit"
            disabled={!habitText.trim()}
            className="w-full mt-4 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            Start My Week
          </button>
        </form>
      </div>
    </div>
  );
};

export default HabitSetup;
