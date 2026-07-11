import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Trash2, Copy, Check, ArrowDown, RotateCcw, AlertTriangle } from 'lucide-react';
import Markdown from 'react-markdown';
import { Message } from '../types.js';
import { SUGGESTED_QUESTIONS } from '../data.js';

export default function AIButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm Laurenta's AI Agent. I can tell you about her professional experience, technical skills, featured projects, or custom agentic workflows. What would you like to know?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showScrollDown, setShowScrollDown] = useState<boolean>(false);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isMountedRef = useRef<boolean>(true);

  // Track component mounting to guard asynchronous operations
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Scroll to bottom helper with support for optional behaviors
  const scrollToBottom = useCallback((behavior: 'smooth' | 'auto' = 'smooth') => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  }, []);

  // Smooth scroll whenever a new message arrives or state shifts
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isOpen) {
      timer = setTimeout(() => {
        if (isMountedRef.current) {
          scrollToBottom('smooth');
        }
      }, 80);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [messages, isTyping, isOpen, scrollToBottom]);

  // Adjust input text area heights dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px'; // Base min-height for touch target
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 130)}px`;
    }
  }, [input]);

  // Check scroll container offsets to show/hide the jump-to-bottom prompt
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 120;
    setShowScrollDown(!isAtBottom && scrollHeight > clientHeight);
  }, []);

  // Safe markdown copy assistant
  const copyToClipboard = useCallback((text: string, messageId: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (isMountedRef.current) {
          setCopiedId(messageId);
        }
        setTimeout(() => {
          if (isMountedRef.current) {
            setCopiedId(null);
          }
        }, 2000);
      }).catch((err) => {
        console.error('Could not copy text: ', err);
      });
    }
  }, []);

  // Safely wipe discussion logs
  const clearChat = useCallback(() => {
    setHasError(false);
    setLastUserMessage(null);
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        content: "Chat cleared! I'm ready to answer any questions you have about Laurenta's engineering work and AI experience. Go ahead!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Execute full-stack query stream session
  const sendMessage = useCallback(async (textToSend?: string) => {
    const finalMsg = (textToSend || input).trim();
    if (!finalMsg) return;

    if (isMountedRef.current) {
      setHasError(false);
      if (!textToSend) {
        setInput('');
      }
      setLastUserMessage(finalMsg);
    }

    const userMessageId = 'user-' + Date.now();
    const assistantMessageId = 'assistant-' + Date.now();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: finalMsg,
      timestamp
    };

    if (isMountedRef.current) {
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error status during stream negotiation');
      }

      if (!isMountedRef.current) return;
      setIsTyping(false);

      const streamingMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isStreaming: true
      };

      setMessages((prev) => [...prev, streamingMessage]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let completeResponse = '';

      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          completeResponse += chunk;

          if (isMountedRef.current) {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMessageId
                  ? { ...m, content: completeResponse }
                  : m
              )
            );
          }
        }
      }

      if (isMountedRef.current) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? { ...m, isStreaming: false }
              : m
          )
        );
      }

    } catch (error) {
      console.error('Error during LLM streaming session:', error);
      if (isMountedRef.current) {
        setIsTyping(false);
        setHasError(true);
        setMessages((prev) => [
          ...prev,
          {
            id: 'error-' + Date.now(),
            role: 'assistant',
            content: '⚠️ I had trouble connecting to the backend RAG router. Please ensure your environment variable `GEMINI_API_KEY` is fully provisioned, or check your internet connection.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    }
  }, [input, messages]);

  const handleSuggestedQuestion = useCallback((question: string) => {
    if (isMountedRef.current) {
      setInput('');
      sendMessage(question);
    }
  }, [sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleRetry = useCallback(() => {
    if (lastUserMessage) {
      sendMessage(lastUserMessage);
    }
  }, [lastUserMessage, sendMessage]);

  return (
    <>
      {/* Floating Action Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          id="floating-ai-button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl cursor-pointer focus:outline-none focus:ring-4 focus:ring-cyan-500/30 select-none ${
            isOpen 
              ? 'bg-slate-800 text-slate-200 border border-slate-700/80' 
              : 'bg-gradient-to-tr from-cyan-500 via-teal-500 to-indigo-600 text-white hover:shadow-cyan-500/30'
          }`}
          whileHover={{ scale: 1.1, rotate: isOpen ? -90 : 8 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          layoutId="floating-button-layout"
          title={isOpen ? 'Close portfolio assistant' : 'Ask Laurenta\'s AI Assistant'}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <span className="absolute -inset-2 rounded-full bg-cyan-400/30 animate-ping opacity-70" />
              <Sparkles className="w-6 h-6 relative z-10 animate-pulse" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Advanced Overlay Portal & Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.94 }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            className="fixed bottom-24 right-6 w-[92vw] sm:w-[440px] h-[640px] max-h-[82vh] bg-slate-950/95 backdrop-blur-3xl border border-slate-800/80 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden z-50 max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:h-full max-sm:max-h-full max-sm:rounded-none"
          >
            {/* Header Area */}
            <div className="px-4 py-4 border-b border-slate-800/60 bg-slate-950/90 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-indigo-500 flex items-center justify-center relative shadow-inner"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
                </motion.div>
                <div>
                  <h3 className="font-sans font-bold text-sm tracking-tight text-white leading-none">Laurenta's Assistant</h3>
                  <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase font-mono mt-1 block">AI Portfolio Agent • Online</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  id="clear-chat-btn"
                  onClick={clearChat}
                  title="Wipe Chat History"
                  className="p-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  id="close-chat-btn"
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Conversation Area */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800"
            >
              {messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20, delay: index === 0 ? 0 : 0.02 }}
                    className={`flex flex-col max-w-[88%] ${isUser ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    {/* Role Label & Time */}
                    <div className="flex items-center gap-1.5 mb-1.5 px-1.5">
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider font-mono">
                        {isUser ? 'Visitor' : 'Assistant'}
                      </span>
                      <span className="text-[9px] text-slate-650 font-mono">{msg.timestamp}</span>
                    </div>

                    {/* Chat bubble card */}
                    <div
                      className={`p-3.5 rounded-2xl text-sm leading-relaxed relative group shadow-md transition-all ${
                        isUser
                          ? 'bg-gradient-to-tr from-cyan-600 to-indigo-650 text-white rounded-tr-none border border-cyan-500/10'
                          : 'bg-slate-900/90 text-slate-200 border border-slate-800/80 rounded-tl-none'
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap font-sans">{msg.content}</p>
                      ) : (
                        <div className="markdown-body text-slate-200 space-y-1 prose prose-invert prose-sm max-w-none">
                          <Markdown>{msg.content}</Markdown>
                        </div>
                      )}

                      {/* Micro interaction copy tool */}
                      {!isUser && !msg.isStreaming && (
                        <div className="absolute -bottom-7 right-1 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity duration-200 bg-slate-900 border border-slate-800/80 px-1.5 py-0.5 rounded-lg shadow-md z-10">
                          <button
                            onClick={() => copyToClipboard(msg.content, msg.id)}
                            className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Copy response markdown"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-green-400 animate-scale" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Dynamic Gradients Typing State */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col max-w-[85%] mr-auto items-start"
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1.5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Assistant</span>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-3 shadow-md">
                    <div className="flex gap-1.5 items-center py-1">
                      <motion.span
                        className="w-2 h-2 rounded-full bg-cyan-400"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full bg-teal-400"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.15 }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full bg-indigo-400"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.3 }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-mono font-medium tracking-wide">Executing Agentic Query...</span>
                  </div>
                </motion.div>
              )}

              {/* Interactive Retry Action block */}
              {hasError && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-2xl flex flex-col gap-3 items-center text-center shadow-lg mx-2"
                >
                  <div className="p-2 bg-rose-500/10 rounded-full text-rose-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-rose-300">Connection Interrupted</h4>
                    <p className="text-[11px] text-slate-400 leading-normal max-w-xs">
                      The model is currently unreachable. Make sure the backend port and environment API keys are healthy.
                    </p>
                  </div>
                  <button
                    onClick={handleRetry}
                    className="flex items-center gap-2 px-3.5 py-2 bg-rose-500/20 border border-rose-500/30 hover:bg-rose-500/30 text-rose-300 rounded-xl text-xs font-medium transition-all cursor-pointer shadow-sm select-none"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-attempt Transmission</span>
                  </button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Scroll-Down Button */}
            {showScrollDown && (
              <button
                onClick={() => scrollToBottom('smooth')}
                className="absolute bottom-[170px] right-4 p-2.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white hover:bg-slate-800 transition-all shadow-xl z-20 cursor-pointer"
                title="Scroll to bottom"
              >
                <ArrowDown className="w-4.5 h-4.5 animate-bounce" />
              </button>
            )}

            {/* Bottom Suggested Questions Slider Carousel */}
            {messages.length <= 2 && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="px-4 py-3 bg-slate-950/90 border-t border-slate-900"
              >
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold mb-2 px-0.5">Suggested Queries</p>
                
                {/* Horizontal slider for awesome mobile and desktop usability */}
                <div className="flex flex-row overflow-x-auto gap-2 pb-1.5 pt-0.5 scrollbar-thin scrollbar-thumb-slate-800/60 scroll-smooth">
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedQuestion(q)}
                      className="inline-block text-xs bg-slate-900 border border-slate-850 hover:border-cyan-500/40 hover:bg-slate-850 px-3.5 py-2 rounded-xl text-slate-300 hover:text-cyan-300 transition-all cursor-pointer whitespace-nowrap font-sans font-medium shadow-sm flex-shrink-0 select-none"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input Composer Footer */}
            <div className="p-3.5 border-t border-slate-800/60 bg-slate-950/80 flex items-end gap-2.5">
              <textarea
                ref={textareaRef}
                id="chat-input-field"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Laurenta's AI Assistant..."
                rows={1}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-3 text-sm text-slate-100 placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/60 resize-none h-[44px] max-h-[130px] scrollbar-thin font-sans leading-relaxed transition-all"
              />
              <motion.button
                id="send-chat-message-btn"
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                whileHover={{ scale: !input.trim() || isTyping ? 1 : 1.06 }}
                whileTap={{ scale: !input.trim() || isTyping ? 1 : 0.94 }}
                className="p-3 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-indigo-600 text-white disabled:opacity-20 disabled:pointer-events-none cursor-pointer flex items-center justify-center shadow-lg hover:shadow-cyan-500/10 min-h-[44px] min-w-[44px] flex-shrink-0"
                title="Send query"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
