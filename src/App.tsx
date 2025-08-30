
import React, { useState } from 'react';
import { ImageFile } from './types';
import { BACKGROUND_COLORS, VIEW_ANGLES, LIFESTYLE_ANGLES, ASPECT_RATIOS } from './constants';
import { generateAngleImage } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import ColorPalette from './components/ColorPalette';
import GeneratedImagesGrid from './components/GeneratedImagesGrid';
import Spinner from './components/Spinner';

type GenerationStyle = 'studio' | 'lifestyle';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(BACKGROUND_COLORS[0].hex);
  const [generationStyle, setGenerationStyle] = useState<GenerationStyle>('studio');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [originalAspectRatio, setOriginalAspectRatio] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: ImageFile) => {
    setImageFile(file);
    const url = `data:${file.mimeType};base64,${file.base64}`;
    setPreviewUrl(url);
    setGeneratedImages([]);
    setError(null);
    setOriginalAspectRatio(null); // Reset while loading

    const img = new Image();
    img.onload = () => {
      const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
      const commonDivisor = gcd(img.width, img.height);
      const ratioString = `${img.width / commonDivisor}:${img.height / commonDivisor}`;
      setOriginalAspectRatio(ratioString);
      setAspectRatio('original'); // Default to original when a new image is uploaded
    };
    img.onerror = () => {
      console.error("Could not load image to determine aspect ratio.");
      setOriginalAspectRatio(null);
    };
    img.src = url;
  };

  const handleGenerateClick = async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }
    if (generationStyle === 'studio' && !selectedColor) {
      setError('Please select a color for the studio background.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    const angles = generationStyle === 'studio' ? VIEW_ANGLES : LIFESTYLE_ANGLES;
    const currentAspectRatio = aspectRatio === 'original' && originalAspectRatio ? originalAspectRatio : aspectRatio;

    const generationPromises = angles.map(angle => 
      generateAngleImage({
        imageFile, 
        angleDescription: angle,
        style: generationStyle,
        backgroundColorHex: selectedColor,
        aspectRatio: currentAspectRatio,
      })
    );

    const results = await Promise.allSettled(generationPromises);

    const successfulImages = results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<string>).value);
      
    const failedReasons = results
      .filter(result => result.status === 'rejected')
      .map(result => (result as PromiseRejectedResult).reason.message);

    setGeneratedImages(successfulImages);

    if (failedReasons.length > 0) {
        setError(`Could not generate images for ${failedReasons.length} angle(s). Please try again.`);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Portrait Angle Expander
          </h1>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
            Turn one portrait into many. Upload a photo, choose a background, and let AI generate new perspectives.
          </p>
        </header>

        <main>
          <div className="bg-gray-800/50 rounded-xl shadow-2xl p-6 md:p-10 border border-gray-700">
            <section className="text-center mb-8">
                <h2 className="text-lg font-semibold mb-3 text-gray-300">1. Upload a Portrait</h2>
                <ImageUploader onImageUpload={handleImageUpload} previewUrl={previewUrl} />
            </section>
            
            <section className="text-center mb-8">
                <h2 className="text-lg font-semibold mb-3 text-gray-300">2. Select a Style</h2>
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        onClick={() => setGenerationStyle('studio')}
                        className={`px-6 py-2 text-sm font-medium transition-colors duration-200 rounded-l-lg border border-gray-600 focus:z-10 focus:ring-2 focus:ring-cyan-500 ${
                            generationStyle === 'studio' 
                            ? 'bg-cyan-600 text-white' 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        Studio
                    </button>
                    <button
                        type="button"
                        onClick={() => setGenerationStyle('lifestyle')}
                        className={`px-6 py-2 text-sm font-medium transition-colors duration-200 rounded-r-lg border-t border-b border-r border-gray-600 focus:z-10 focus:ring-2 focus:ring-cyan-500 ${
                            generationStyle === 'lifestyle' 
                            ? 'bg-cyan-600 text-white' 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        Lifestyle
                    </button>
                </div>
            </section>
            
            <section className="text-center mb-8">
                <h2 className="text-lg font-semibold mb-3 text-gray-300">3. Choose an Aspect Ratio</h2>
                <div className="flex flex-wrap justify-center gap-2" role="group">
                    {originalAspectRatio && (
                        <button
                            type="button"
                            onClick={() => setAspectRatio('original')}
                            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md border border-gray-600 focus:z-10 focus:ring-2 focus:ring-cyan-500 ${
                                aspectRatio === 'original'
                                ? 'bg-cyan-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            Original <span className="text-gray-300">({originalAspectRatio})</span>
                        </button>
                    )}
                    {ASPECT_RATIOS.map(ratio => (
                        <button
                            key={ratio}
                            type="button"
                            onClick={() => setAspectRatio(ratio)}
                            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md border border-gray-600 focus:z-10 focus:ring-2 focus:ring-cyan-500 ${
                                aspectRatio === ratio
                                ? 'bg-cyan-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {ratio}
                        </button>
                    ))}
                </div>
            </section>


            {generationStyle === 'studio' && (
              <section>
                  <ColorPalette stepNumber={4} colors={BACKGROUND_COLORS} selectedColor={selectedColor} onColorSelect={setSelectedColor} />
              </section>
            )}

            <section className="text-center my-8">
              <button
                onClick={handleGenerateClick}
                disabled={!imageFile || isLoading}
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-cyan-600 rounded-lg shadow-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300 transform hover:scale-105 disabled:scale-100"
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Generating...
                  </>
                ) : (
                  'Generate New Angles'
                )}
              </button>
            </section>
          </div>

          {error && (
            <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Oops! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <section className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-200">Results</h2>
            {isLoading && !generatedImages.length && (
                <div className="text-center py-10">
                    <div className="flex justify-center items-center mb-4">
                        <Spinner/>
                        <span className="text-xl text-gray-300 ml-3">Generating your portraits... this may take a moment.</span>
                    </div>
                    <p className="text-gray-400">AI is working on creating new perspectives.</p>
                </div>
            )}
            <GeneratedImagesGrid images={generatedImages} />
          </section>
        </main>

        <footer className="text-center py-10 mt-10 border-t border-gray-800">
            <p className="text-sm text-gray-500">Powered by Gemini AI</p>
        </footer>
      </div>
    </div>
  );
};

export default App;