import React, { useCallback } from 'react';
import { ImageFile } from '../types';
import UploadIcon from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: ImageFile) => void;
  previewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, previewUrl }) => {
    
  const processFile = useCallback((file: File | null | undefined) => {
    if (!file) {
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      console.error('Unsupported file type:', file.type);
      alert(`Unsupported file type: ${file.type}. Please upload a PNG, JPG, or WEBP.`);
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      console.error('FileReader error');
      alert('There was an error reading the file.');
    };
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl || !dataUrl.includes(',')) {
        console.error('Invalid data URL');
        alert('Could not process the image file. It may be corrupt.');
        return;
      }
      
      const [header, base64] = dataUrl.split(',');
      const mimeType = header?.match(/:(.*?);/)?.[1];

      if (!base64 || !mimeType) {
        console.error('Could not parse data URL');
        alert('Could not process the image file. It may be corrupt.');
        return;
      }
      
      onImageUpload({ base64, mimeType });
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    processFile(event.target.files?.[0]);
  }, [processFile]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    processFile(event.dataTransfer.files?.[0]);
  }, [processFile]);


  return (
    <div className="w-full max-w-lg mx-auto">
      <label
        htmlFor="dropzone-file"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors duration-300 ${previewUrl ? 'p-2' : ''}`}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Uploaded portrait" className="object-contain h-full w-full rounded-md" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadIcon />
            <p className="mb-2 text-sm text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG or WEBP</p>
          </div>
        )}
        <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
      </label>
    </div>
  );
};

export default ImageUploader;
