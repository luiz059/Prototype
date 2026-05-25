import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Search, Send, Paperclip, Phone, Video, MoreVertical } from "lucide-react";
import { motion } from "motion/react";

const conversations = [
  {
    id: "1",
    name: "Dr. Sarah Jenkins",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop",
    lastMessage: "Please take your medication as prescribed and rest well.",
    time: "10:32 AM",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop",
    lastMessage: "Your skin test results look good. No signs of infection.",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Dr. Emily Roberts",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop",
    lastMessage: "Bring the child's vaccination records to the next visit.",
    time: "Mon",
    unread: 0,
    online: true,
  },
];

const chatMessages = [
  { id: 1, from: "doctor", text: "Hello John! How are you feeling today?", time: "9:00 AM" },
  { id: 2, from: "me", text: "Hi Dr. Jenkins! I've been having some chest tightness since yesterday.", time: "9:02 AM" },
  { id: 3, from: "doctor", text: "I see. Is it constant or does it come and go? Any shortness of breath?", time: "9:04 AM" },
  { id: 4, from: "me", text: "It comes and goes. Mostly when I climb stairs. No breathing issues though.", time: "9:05 AM" },
  { id: 5, from: "doctor", text: "Okay, that's helpful. I'd like you to come in for an ECG. I have a slot available tomorrow at 10 AM. Does that work?", time: "9:08 AM" },
  { id: 6, from: "me", text: "Yes, tomorrow at 10 AM works perfectly for me.", time: "9:10 AM" },
  { id: 7, from: "doctor", text: "Perfect! I've scheduled you in. Please take your medication as prescribed and rest well. Avoid strenuous activity until we meet.", time: "10:32 AM" },
];

export function Messages() {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  if (activeChat) {
    const doctor = conversations.find(c => c.id === activeChat)!;
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Chat Header */}
        <div className="sticky top-0 bg-white z-10 px-4 py-3 flex items-center gap-3 border-b border-gray-100 shadow-sm">
          <button
            onClick={() => setActiveChat(null)}
            className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="relative">
            <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full object-cover" />
            {doctor.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>

          <div className="flex-1">
            <h2 className="font-bold text-[#1A1A2E] text-sm">{doctor.name}</h2>
            <p className="text-xs text-green-500 font-medium">{doctor.online ? "Online" : "Offline"}</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#1A73E8]">
              <Phone className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#1A73E8]">
              <Video className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#F8FAFC]">
          <div className="text-center">
            <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100">Today</span>
          </div>

          {chatMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"} gap-2`}
            >
              {msg.from === "doctor" && (
                <img src={doctor.image} alt="" className="w-8 h-8 rounded-full object-cover self-end flex-shrink-0" />
              )}
              <div className={`max-w-[75%] ${msg.from === "me" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "me"
                      ? "bg-[#1A73E8] text-white rounded-tr-sm"
                      : "bg-white text-[#1A1A2E] rounded-tl-sm border border-gray-100 shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-xs text-gray-400 px-1">{msg.time}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-100 px-4 py-3">
          <div className="flex items-center gap-3 bg-[#F8FAFC] rounded-2xl px-4 py-2 border border-gray-200">
            <button className="text-gray-400">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm text-[#1A1A2E] placeholder:text-gray-400 outline-none"
            />
            <button
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                message.trim() ? "bg-[#1A73E8] text-white" : "bg-gray-200 text-gray-400"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-white border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#1A1A2E] mb-4">Messages</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full h-11 pl-10 pr-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((convo, i) => (
          <motion.button
            key={convo.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setActiveChat(convo.id)}
            className="w-full flex items-center gap-4 px-6 py-4 bg-white border-b border-gray-50 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div className="relative flex-shrink-0">
              <img src={convo.image} alt={convo.name} className="w-14 h-14 rounded-full object-cover" />
              {convo.online && (
                <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>

            <div className="flex-1 text-left min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-[#1A1A2E] text-sm">{convo.name}</h3>
                <span className="text-xs text-gray-400 flex-shrink-0">{convo.time}</span>
              </div>
              <p className="text-xs text-gray-400 mb-0.5">{convo.specialty}</p>
              <p className={`text-sm truncate ${convo.unread > 0 ? "font-semibold text-[#1A1A2E]" : "text-gray-400"}`}>
                {convo.lastMessage}
              </p>
            </div>

            {convo.unread > 0 && (
              <div className="w-5 h-5 bg-[#1A73E8] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">{convo.unread}</span>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
