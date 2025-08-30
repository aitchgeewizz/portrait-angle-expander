import React from 'react';
import DownloadIcon from './icons/DownloadIcon';

interface GeneratedImagesGridProps {
  images: string[];
}

const GeneratedImagesGrid: React.FC<GeneratedImagesGridProps> = ({ images }) => {
  if (images.length === 0) {
    return (
        <div className="text-center py-10 px-4">
            <h3 className="text-2xl font-bold text-gray-200">Your generated portraits will appear here</h3>
            <p className="text-gray-400 mt-2">Upload an image, pick a color, and click "Generate" to start.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((imageSrc, index) => (
        <div key={index} className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
          <img src={imageSrc} alt={`Generated portrait ${index + 1}`} className="w-full h-full object-cover" />
          <a
            href={imageSrc}
            download={`portrait-angle-${index + 1}.png`}
            className="absolute bottom-4 right-4 bg-gray-900/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
            aria-label={`Download image ${index + 1}`}
            title="Download Image"
          >
            <DownloadIcon />
          </a>
        </div>
      ))}
    </div>
  );
};

export default GeneratedImagesGrid;
