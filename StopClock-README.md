# ⏱️ Stopwatch & Clock

A beautiful, modern React stopwatch and clock application with a sleek glassmorphism design. Features real-time clock display, precision stopwatch with lap timing, and responsive design.

## ✨ Features

- **Real-time Clock**: Displays current time with automatic updates
- **Precision Stopwatch**: Accurate timing to centiseconds (0.01s)
- **Lap Timing**: Record and view multiple lap times with split differences
- **Modern UI**: Glassmorphism design with gradient backgrounds
- **Responsive**: Works seamlessly on desktop and mobile devices
- **Timezone Display**: Shows your local timezone information

## 🎯 Demo

![Stopwatch Demo](https://via.placeholder.com/800x600/1e293b/ffffff?text=Stopwatch+%26+Clock+Demo)

### Key Functionality
- ▶️ **Start/Stop**: Control stopwatch timing
- 🔄 **Reset**: Clear stopwatch and lap times
- 📊 **Lap**: Record split times during running sessions
- 🕐 **Live Clock**: Real-time display with date and timezone

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Valli544/INTERNSHIP-Tasks
   cd stopwatch-clock
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## 📦 Dependencies

```json
{
  "react": "^18.0.0",
  "lucide-react": "^0.263.1"
}
```

### Required Packages
- **React**: Core framework with hooks (useState, useEffect, useRef)
- **Lucide React**: Beautiful icons for UI elements
- **Tailwind CSS**: Utility-first CSS framework for styling

## 🏗️ Project Structure

```
stopwatch-clock/
├── src/
│   ├── components/
│   │   └── StopwatchClock.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── public/
│   ├── index.html
│   └── favicon.ico
├── package.json
└── README.md
```

## 💻 Usage

### Basic Implementation

```jsx
import React from 'react';
import StopwatchClock from './components/StopwatchClock';

function App() {
  return (
    <div className="App">
      <StopwatchClock />
    </div>
  );
}

export default App;
```

### Key Components

#### Time Formatting
- **Clock**: 24-hour format (HH:MM:SS)
- **Stopwatch**: Minutes:Seconds.Centiseconds (MM:SS.CC)
- **Date**: Full weekday, month, day, year format

#### Controls
- **Start**: Begin stopwatch timing
- **Stop**: Pause stopwatch (can be resumed)
- **Lap**: Record current time without stopping
- **Reset**: Clear stopwatch and all lap times

## 🎨 Customization

### Styling
The component uses Tailwind CSS classes. Key design elements:

```css
/* Background gradient */
bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900

/* Glassmorphism cards */
bg-white/10 backdrop-blur-lg border border-white/20

/* Button colors */
- Start: bg-green-500
- Stop: bg-red-500  
- Lap: bg-blue-500
- Reset: bg-orange-500
```

### Color Themes
You can easily customize the color scheme by modifying the Tailwind classes:

```jsx
// Example: Blue theme
className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900"
```

## 🔧 Technical Details

### Performance
- Uses `setInterval` with 10ms precision for stopwatch
- Efficient re-renders with React hooks
- Automatic cleanup of intervals on unmount

### Browser Compatibility
- Modern browsers supporting ES6+
- CSS Grid and Flexbox support required
- Backdrop-filter support for glassmorphism effect

## 📱 Responsive Design

The layout adapts to different screen sizes:
- **Desktop**: Two-column grid layout
- **Mobile**: Single-column stacked layout
- **Tablet**: Responsive grid with proper spacing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] Add timer/countdown functionality
- [ ] Save lap times to local storage
- [ ] Export lap times to CSV
- [ ] Add sound notifications
- [ ] Multiple stopwatch instances
- [ ] Dark/light theme toggle
- [ ] Keyboard shortcuts

## 🐛 Known Issues

- Lap time differences may show slight precision variations due to JavaScript timing
- Background blur may not work in older browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**PUSHPA VALLI**
- GitHub: [@valli544](https://github.com/valli544)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Lucide React](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- React team for the amazing framework

---

⭐ If you found this project helpful, please give it a star on GitHub!
