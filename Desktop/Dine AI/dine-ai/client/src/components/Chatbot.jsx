import { useState } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I am Dine AI assistant 🍽️ How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/chat', { message: input });
      setMessages(prev => [...prev, { from: 'bot', text: res.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'bot', text: 'Sorry, something went wrong! 😔' }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 bg-orange-500 text-white w-14 h-14 rounded-full shadow-lg text-2xl hover:bg-orange-600 transition z-50">
        {open ? '✕' : '🤖'}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 left-6 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
          
          {/* Header */}
          <div className="bg-orange-500 text-white px-4 py-3 flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <div>
              <p className="font-bold">Dine AI Assistant</p>
              <p className="text-xs opacity-80">Always here to help!</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] ${
                  msg.from === 'user'
                    ? 'bg-orange-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-none text-sm">
                  Typing... ⏳
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything..."
              className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
            />
            <button
              onClick={sendMessage}
              className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-orange-600 transition">
              ➤
            </button>
          </div>

        </div>
      )}
    </>
  );
}