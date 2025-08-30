# Portrait Angle Expander

Transform one portrait into multiple professional angles with AI-powered generation and customizable backgrounds.

![Portrait Angle Expander](https://img.shields.io/badge/AI-Powered-blue) ![React](https://img.shields.io/badge/React-18-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38b2ac)

## ✨ Features

- **AI-Powered Portrait Generation**: Uses Google's Gemini 2.5 Flash Image model for high-quality portrait transformation
- **Multiple Generation Modes**:
  - **Studio Mode**: Professional studio portraits with customizable solid color backgrounds
  - **Lifestyle Mode**: Candid, editorial-style portraits in realistic environments
- **Flexible Aspect Ratios**: Support for 1:1, 3:4, 4:3, 9:16, 16:9, and original image ratios
- **Professional Color Palette**: Curated selection of background colors for studio mode
- **Drag & Drop Upload**: Easy image upload with support for PNG, JPG, and WEBP formats
- **Batch Generation**: Generate multiple angle variations simultaneously
- **Download Ready**: Generated images ready for immediate download and use

## 🚀 Live Demo

Visit the live application: [Portrait Angle Expander](https://github.com/aitchgeewizz/portrait-angle-expander)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini 2.5 Flash Image (Nano Banana)
- **API**: Google AI Studio / Gemini API

## 📋 Prerequisites

- Node.js 18+ and npm
- Google AI Studio API key ([Get one here](https://aistudio.google.com/apikey))

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aitchgeewizz/portrait-angle-expander.git
   cd portrait-angle-expander
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Google AI API key:
   ```env
   VITE_GEMINI_API_KEY=your_google_ai_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🎯 How to Use

1. **Upload a Portrait**: Drag and drop or click to upload a portrait image (PNG, JPG, or WEBP)
2. **Choose Style**: 
   - **Studio**: Professional studio portraits with solid color backgrounds
   - **Lifestyle**: Candid, editorial-style portraits in realistic settings
3. **Select Aspect Ratio**: Choose from standard ratios or keep the original
4. **Pick Background Color** (Studio mode only): Select from the curated color palette
5. **Generate**: Click "Generate New Angles" to create multiple portrait variations
6. **Download**: Save the generated images for your projects

## 🎨 Generation Modes

### Studio Mode
Generates professional studio portraits with:
- Solid, uniform background colors
- Soft, flattering lighting
- Clean, full-bleed photographs
- Professional portrait angles

### Lifestyle Mode
Creates candid, editorial-style portraits featuring:
- Realistic environmental settings
- Natural lighting and depth of field
- Authentic, non-posed moments
- Editorial composition

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── icons/           # Icon components
│   ├── ColorPalette.tsx # Color selection component
│   ├── GeneratedImagesGrid.tsx
│   ├── ImageUploader.tsx
│   └── Spinner.tsx
├── services/
│   └── geminiService.ts # Google AI API integration
├── constants.ts         # App constants and configurations
├── types.ts            # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🔧 Configuration

### Environment Variables

- `VITE_GEMINI_API_KEY`: Your Google AI Studio API key

### Customization

- **Colors**: Edit `BACKGROUND_COLORS` in `src/constants.ts`
- **Angles**: Modify `VIEW_ANGLES` and `LIFESTYLE_ANGLES` in `src/constants.ts`
- **Aspect Ratios**: Update `ASPECT_RATIOS` in `src/constants.ts`

## 🎭 Portrait Angles

### Studio Angles
- Direct front-on portrait
- Three-quarter angle side view
- Confident pose with arms folded
- Thoughtful expression with hand gesture
- Close-up with hand on neck
- Seated three-quarter body shot

### Lifestyle Angles
- Working on laptop in modern office
- Thoughtful close-up in office setting
- Relaxed on office lounge sofa
- Over-the-shoulder with tablet
- Outdoor portrait against textured wall
- Walking through open-plan office

## 💰 API Costs

Google Gemini 2.5 Flash Image pricing:
- $30.00 per 1 million output tokens
- Each generated image = 1,290 tokens
- Cost per image ≈ $0.039

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variable `VITE_GEMINI_API_KEY` in Netlify dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google AI team for the Gemini 2.5 Flash Image model
- React and Vite communities
- Tailwind CSS team

## 📞 Support

- Create an issue on [GitHub](https://github.com/aitchgeewizz/portrait-angle-expander/issues)
- Check the [Google AI documentation](https://ai.google.dev/gemini-api/docs/image-generation)

---

Built with ❤️ using Google's Gemini AI and modern web technologies.