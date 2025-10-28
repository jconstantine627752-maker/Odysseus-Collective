import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOdysseusResponse } from '../lib/odysseus-ai';

interface Message {
  text: string;
  isUser: boolean;
}

export default function OdysseusStatue(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    const userMessage = input;
    setInput('');
    setIsTyping(true);

    setTimeout(async () => {
      try {
        const response = await getOdysseusResponse(userMessage);
        setMessages((prev) => [...prev, { text: response, isUser: false }]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { text: 'The stone cracks, but no wisdom emerges.', isUser: false },
        ]);
      } finally {
        setIsTyping(false);
      }
    }, 800);
  };

  return (
    <div className="relative z-10">
      {/* Statue */}
      <motion.div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02, rotateY: 5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-80 h-[32rem] bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-2xl overflow-hidden border border-[#E5C970]/20">
          <div
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWluKSIvPjwvc3ZnPg==')] opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

          {/* Head */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-800 rounded-full shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#E5C970]/10" />
          </div>

          {/* Body */}
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-48 h-80 bg-gray-800">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-700 to-gray-900" />
          </div>
        </div>

        {/* Lighting effects */}
        <div className="absolute inset-0 bg-[#E5C970]/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-blue-900/20 blur-2xl rounded-full animate-pulse delay-75" />
        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full animate-pulse delay-150" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-[#E5C970]/50 to-transparent blur-sm" />
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              className="bg-gray-900 rounded-lg w-full max-w-md h-[600px] flex flex-col shadow-2xl border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-gray-100">Odysseus Speaks</h2>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-gray-800 text-gray-100">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Speak to Odysseus..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOdysseusResponse } from '../lib/odysseus-ai';

interface Message {
  text: string;
  isUser: boolean;
}

export default function OdysseusStatue(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    const userMessage = input;
    setInput('');
    setIsTyping(true);

    setTimeout(async () => {
      try {
        const response = await getOdysseusResponse(userMessage);
        setMessages((prev) => [...prev, { text: response, isUser: false }]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { text: 'The stone cracks, but no wisdom emerges.', isUser: false },
        ]);
      } finally {
        setIsTyping(false);
      }
    }, 800);
  };

  return (
    <div className="relative z-10">
      {/* Statue */}
      <motion.div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02, rotateY: 5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-80 h-[32rem] bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-2xl overflow-hidden border border-[#E5C970]/20">
          <div
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWluKSIvPjwvc3ZnPg==')] opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

          {/* Head */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-800 rounded-full shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#E5C970]/10" />
          </div>

          {/* Body */}
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-48 h-80 bg-gray-800">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-700 to-gray-900" />
          </div>
        </div>

        {/* Lighting effects */}
        <div className="absolute inset-0 bg-[#E5C970]/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-blue-900/20 blur-2xl rounded-full animate-pulse delay-75" />
        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full animate-pulse delay-150" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-[#E5C970]/50 to-transparent blur-sm" />
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              className="bg-gray-900 rounded-lg w-full max-w-md h-[600px] flex flex-col shadow-2xl border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-gray-100">Odysseus Speaks</h2>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-gray-800 text-gray-100">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Speak to Odysseus..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
  );
}
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setInput('');
    setIsTyping(true);

    // Simulate a slight delay for more natural interaction
    setTimeout(async () => {
      try {
        const response = await getOdysseusResponse(input);
        setMessages((prev) => [...prev, { text: response, isUser: false }]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            text: 'The stone cracks, but no wisdom emerges.',
            isUser: false,
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    }, 1000);
  };

  return (
    <div className="relative z-10">
      {/* Statue */}
      <motion.div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02, rotateY: 5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-80 h-[32rem] bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-2xl overflow-hidden border border-[#E5C970]/20">
          {/* Statue details */}
          <div
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWluKSIvPjwvc3ZnPg==')] opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

          {/* Head */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-800 rounded-full shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#E5C970]/10" />
          </div>

          {/* Body */}
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-48 h-80 bg-gray-800">
            {/* Robe details */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-700 to-gray-900" />
          </div>
        </div>

        {/* Dramatic lighting effects */}
        <div className="absolute inset-0 bg-[#E5C970]/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-blue-900/20 blur-2xl rounded-full animate-pulse delay-75" />
        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full animate-pulse delay-150" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-[#E5C970]/50 to-transparent blur-sm" />
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              className="bg-gray-900 rounded-lg w-full max-w-md h-[600px] flex flex-col shadow-2xl border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-gray-100">Odysseus Speaks</h2>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-gray-800 text-gray-100">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Speak to Odysseus..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
            >    <div className="relative z-10">

              <div className="p-4 border-b border-gray-800">

                <h2 className="text-xl font-semibold text-gray-100">Odysseus Speaks</h2>  return (      {/* Statue */}

              </div>

    <div className="relative z-10">      <motion.div

              <div className="flex-1 overflow-y-auto p-4 space-y-4">

                {messages.map((msg, i) => (      {/* Statue */}        className="relative cursor-pointer"

                  <div

                    key={i}      <motion.div        onClick={() => setIsOpen(true)}

                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}

                  >        className="relative cursor-pointer"        whileHover={{ scale: 1.02, rotateY: 5 }}

                    <div

                      className={`max-w-[80%] p-3 rounded-lg ${        onClick={() => setIsOpen(true)}        transition={{ duration: 0.5 }}

                        msg.isUser

                          ? 'bg-blue-600 text-white'        whileHover={{ scale: 1.02, rotateY: 5 }}      >

                          : 'bg-gray-800 text-gray-100'

                      }`}        transition={{ duration: 0.5 }}        <div className="w-80 h-[32rem] bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-2xl overflow-hidden border border-[#E5C970]/20">

                    >

                      {msg.text}      >          {/* Statue details */}

                    </div>

                  </div>        <div className="w-80 h-[32rem] bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-2xl overflow-hidden border border-[#E5C970]/20">          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWluKSIvPjwvc3ZnPg==')] opacity-30" />

                ))}

                {isTyping && (          {/* Statue details */}          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                  <div className="flex justify-start">

                    <div className="max-w-[80%] p-3 rounded-lg bg-gray-800 text-gray-100">          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWluKSIvPjwvc3ZnPg==')] opacity-30" />          

                      <div className="flex space-x-2">

                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />          {/* Head */}

                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75" />

                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150" />                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-800 rounded-full shadow-inner">

                      </div>

                    </div>          {/* Head */}            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#E5C970]/10" />

                  </div>

                )}          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-800 rounded-full shadow-inner">          </div>

              </div>

            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#E5C970]/10" />          

              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">

                <div className="flex space-x-2">          </div>          {/* Body */}

                  <input

                    type="text"                    <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-48 h-80 bg-gray-800">

                    value={input}

                    onChange={(e) => setInput(e.target.value)}          {/* Body */}            {/* Robe details */}

                    className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                    placeholder="Speak to Odysseus..."          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-48 h-80 bg-gray-800">            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-700 to-gray-900" />

                  />

                  <button            {/* Robe details */}          </div>

                    type="submit"

                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-700 to-gray-900" />        </div>

                  >

                    Send          </div>        

                  </button>

                </div>        </div>        {/* Dramatic lighting effects */}

              </form>

            </motion.div>                <div className="absolute inset-0 bg-[#E5C970]/10 blur-3xl rounded-full animate-pulse" />

          </motion.div>

        )}        {/* Dramatic lighting effects */}        <div className="absolute inset-0 bg-blue-900/20 blur-2xl rounded-full animate-pulse delay-75" />

      </AnimatePresence>

    </div>        <div className="absolute inset-0 bg-[#E5C970]/10 blur-3xl rounded-full animate-pulse" />        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full animate-pulse delay-150" />

  );

}        <div className="absolute inset-0 bg-blue-900/20 blur-2xl rounded-full animate-pulse delay-75" />        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-[#E5C970]/50 to-transparent blur-sm" />

        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full animate-pulse delay-150" />      </motion.div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-[#E5C970]/50 to-transparent blur-sm" />

      </motion.div>      {/* Chat Interface */}

      <AnimatePresence>

      {/* Chat Interface */}        {isOpen && (

      <AnimatePresence>          <motion.div

        {isOpen && (            initial={{ opacity: 0, y: 20 }}

          <motion.div            animate={{ opacity: 1, y: 0 }}

            initial={{ opacity: 0, y: 20 }}            exit={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"

            exit={{ opacity: 0, y: 20 }}            onClick={(e) => {

            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"              if (e.target === e.currentTarget) setIsOpen(false);

            onClick={(e) => {            }}

              if (e.target === e.currentTarget) setIsOpen(false);          >

            }}            <motion.div

          >              className="bg-gray-900 rounded-lg w-full max-w-md h-[600px] flex flex-col shadow-2xl border border-gray-800"

            <motion.div              onClick={(e) => e.stopPropagation()}

              className="bg-gray-900 rounded-lg w-full max-w-md h-[600px] flex flex-col shadow-2xl border border-gray-800"            >

              onClick={(e) => e.stopPropagation()}              {/* Header */}

            >              <div className="p-4 border-b border-gray-800">

              {/* Header */}                <h2 className="text-xl font-semibold text-gray-100">Odysseus Speaks</h2>

              <div className="p-4 border-b border-gray-800">              </div>

                <h2 className="text-xl font-semibold text-gray-100">Odysseus Speaks</h2>

              </div>              {/* Messages */}

              <div className="flex-1 overflow-y-auto p-4 space-y-4">

              {/* Messages */}                {messages.map((msg, i) => (

              <div className="flex-1 overflow-y-auto p-4 space-y-4">                  <div

                {messages.map((msg, i) => (                    key={i}

                  <div                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}

                    key={i}                  >

                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}                    <div

                  >                      className={`max-w-[80%] p-3 rounded-lg ${

                    <div                        msg.isUser

                      className={`max-w-[80%] p-3 rounded-lg ${                          ? 'bg-blue-600 text-white'

                        msg.isUser                          : 'bg-gray-800 text-gray-100'

                          ? 'bg-blue-600 text-white'                      }`}

                          : 'bg-gray-800 text-gray-100'                    >

                      }`}                      {msg.text}

                    >                    </div>

                      {msg.text}                  </div>

                    </div>                ))}

                  </div>                {isTyping && (

                import React, { useState } from 'react';
                import { motion, AnimatePresence } from 'framer-motion';
                import { getOdysseusResponse } from '../lib/odysseus-ai';

                interface Message {
                  text: string;
                  isUser: boolean;
                  pending?: boolean;
                }

                export default function OdysseusStatue() {
                  const [isOpen, setIsOpen] = useState(false);
                  const [messages, setMessages] = useState<Message[]>([]);
                  const [input, setInput] = useState('');
                  const [isTyping, setIsTyping] = useState(false);

                  const handleSubmit = async (e: React.FormEvent) => {
                    e.preventDefault();
                    if (!input.trim()) return;

                    // Add user message
                    setMessages((prev) => [...prev, { text: input, isUser: true }]);
                    setInput('');
                    setIsTyping(true);

                    // Simulate a slight delay for more natural interaction
                    setTimeout(async () => {
                      try {
                        const response = await getOdysseusResponse(input);
                        setMessages((prev) => [...prev, { text: response, isUser: false }]);
                      } catch (error) {
                        setMessages((prev) => [
                          ...prev,
                          {
                            text: 'The stone cracks, but no wisdom emerges.',
                            isUser: false,
                          },
                        ]);
                      } finally {
                        setIsTyping(false);
                      }
                    }, 1000);
                  };

                  return (
                    <div className="relative z-10">
                      {/* Statue */}
                      <motion.div
                        className="relative cursor-pointer"
                        onClick={() => setIsOpen(true)}
                        whileHover={{ scale: 1.02, rotateY: 5 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-80 h-[32rem] bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-2xl overflow-hidden border border-[#E5C970]/20">
                          {/* Statue details */}
                          <div
                            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWluKSIvPjwvc3ZnPg==')] opacity-30"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                          {/* Head */}
                          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-800 rounded-full shadow-inner">
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#E5C970]/10" />
                          </div>

                          {/* Body */}
                          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-48 h-80 bg-gray-800">
                            {/* Robe details */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-700 to-gray-900" />
                          </div>
                        </div>

                        {/* Dramatic lighting effects */}
                        <div className="absolute inset-0 bg-[#E5C970]/10 blur-3xl rounded-full animate-pulse" />
                        <div className="absolute inset-0 bg-blue-900/20 blur-2xl rounded-full animate-pulse delay-75" />
                        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full animate-pulse delay-150" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-[#E5C970]/50 to-transparent blur-sm" />
                      </motion.div>

                      {/* Chat Interface */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
                            onClick={(e) => {
                              if (e.target === e.currentTarget) setIsOpen(false);
                            }}
                          >
                            <motion.div
                              className="bg-gray-900 rounded-lg w-full max-w-md h-[600px] flex flex-col shadow-2xl border border-gray-800"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* Header */}
                              <div className="p-4 border-b border-gray-800">
                                <h2 className="text-xl font-semibold text-gray-100">Odysseus Speaks</h2>
                              </div>

                              {/* Messages */}
                              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg, i) => (
                                  <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                      className={`max-w-[80%] p-3 rounded-lg ${
                                        msg.isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-100'
                                      }`}
                                    >
                                      {msg.text}
                                    </div>
                                  </div>
                                ))}
                                {isTyping && (
                                  <div className="flex justify-start">
                                    <div className="max-w-[80%] p-3 rounded-lg bg-gray-800 text-gray-100">
                                      <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75" />
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150" />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Input */}
                              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
                                <div className="flex space-x-2">
                                  <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Speak to Odysseus..."
                                  />
                                  <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                  >
                                    Send
                                  </button>
                                </div>
                              </form>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }