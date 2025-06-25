import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, RotateCcw, Clock } from 'lucide-react';

export default function StopwatchClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState([]);
  const intervalRef = useRef(null);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Stopwatch logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setStopwatchTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const centiseconds = Math.floor((time % 1000) / 10);
    return minutes.toString().padStart(2, '0') + ':' + 
           seconds.toString().padStart(2, '0') + '.' + 
           centiseconds.toString().padStart(2, '0');
  };

  const formatCurrentTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatCurrentDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setStopwatchTime(0);
    setLapTimes([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLapTimes(prevLaps => [...prevLaps, stopwatchTime]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
          <Clock className="w-8 h-8" />
          Stopwatch & Clock
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Current Time Display */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Current Time</h2>
            <div className="text-center">
              <div className="text-6xl font-mono font-bold text-blue-300 mb-4 tracking-wider">
                {formatCurrentTime(currentTime)}
              </div>
              <div className="text-lg text-gray-300">
                {formatCurrentDate(currentTime)}
              </div>
              <div className="mt-4 text-sm text-gray-400">
                Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </div>
            </div>
          </div>

          {/* Stopwatch */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Stopwatch</h2>
            <div className="text-center">
              <div className="text-6xl font-mono font-bold text-green-300 mb-8 tracking-wider">
                {formatTime(stopwatchTime)}
              </div>
              
              <div className="flex justify-center gap-4 mb-6">
                {!isRunning ? (
                  <button
                    onClick={handleStart}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Play className="w-5 h-5" />
                    Start
                  </button>
                ) : (
                  <button
                    onClick={handleStop}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Pause className="w-5 h-5" />
                    Stop
                  </button>
                )}
                
                <button
                  onClick={handleLap}
                  disabled={!isRunning}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Square className="w-5 h-5" />
                  Lap
                </button>
                
                <button
                  onClick={handleReset}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lap Times */}
        {lapTimes.length > 0 && (
          <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Lap Times</h3>
            <div className="max-h-60 overflow-y-auto">
              <div className="space-y-2">
                {lapTimes.map((lapTime, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/5 rounded-lg p-3 border border-white/10">
                    <span className="text-gray-300 font-medium">Lap {index + 1}</span>
                    <span className="text-white font-mono text-lg">{formatTime(lapTime)}</span>
                    {index > 0 && (
                      <span className="text-gray-400 text-sm">
                        +{formatTime(lapTime - lapTimes[index - 1])}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Use the stopwatch to measure elapsed time with precision to centiseconds</p>
          <p>Current time updates automatically and shows your local timezone</p>
        </div>
      </div>
    </div>
  );
}