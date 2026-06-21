import { useState } from 'react';
import { Send, Bot, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { studentData } from '../data';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: `Hi ${studentData.firstName}! I'm your AI assistant. Ask me about exams, attendance, or anything else.`, sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const autoReplies: Record<string, string> = {
    'exam': 'Your next exam is Data Structures on Nov 15th at 10:00 AM in Room 302.',
    'attendance': 'Your current overall attendance is 87%. You need to attend 4 more classes in Operating Systems to reach the 75% threshold.',
    'fee': 'The deadline for Even Semester tuition fee is Dec 1st. You have 0 outstanding dues.',
    'holiday': 'The next academic holiday is Diwali (Oct 31st - Nov 2nd).',
    'default': "I'm still learning! For complex queries, please reach out to the administration via the Grievance section."
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    const query = input.toLowerCase();
    setTimeout(() => {
      let replyText = autoReplies['default'];
      for (const key in autoReplies) {
        if (query.includes(key)) {
          replyText = autoReplies[key];
          break;
        }
      }
      setMessages(prev => [...prev, { id: Date.now() + 1, text: replyText, sender: 'bot' }]);
    }, 600);

    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 right-6 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 flex flex-col h-[500px] max-h-[80vh]"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white dark:bg-slate-900/20 rounded-lg">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Student Assistant AI</h3>
                <p className="text-[10px] text-blue-100">Always online</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white dark:bg-slate-900/20 rounded transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex max-w-[85%] ${msg.sender === 'user' ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-200 flex items-center justify-center shrink-0 mr-2 mt-1">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div className={`p-3 rounded-2xl text-[13px] ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
            <div className="flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full pr-1 pl-4 py-1 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
              <input
                type="text"
                placeholder="Ask about exams, attendance..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-300 placeholder:text-slate-400 min-w-0"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors ml-2 shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
