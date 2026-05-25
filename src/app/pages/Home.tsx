import { useNavigate } from "react-router";
import { Bell, Search, Calendar, FileText, Activity, MessageSquare, ChevronRight, Star, MapPin } from "lucide-react";
import { motion } from "motion/react";

const recommendedDoctors = [
  {
    id: "1",
    name: "Dr. Sarah Jenkins",
    specialty: "Cardiologist",
    hospital: "City Heart Hospital",
    rating: 4.8,
    reviews: 124,
    fee: "$150",
    available: true,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    hospital: "Skin & Beauty Clinic",
    rating: 4.9,
    reviews: 208,
    fee: "$120",
    available: true,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop",
  },
];

const specialties = [
  { label: "General", emoji: "🩺" },
  { label: "Cardiology", emoji: "❤️" },
  { label: "Dentist", emoji: "🦷" },
  { label: "Pediatrics", emoji: "👶" },
  { label: "Eye Care", emoji: "👁️" },
  { label: "Neuro", emoji: "🧠" },
];

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full pb-6">
      {/* Header */}
      <div className="bg-[#1A73E8] rounded-b-[36px] px-6 pt-12 pb-10 text-white relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-white/70 text-sm font-medium mb-1">Good morning!</p>
            <h1 className="text-2xl font-bold">John Doe</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/app/notifications")} className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-400 rounded-full border-2 border-[#1A73E8]"></span>
            </button>
            <div className="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className="relative z-10 translate-y-5">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input type="text" className="block w-full h-14 pl-12 pr-4 bg-white text-gray-900 rounded-2xl border-0 shadow-xl shadow-black/10 placeholder:text-gray-400 text-sm" placeholder="Search doctors, clinics, conditions..." />
        </div>
      </div>

      <div className="px-5 mt-12">
        {/* Quick Actions */}
        <div className="flex justify-between items-start mb-8 gap-2">
          <QuickAction icon={Calendar} label="Book" color="bg-blue-100 text-blue-600" onClick={() => navigate("/app/doctors")} />
          <QuickAction icon={FileText} label="Records" color="bg-teal-100 text-teal-600" onClick={() => navigate("/app/records")} />
          <QuickAction icon={Activity} label="History" color="bg-purple-100 text-purple-600" onClick={() => navigate("/app/history")} />
          <QuickAction icon={MessageSquare} label="Messages" color="bg-orange-100 text-orange-600" onClick={() => navigate("/app/messages")} />
        </div>

        {/* Upcoming Appointment */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#1A1A2E]">Upcoming Visit</h2>
            <button onClick={() => navigate("/app/appointments")} className="text-[#1A73E8] text-sm font-semibold flex items-center gap-1">See all <ChevronRight className="w-4 h-4" /></button>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex gap-4 items-center mb-4">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex-shrink-0 overflow-hidden border-2 border-blue-100">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop" alt="Dr" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#1A1A2E] text-base">Dr. Sarah Jenkins</h3>
                <p className="text-[#1A73E8] text-sm font-medium">Cardiologist</p>
                <p className="text-gray-400 text-xs mt-0.5">City Heart Hospital</p>
              </div>
              <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-lg text-xs font-bold">Confirmed</span>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-3 flex items-center justify-between mb-4 border border-gray-100">
              <div className="flex items-center gap-2 text-[#1A1A2E] text-sm font-semibold">
                <Calendar className="w-4 h-4 text-[#1A73E8]" />Today, 10:30 AM
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <MapPin className="w-3.5 h-3.5" />1.2 km
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-gray-100 text-[#1A1A2E] text-sm font-semibold rounded-xl">Cancel</button>
              <button onClick={() => navigate("/app/doctors/1")} className="flex-1 py-3 bg-[#1A73E8] text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20">View Details</button>
            </div>
          </motion.div>
        </div>

        {/* Health Stats */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-4">Health Overview</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-red-50 rounded-2xl p-3 border border-red-100">
              <p className="text-xs text-gray-400 mb-1 font-medium">Heart Rate</p>
              <p className="text-base font-bold text-red-500">72</p>
              <p className="text-xs text-gray-400">bpm</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-3 border border-blue-100">
              <p className="text-xs text-gray-400 mb-1 font-medium">Blood Pressure</p>
              <p className="text-base font-bold text-blue-500">120/80</p>
              <p className="text-xs text-gray-400">mmHg</p>
            </div>
            <div className="bg-teal-50 rounded-2xl p-3 border border-teal-100">
              <p className="text-xs text-gray-400 mb-1 font-medium">Weight</p>
              <p className="text-base font-bold text-teal-500">70</p>
              <p className="text-xs text-gray-400">kg</p>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-8 -mx-5">
          <div className="flex items-center justify-between mb-4 px-5">
            <h2 className="text-lg font-bold text-[#1A1A2E]">Specialists</h2>
            <button onClick={() => navigate("/app/doctors")} className="text-[#1A73E8] text-sm font-semibold flex items-center gap-1">See all <ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar px-5 gap-3 pb-2">
            {specialties.map((s, i) => (
              <button key={i} onClick={() => navigate("/app/doctors")} className="flex flex-col items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-2xl whitespace-nowrap shadow-sm active:scale-95 transition-transform">
                <span className="text-2xl">{s.emoji}</span>
                <span className="text-xs font-semibold text-gray-600">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended Doctors */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#1A1A2E]">Top Doctors</h2>
            <button onClick={() => navigate("/app/doctors")} className="text-[#1A73E8] text-sm font-semibold flex items-center gap-1">See all <ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="space-y-3">
            {recommendedDoctors.map((doctor, i) => (
              <motion.div key={doctor.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/app/doctors/${doctor.id}`)}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="relative flex-shrink-0">
                  <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-xl object-cover" />
                  {doctor.available && <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#1A1A2E] text-sm">{doctor.name}</h3>
                  <p className="text-[#1A73E8] text-xs font-medium mb-1">{doctor.specialty}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-gray-600">{doctor.rating}</span>
                    <span className="text-xs text-gray-400">({doctor.reviews})</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-[#1A1A2E] text-sm">{doctor.fee}</span>
                  <button onClick={(e) => { e.stopPropagation(); navigate("/app/schedule"); }} className="px-3 py-1.5 bg-[#1A73E8] text-white text-xs font-bold rounded-lg shadow-sm active:scale-95 transition-transform">Book</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, color, onClick }: any) {
  return (
    <button className="flex flex-col items-center gap-2" onClick={onClick}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-sm active:scale-95 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-xs font-semibold text-gray-600">{label}</span>
    </button>
  );
}
