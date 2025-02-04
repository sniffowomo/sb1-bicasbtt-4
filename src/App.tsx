import React, { useState, KeyboardEvent, useEffect } from 'react';
import { generateSHA512, extractHashFromResponse, type HashResponse, type JsonResponse } from './utils/crypto';
import { AlertCircle } from 'lucide-react';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [displayedResult, setDisplayedResult] = useState('');
  const [showError, setShowError] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (result) {
      setIsTyping(true);
      setDisplayedResult('');
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < result.length) {
          setDisplayedResult(prev => prev + result[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 5);
    }
  }, [result]);

  const handleSubmit = async () => {
    if (!input.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    try {
      // Example of how to use your own complex function:
      // const response = await yourComplexFunction(input);
      // const hash = extractHashFromResponse(response);
      // setResult(hash);

      // For now, using the default hash function:
      const hash = await generateSHA512(input);
      setResult(hash);
    } catch (error) {
      console.error('Error processing hash:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-cyan-900 
                    flex items-center justify-center p-4 font-['Orbitron']">
      {showError && (
        <div className="fixed top-4 right-4 left-4 md:left-auto bg-red-900/90 text-red-100 
                      px-4 sm:px-6 py-3 sm:py-4 rounded-lg 
                      shadow-[0_0_30px_rgba(220,38,38,0.3)] backdrop-blur-sm
                      animate-[slideIn_0.5s_ease-out] flex items-center gap-3
                      border border-red-700 text-sm sm:text-base">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="font-['Share_Tech_Mono']">Input required</span>
        </div>
      )}
      
      <div className="w-full max-w-md space-y-6 sm:space-y-8 px-4 sm:px-0">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-2xl 
                      border border-cyan-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-transparent bg-clip-text 
                         bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 sm:mb-8
                         tracking-wider">
              SHA-512 GENERATOR
            </h1>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter text to hash..."
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-slate-900/80 text-cyan-100 
                           border border-cyan-500/30 placeholder-slate-400 text-sm sm:text-base
                           focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-400 
                           transition-all duration-300 outline-none
                           font-['Share_Tech_Mono']"
                  aria-label="Text to hash"
                />
                <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100
                              transition-all duration-300 -top-12 left-1/2 -translate-x-1/2
                              bg-cyan-900/90 text-cyan-100 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm
                              whitespace-nowrap shadow-xl border border-cyan-500/30
                              backdrop-blur-sm font-['Share_Tech_Mono'] max-w-[90vw] sm:max-w-none
                              text-center">
                  Enter any text to generate its SHA-512 hash
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 
                                border-8 border-transparent border-t-cyan-900/90"></div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white 
                         font-semibold text-sm sm:text-base
                         py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg 
                         hover:scale-[1.02] sm:hover:scale-105 hover:from-cyan-500 hover:to-purple-500 
                         transition-all duration-300 ease-in-out
                         hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]
                         active:scale-95 tracking-wider"
              >
                GENERATE HASH
              </button>

              {result !== null && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-slate-900/80 rounded-lg border border-cyan-500/30 
                              shadow-lg shadow-cyan-900/30 transition-all duration-300
                              animate-[slideUp_0.5s_ease-out]">
                  <h2 className="text-xs sm:text-sm font-semibold text-cyan-300 mb-1.5 sm:mb-2 tracking-wider">
                    SHA-512 HASH:
                  </h2>
                  <p className="text-xs sm:text-sm text-cyan-100 break-all font-['Share_Tech_Mono'] relative">
                    {displayedResult}
                    {isTyping && (
                      <span className="absolute ml-1 -mt-0.5 w-1.5 sm:w-2 h-3 sm:h-4 bg-cyan-400 
                                     animate-[blink_1s_infinite]"></span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;