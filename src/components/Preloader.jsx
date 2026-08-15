import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const Preloader = ({ onFinished }) => {
  const [typedText, setTypedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const fullText = "paulovianatech.dev";

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (showContent) {
      if (typedText.length < fullText.length) {
        const typingTimer = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, 120);
        return () => clearTimeout(typingTimer);
      } else if (typedText.length === fullText.length) {
        const exitTimer = setTimeout(() => {
          setFadeOut(true);
          setTimeout(onFinished, 1000);
        }, 800);
        return () => clearTimeout(exitTimer);
      }
    }
  }, [typedText, showContent, fullText, onFinished]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <MotionDiv
          exit={{
            opacity: 0,
            filter: 'blur(10px)',
            transition: { duration: 1, ease: 'easeInOut' }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center dark:text-white text-slate-800 dark:bg-[#060010] bg-zinc-50"
        >
          {showContent && (
            <MotionDiv
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
              className="text-center relative z-10 p-4"
            >
              <MotionH1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } }}
                className="text-4xl md:text-6xl font-display font-bold mb-4"
              >
                Paulo Viana
              </MotionH1>
              <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.5 } }}
                className="font-cascadia text-lg md:text-xl dark:text-gray-400 text-slate-500 mb-8 break-all"
              >
                <span>{typedText}</span>
                <span className="animate-blink">|</span>
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8 } }}
                className="flex justify-center gap-6"
              >
                <a href="https://github.com/PauloVianaTech" target="_blank" rel="noopener noreferrer" className="dark:hover:text-[#00ffdc] hover:text-cyan-600 transition-all duration-300 transform hover:scale-110">
                  <Github size={32} />
                </a>
                <a href="https://www.linkedin.com/in/paulo-camilo-viana" target="_blank" rel="noopener noreferrer" className="dark:hover:text-[#00ffdc] hover:text-cyan-600 transition-all duration-300 transform hover:scale-110">
                  <Linkedin size={32} />
                </a>
                <a href="https://www.instagram.com/paulovianatech" target="_blank" rel="noopener noreferrer" className="dark:hover:text-[#00ffdc] hover:text-cyan-600 transition-all duration-300 transform hover:scale-110">
                  <Instagram size={32} />
                </a>
              </MotionDiv>
            </MotionDiv>
          )}
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

