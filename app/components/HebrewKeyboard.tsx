'use client';

import { useState } from 'react';

interface HebrewKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}

const HEBREW_QWERTY = {
  row1: ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ף'],
  row2: ['ף', 'ם', 'ן', 'ת', 'א', 'ו', 'ב', 'ה', 'נ'],
  row3: ['ז', 'ס', 'ب', 'פ', 'ק', 'ר', 'ש'],
};

export default function HebrewKeyboard({ value, onChange, onSubmit }: HebrewKeyboardProps) {
  const [capsLock, setCapsLock] = useState(false);

  const handleKeyPress = (char: string) => {
    onChange(value + char);
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    onChange('');
  };

  const handleSpace = () => {
    onChange(value + ' ');
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 mt-4">
      <div className="mb-4">
        <input
          type="text"
          value={value}
          readOnly
          className="w-full border-2 border-blue-500 rounded px-3 py-2 text-lg font-semibold text-right"
          dir="rtl"
        />
      </div>

      <div className="space-y-2">
        <div className="flex gap-1 justify-center flex-wrap">
          {HEBREW_QWERTY.row1.map(char => (
            <button
              key={char}
              onClick={() => handleKeyPress(char)}
              className="bg-white hover:bg-blue-100 border border-gray-300 rounded px-3 py-2 font-semibold min-w-10 text-sm transition"
            >
              {char}
            </button>
          ))}
        </div>

        <div className="flex gap-1 justify-center flex-wrap">
          {HEBREW_QWERTY.row2.map(char => (
            <button
              key={char}
              onClick={() => handleKeyPress(char)}
              className="bg-white hover:bg-blue-100 border border-gray-300 rounded px-3 py-2 font-semibold min-w-10 text-sm transition"
            >
              {char}
            </button>
          ))}
        </div>

        <div className="flex gap-1 justify-center flex-wrap">
          {HEBREW_QWERTY.row3.map(char => (
            <button
              key={char}
              onClick={() => handleKeyPress(char)}
              className="bg-white hover:bg-blue-100 border border-gray-300 rounded px-3 py-2 font-semibold min-w-10 text-sm transition"
            >
              {char}
            </button>
          ))}
          <button
            onClick={handleSpace}
            className="bg-white hover:bg-blue-100 border border-gray-300 rounded px-4 py-2 text-sm transition flex-1 max-w-xs"
          >
            Espace
          </button>
        </div>

        <div className="flex gap-2 justify-center">
          <button
            onClick={handleBackspace}
            className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 text-sm transition font-semibold"
          >
            ← Backspace
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-500 hover:bg-gray-600 text-white rounded px-4 py-2 text-sm transition font-semibold"
          >
            Effacer
          </button>
          {onSubmit && (
            <button
              onClick={onSubmit}
              className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 text-sm transition font-semibold"
            >
              Valider
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
