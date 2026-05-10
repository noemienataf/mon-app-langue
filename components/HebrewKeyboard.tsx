import React from 'react';

interface HebrewKeyboardProps {
  value: string;
  onChange: (value: string) => void;
}

export default function HebrewKeyboard({ value, onChange }: HebrewKeyboardProps) {
  // Disposition QWERTY hébraïque complète (clavier israélien standard)
  const rows = [
    ['ק', 'ו', 'ע', 'ר', 'ט', 'א', 'י', 'ו', 'פ'],
    ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ף'],
    ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת'],
  ];

  // Lettres finales (sofit)
  const sofitLetters = ['ך', 'ם', 'ן', 'ף', 'ץ'];

  return (
    <div className="mt-6 bg-gray-100 p-6 rounded-lg" dir="ltr">
      <p className="text-sm text-gray-600 mb-3">Clavier hébreu QWERTY:</p>

      {/* Affiche le texte saisi */}
      <div className="bg-white border-2 border-gray-300 rounded px-3 py-2 mb-4 text-right" dir="rtl">
        <p className="text-lg text-gray-800 font-semibold min-h-[32px]">{value || ' '}</p>
      </div>

      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2 mb-2">
          {row.map((letter, letterIndex) => (
            <button
              key={`${rowIndex}-${letterIndex}`}
              onClick={() => onChange(value + letter)}
              className="bg-white border border-gray-300 rounded px-4 py-2 hover:bg-blue-100 font-bold text-lg min-w-[44px]"
            >
              {letter}
            </button>
          ))}
        </div>
      ))}

      {/* Rangée des lettres finales (sofit) */}
      <div className="flex justify-center gap-2 mb-4">
        {sofitLetters.map((letter, index) => (
          <button
            key={`sofit-${index}`}
            onClick={() => onChange(value + letter)}
            className="bg-yellow-100 border border-yellow-400 rounded px-4 py-2 hover:bg-yellow-200 font-bold text-lg min-w-[44px]"
            title={`${letter} (lettre finale)`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Rangée de contrôle */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => onChange(value + ' ')}
          className="flex-1 max-w-xs bg-white border border-gray-300 rounded px-4 py-2 hover:bg-blue-100 font-bold"
        >
          Espace
        </button>
        <button
          onClick={() => onChange(value.slice(0, -1))}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition"
        >
          ← Backspace
        </button>
      </div>
    </div>
  );
}
