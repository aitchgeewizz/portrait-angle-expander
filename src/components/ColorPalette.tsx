
import React from 'react';
import { Color } from '../types';

interface ColorPaletteProps {
  colors: Color[];
  selectedColor: string;
  onColorSelect: (hex: string) => void;
  stepNumber: number;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors, selectedColor, onColorSelect, stepNumber }) => {
  return (
    <div className="flex flex-col items-center my-8">
      <h2 className="text-lg font-semibold mb-3 text-gray-300">{stepNumber}. Select a Studio Background Color</h2>
      <div className="flex justify-center gap-3 flex-wrap">
        {colors.map((color) => (
          <div key={color.hex} className="text-center">
            <button
              onClick={() => onColorSelect(color.hex)}
              className={`w-16 h-16 rounded-full ${color.twClass} border-2 transition-all duration-200 ${
                selectedColor === color.hex ? 'border-cyan-400 ring-4 ring-cyan-400/50' : 'border-gray-600 hover:border-gray-400'
              }`}
              aria-label={`Select color ${color.name}`}
            />
            <p className="text-xs mt-2 text-gray-400">{color.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
