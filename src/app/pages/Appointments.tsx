import { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "motion/react";

export function Appointments() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="px-6 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#1A1A2E] mb-6">My Appointments</h1>
        
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {["Upcoming", "Past", "Cancelled"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg ${
                activeTab === tab ? "bg-white text-[#1A1A2E] shadow-sm" : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 overflow-y-auto">
        {activeTab === "Upcoming" && (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop" alt="Dr" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A2E] text-base">Dr. Sarah Jenkins</h3>
                    <p className="text-gray-500 text-sm">Cardiologist</p>
                  </div>
                </div>
                <span className="bg-blue-100 text-[#1A73E8] px-2.5 py-1 rounded-md text-xs font-semibold">
                  Confirmed
                </span>
              </div>
              
              <div className="bg-[#F8FAFC] rounded-xl p-4 space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm text-[#1A1A2E]">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Thursday, Oct 15, 2026</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#1A1A2E]">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>10:00 AM - 10:30 AM</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#1A1A2E]">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>City Heart Hospital</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-2.5 bg-gray-100 text-[#1A1A2E] text-sm font-medium rounded-xl active:scale-95 transition-transform">Cancel</button>
                <button className="flex-1 py-2.5 bg-[#1A73E8] text-white text-sm font-medium rounded-xl active:scale-95 transition-transform shadow-md shadow-blue-500/20">Reschedule</button>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === "Past" && (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm opacity-75">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop" alt="Dr" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A2E] text-base">Dr. Michael Chen</h3>
                    <p className="text-gray-500 text-sm">Dermatologist</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                  Completed
                </span>
              </div>
              
              <div className="flex gap-3 mt-4">
                <button className="flex-1 py-2.5 bg-gray-100 text-[#1A1A2E] text-sm font-medium rounded-xl active:scale-95 transition-transform">View Summary</button>
                <button className="flex-1 py-2.5 bg-white border border-[#1A73E8] text-[#1A73E8] text-sm font-medium rounded-xl active:scale-95 transition-transform">Book Again</button>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === "Cancelled" && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No cancelled appointments</p>
          </div>
        )}
      </div>
    </div>
  );
}
