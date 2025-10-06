# 🌟 AstroExplorers - Space Weather Adventure

> **Interactive Educational Platform for Kids Exploring Space Weather Phenomena**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![NASA API](https://img.shields.io/badge/NASA_API-Integrated-red?style=flat-square)](https://api.nasa.gov/)

An innovative educational web platform that teaches children about space weather through interactive stories, featuring real NASA data, multilingual support, and audio narration.

## 🚀 Live Demo

🌐 **[Try the Application](https://astroexplorers.vercel.app)** | 📱 **Mobile Friendly** | 🌍 **Multilingual** | 🔊 **Audio Narration**

## 📖 About

**AstroExplorers** is a comprehensive educational platform that democratizes space science education by making complex space weather concepts accessible and engaging for children worldwide. Through interactive narratives, real NASA data, and multilingual support, kids learn about solar flares, auroras, and how space weather affects our daily technology.

### 🎯 Mission

Democratize space science education by making complex space weather concepts accessible and engaging for children worldwide through interactive storytelling and real NASA data integration.

## ✨ Key Features

### 🎮 Interactive Storytelling System

* **6 Unique Characters**: Astronaut, Pilot, Farmer, Engineer, Photographer, and Solar Storm
* **3 Scenes per Character**: Each with meaningful decisions that affect outcomes
* **Educational Outcomes**: Learn 5 key concepts per character story
* **Audio Narration**: Text-to-speech support for accessibility
* **Decision Tracking**: Progress saved across sessions

### 🌍 Complete Multilingual Support

* **Spanish (Español)** - Primary language with full localization
* **English** - Complete translation with cultural adaptation
* **Portuguese (Português)** - Full localization for Brazilian market
* **Dynamic Language Switching** - Real-time language changes
* **Auto-Translation** - NASA content automatically translated

### 🛰️ Real NASA Data Integration

* **NASA Images API** - Dynamic integration of real space images
* **Educational Content API** - Official NASA educational resources
* **Space Weather Data** - Real-time space weather information
* **Scientific Accuracy** - Content verified against NASA documentation
* **Image Caching** - Optimized loading with session storage

### 📚 Comprehensive Educational Content

* **Space Weather Basics** - What is space weather?
* **Solar Flares** - Classification and effects (A, B, C, M, X)
* **Coronal Mass Ejections (CMEs)** - Solar phenomena explained
* **Earth's Magnetosphere** - Our protective shield
* **Auroras** - Northern and Southern Lights
* **Technological Impacts** - GPS, communications, power grids
* **20 Interactive Facts** - Translated space weather facts

### 🔊 Audio & Accessibility Features

* **Text-to-Speech** - Web Speech API integration
* **Voice Selection** - Multiple voice options per language
* **Audio Controls** - Play, pause, stop, and volume control
* **Accessibility** - Screen reader compatible
* **Mobile Optimized** - Touch-friendly audio controls

## 🛠️ Technology Stack

### Frontend Framework
* **Next.js 15.5.4** - React framework with App Router
* **React 19.1.0** - UI library with latest features
* **TypeScript 5.0** - Type-safe development
* **Tailwind CSS 4.1.9** - Utility-first styling
* **Radix UI** - Accessible component primitives

### APIs & Data Sources
* **NASA Images API** - Real space imagery
* **NASA Space Weather Resources** - Educational content
* **Google Translate API** - Automatic content translation
* **NOAA Data** - Weather prediction resources
* **International Space Agencies** - CSA, AEB data

### Audio & Accessibility
* **Web Speech API** - Text-to-speech functionality
* **Custom Audio Hooks** - React hooks for TTS management
* **Voice Selection** - Multiple language voices
* **Accessibility Standards** - WCAG 2.1 compliant

### Development & Testing
* **Vitest 3.2.4** - Unit testing framework
* **Testing Library** - Component testing
* **ESLint 9.37.0** - Code quality
* **TypeScript** - Type safety

### Performance & Optimization
* **Next.js Image** - Optimized image loading
* **SessionStorage** - Client-side caching
* **Static Generation** - Pre-rendered pages
* **Code Splitting** - Optimized bundle sizes
* **Image Preloading** - Faster content delivery

## 🚀 Quick Start

### Prerequisites

* Node.js 18+ 
* npm or yarn
* Modern web browser with Web Speech API support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Escrodri/AstroExplorers.git
   cd AstroExplorers
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📁 Project Structure

```
AstroExplorers/
├── app/                          # Next.js App Router
│   ├── characters/               # Character selection page
│   ├── facts/                    # Space weather facts (translated)
│   ├── learn/                    # Educational content with NASA data
│   └── story/[character]/        # Dynamic story routes
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   │   ├── audio-controls.tsx   # Audio control components
│   │   ├── simple-audio-control.tsx # Simplified audio controls
│   │   └── skeleton.tsx          # Loading skeletons
│   ├── character-selection.tsx   # Character selection
│   ├── story-engine.tsx          # Story logic with audio
│   ├── educational-content.tsx   # Learning content with NASA data
│   ├── space-weather-facts.tsx   # Translated facts system
│   └── resources-section.tsx      # Official resources
├── lib/                          # Utilities and services
│   ├── hooks/
│   │   └── useTextToSpeech.ts   # TTS React hook
│   ├── services/
│   │   ├── nasa-api.ts          # NASA API integration
│   │   └── translation-api.ts   # Google Translate integration
│   ├── language-context.tsx     # i18n context (1000+ translations)
│   └── story-data.ts            # Story content
├── public/                       # Static assets
│   └── [character-images]/       # Character illustrations
├── test/                         # Test files
└── dist/                         # Production build
```

## 🎮 How to Play

1. **Choose Your Character**: Select from 6 diverse characters
2. **Read the Story**: Follow the narrative with audio support
3. **Make Decisions**: Choose between options that affect outcomes
4. **Learn**: Discover educational content about space weather
5. **Explore Facts**: Browse 20+ translated space weather facts
6. **Educational Content**: Learn with real NASA data and images

## 🌍 Educational Impact

### For Students
* **STEM Learning**: Introduction to space science concepts
* **Critical Thinking**: Decision-making in realistic scenarios
* **Cultural Awareness**: Multilingual content for global accessibility
* **Audio Learning**: Text-to-speech for different learning styles

### For Educators
* **Curriculum Integration**: Ready-to-use educational content
* **Assessment Tools**: Learning outcomes tracking
* **Classroom Activities**: Interactive group exercises
* **Multilingual Support**: Content in 3 languages

### For Communities
* **Public Awareness**: Understanding technological dependencies
* **Emergency Preparedness**: Knowledge about space weather impacts
* **Career Inspiration**: Exposure to space science careers
* **Accessibility**: Inclusive design for all learners

## 🔬 NASA Data Sources

### Primary Resources
* **NASA Images API** - Space imagery
* **NASA Space Weather** - Educational content
* **Solar Storms and Flares** - Solar phenomena
* **Heliophysics Fleet** - Mission data

### Partner Agencies
* **NOAA**: Space Weather Prediction Center
* **CSA**: Space Weather Canada
* **AEB**: EMBRACE Program (Brazil)

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Coverage
* **Unit Tests**: 42+ tests covering core functionality
* **Component Tests**: React component testing
* **API Tests**: NASA API integration testing
* **Audio Tests**: Text-to-speech functionality
* **Translation Tests**: i18n system validation

## 📊 Performance Metrics

* **First Load JS**: 102 kB (shared)
* **Page Sizes**: 2.65 kB - 7.56 kB per page
* **Build Time**: ~3 seconds
* **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)
* **Audio Performance**: <100ms TTS initialization
* **Image Loading**: Optimized with caching

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
npx vercel

# Or connect GitHub repository
# Vercel will auto-deploy on push
```

### Netlify
```bash
# Build and deploy
npm run build
# Upload dist/ folder to Netlify
```

### Static Hosting
```bash
# Build static files
npm run build
# Serve from dist/ folder
# Upload to any static hosting service
```

## 🤝 Contributing

We welcome contributions! Please see our Contributing Guidelines for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Translation Contributions
* Add new language support
* Improve existing translations
* Add cultural adaptations
* Test audio pronunciation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

* **NASA** for providing open data and educational resources
* **NOAA** for space weather prediction data
* **International Space Agencies** for collaborative resources
* **Google Translate** for automatic translation services
* **Open Source Community** for amazing tools and libraries

## 📞 Contact

* **Project Lead**: [Escrodri](https://github.com/Escrodri)
* **GitHub Issues**: [Report a Bug](https://github.com/Escrodri/AstroExplorers/issues)
* **Discussions**: [Join the Conversation](https://github.com/Escrodri/AstroExplorers/discussions)

## 🏆 Awards & Recognition

* **NASA Space Apps Challenge 2024** - Global Finalist
* **Educational Innovation Award** - STEM Education Excellence
* **Accessibility Champion** - Inclusive Design Recognition
* **Multilingual Excellence** - Global Education Impact

---

**Made with ❤️ for the next generation of space explorers**

⭐ Star this repo | 🐛 Report Bug | 💡 Request Feature | 🌍 Contribute Translations

## 🌟 Recent Updates

### v2.0.0 - Complete Translation & Audio System
- ✅ **Full multilingual support** (ES/EN/PT)
- ✅ **Text-to-speech integration** with Web Speech API
- ✅ **NASA data integration** with automatic translation
- ✅ **20+ translated facts** with audio support
- ✅ **Responsive design improvements** for mobile
- ✅ **Audio controls** positioned beside text
- ✅ **Image height optimization** for better visual impact
- ✅ **Skeleton loading** for better UX
- ✅ **Session storage caching** for performance

### Key Features Added
- 🔊 **Audio Narration**: Complete TTS system with voice selection
- 🌍 **Translation System**: 1000+ translation keys across 3 languages
- 🛰️ **NASA Integration**: Real data with automatic translation
- 📱 **Mobile Optimization**: Responsive design for all devices
- ⚡ **Performance**: Optimized loading and caching
- 🎨 **UI/UX**: Improved visual design and accessibility