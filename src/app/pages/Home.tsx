import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Bell, Search, Calendar, FileText, Activity, MessageSquare,
  ChevronRight, Star, MapPin, Pencil, X, CheckCircle2,
  Watch, Droplets, Ruler, Scale, AlertCircle, User, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import myProfileImg from "../../uploads/my-profile.jpg";

/* ─── static data ─────────────────────────────────────────────── */
const recommendedDoctors = [
  { id: "1", name: "Dr. Sarah Jenkins", specialty: "Cardiologist", hospital: "City Heart Hospital", rating: 4.8, reviews: 124, fee: "$150", available: true, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: "2", name: "Dr. Michael Chen", specialty: "Dermatologist", hospital: "Skin & Beauty Clinic", rating: 4.9, reviews: 208, fee: "$120", available: true, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop" },
];

const specialties = [
  { label: "General", emoji: "🩺" }, { label: "Cardiology", emoji: "❤️" },
  { label: "Dentist", emoji: "🦷" },  { label: "Pediatrics", emoji: "👶" },
  { label: "Eye Care", emoji: "👁️" }, { label: "Neuro", emoji: "🧠" },
];

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

/* ─── compute BMI ─────────────────────────────────────────────── */
function calcBMI(height: number, weight: number): string {
  if (!height || !weight) return "—";
  const bmi = weight / ((height / 100) ** 2);
  return bmi.toFixed(1);
}
function bmiLabel(bmi: string): { label: string; color: string } {
  const v = parseFloat(bmi);
  if (isNaN(v)) return { label: "—", color: "text-gray-400" };
  if (v < 18.5) return { label: "Underweight", color: "text-blue-500" };
  if (v < 25)   return { label: "Normal",      color: "text-green-500" };
  if (v < 30)   return { label: "Overweight",  color: "text-amber-500" };
  return              { label: "Obese",         color: "text-red-500" };
}

/* ════════════════════════════════════════════════════════════════ */
export function Home() {
  const navigate = useNavigate();

  /* health profile state */
  const [showEdit, setShowEdit]       = useState(false);
  const [saved, setSaved]             = useState(false);
  const [bloodType, setBloodType]     = useState("O+");
  const [sex, setSex]                 = useState("Male");
  const [dob, setDob]                 = useState("1993-05-15");
  const [height, setHeight]           = useState("175");
  const [weight, setWeight]           = useState("70");
  const [allergies, setAllergies]     = useState("Penicillin");
  const [showBTDropdown, setShowBT]   = useState(false);

  /* derived */
  const bmi     = calcBMI(Number(height), Number(weight));
  const bmiMeta = bmiLabel(bmi);
  const age     = dob ? new Date().getFullYear() - new Date(dob).getFullYear() : "—";

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); setShowEdit(false); }, 1400);
  };

  return (
    <div className="flex flex-col min-h-full pb-6">

      {/* ── Blue header ── */}
      <div className="bg-[#1A73E8] rounded-b-[36px] px-6 pt-12 pb-10 text-white relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-white/70 text-sm font-medium mb-1">Good morning!</p>
            <h1 className="text-2xl font-bold">Luiz Andrew Reyes</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/app/notifications")}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center active:scale-95 transition-transform">
              <Bell className="w-5 h-5" />
            </button>
            <div onClick={() => navigate("/app/profile")} className="w-10 h-10 rounded-full overflow-hidden border-2 border-white cursor-pointer">
              <img src={myProfileImg} alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input type="text" placeholder="Search doctors, specialties..."
            onFocus={() => navigate("/app")}
            className="w-full h-12 pl-11 pr-4 bg-white rounded-2xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none shadow-lg" />
        </div>
      </div>

      <div className="px-5 mt-6 space-y-8">

        {/* ── Quick Actions ── */}
        <div className="grid grid-cols-4 gap-2">
          <QuickAction icon={Calendar}    label="Book"      color="bg-blue-100 text-[#1A73E8]"  onClick={() => navigate("/app/schedule")} />
          <QuickAction icon={FileText}    label="Records"   color="bg-teal-100 text-teal-600"   onClick={() => navigate("/app/records")} />
          <QuickAction icon={Activity}    label="History"   color="bg-purple-100 text-purple-600" onClick={() => navigate("/app/history")} />
          <QuickAction icon={MessageSquare} label="Messages" color="bg-orange-100 text-orange-500" onClick={() => navigate("/app/messages")} />
        </div>

        {/* ── Upcoming appointment ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-[#1A1A2E]">Upcoming</h2>
            <button onClick={() => navigate("/app/appointments")} className="text-[#1A73E8] text-sm font-semibold flex items-center gap-1">
              See all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate("/app/appointments")}
            className="bg-[#1A73E8] rounded-2xl p-4 text-white cursor-pointer active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-3 mb-3">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop"
                alt="Doctor" className="w-12 h-12 rounded-xl object-cover border-2 border-white/30 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">Dr. Sarah Jenkins</p>
                <p className="text-white/70 text-xs">Cardiologist</p>
              </div>
              <span className="ml-auto text-xs bg-white/20 px-2.5 py-1 rounded-full font-semibold">Confirmed</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/80">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Oct 15, 2026</span>
              <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> 10:00 AM</span>
            </div>
          </motion.div>
        </div>

        {/* ── Health Overview ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-[#1A1A2E]">Health Overview</h2>
            <button onClick={() => setShowEdit(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#1A73E8] rounded-full text-xs font-bold active:scale-95 transition-transform">
              <Pencil className="w-3 h-3" /> Edit
            </button>
          </div>

          {/* Apple Watch synced row */}
          <div className="flex items-center gap-1.5 mb-3 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
            <Watch className="w-3.5 h-3.5 text-gray-400" />
            <p className="text-xs text-gray-400 font-medium">Heart Rate & Blood Pressure synced via Apple Watch</p>
          </div>

          {/* synced stats */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-red-50 rounded-2xl p-3 border border-red-100">
              <p className="text-xs text-gray-400 mb-1 font-medium">Heart Rate</p>
              <p className="text-xl font-bold text-red-500">72 <span className="text-xs font-normal text-gray-400">bpm</span></p>
              <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1"><Watch className="w-3 h-3" /> Apple Watch</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-3 border border-blue-100">
              <p className="text-xs text-gray-400 mb-1 font-medium">Blood Pressure</p>
              <p className="text-xl font-bold text-blue-500">120/80 <span className="text-xs font-normal text-gray-400">mmHg</span></p>
              <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1"><Watch className="w-3 h-3" /> Apple Watch</p>
            </div>
          </div>

          {/* user profile stats */}
          <div className="grid grid-cols-4 gap-2">
            <StatCard label="Blood Type" value={bloodType} color="bg-pink-50 text-pink-600 border-pink-100" />
            <StatCard label="Height" value={`${height || "—"} cm`} color="bg-purple-50 text-purple-600 border-purple-100" />
            <StatCard label="Weight" value={`${weight || "—"} kg`} color="bg-teal-50 text-teal-600 border-teal-100" />
            <div className="bg-green-50 rounded-2xl p-3 border border-green-100 flex flex-col">
              <p className="text-[10px] text-gray-400 font-medium mb-1">BMI</p>
              <p className="text-sm font-bold text-green-600">{bmi}</p>
              <p className={`text-[10px] font-semibold mt-0.5 ${bmiMeta.color}`}>{bmiMeta.label}</p>
            </div>
          </div>
        </div>

        {/* ── Specialists ── */}
        <div className="-mx-5">
          <div className="flex items-center justify-between mb-3 px-5">
            <h2 className="text-lg font-bold text-[#1A1A2E]">Specialists</h2>
            <button onClick={() => navigate("/app/doctors")} className="text-[#1A73E8] text-sm font-semibold flex items-center gap-1">See all <ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar px-5 gap-3 pb-2">
            {specialties.map((s, i) => (
              <button key={i} onClick={() => navigate("/app/doctors")}
                className="flex flex-col items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-2xl whitespace-nowrap shadow-sm active:scale-95 transition-transform">
                <span className="text-2xl">{s.emoji}</span>
                <span className="text-xs font-semibold text-gray-600">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Top Doctors ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-[#1A1A2E]">Top Doctors</h2>
            <button onClick={() => navigate("/app/doctors")} className="text-[#1A73E8] text-sm font-semibold flex items-center gap-1">See all <ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="space-y-3">
            {recommendedDoctors.map((doctor, i) => (
              <motion.div key={doctor.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/app/doctors/${doctor.id}`)}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer">
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
                  <button onClick={e => { e.stopPropagation(); navigate("/app/schedule"); }}
                    className="px-3 py-1.5 bg-[#1A73E8] text-white text-xs font-bold rounded-lg shadow-sm active:scale-95 transition-transform">
                    Book
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ EDIT HEALTH PROFILE MODAL ════ */}
      <AnimatePresence>
        {showEdit && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowEdit(false)} className="fixed inset-0 bg-black/50 z-40" />
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-50 max-h-[88vh] flex flex-col">

              {/* modal header */}
              <div className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h2 className="text-lg font-bold text-[#1A1A2E]">Health Profile</h2>
                <button onClick={() => setShowEdit(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

                {/* note */}
                <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                  <Watch className="w-4 h-4 text-[#1A73E8] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#1A73E8] font-medium leading-relaxed">
                    Heart Rate and Blood Pressure are automatically synced from your Apple Watch.
                  </p>
                </div>

                {/* Blood Type dropdown */}
                <div>
                  <label className="block text-sm font-bold text-[#1A1A2E] mb-2">Blood Type</label>
                  <div className="relative">
                    <button onClick={() => setShowBT(v => !v)}
                      className={`w-full h-12 px-4 bg-[#F8FAFC] rounded-xl border flex items-center justify-between text-sm transition-all ${showBTDropdown ? "border-[#1A73E8] ring-1 ring-[#1A73E8]" : "border-gray-200"}`}>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-pink-500" />
                        <span className="font-semibold text-[#1A1A2E]">{bloodType}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showBTDropdown ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {showBTDropdown && (
                        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                          <div className="grid grid-cols-4">
                            {BLOOD_TYPES.map(bt => (
                              <button key={bt} onClick={() => { setBloodType(bt); setShowBT(false); }}
                                className={`py-3 text-sm font-bold text-center border-b border-r border-gray-50 transition-colors ${bloodType === bt ? "bg-pink-50 text-pink-600" : "text-[#1A1A2E] hover:bg-gray-50"}`}>
                                {bt}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Sex */}
                <div>
                  <label className="block text-sm font-bold text-[#1A1A2E] mb-2">Sex</label>
                  <div className="flex gap-3">
                    {["Male", "Female"].map(s => (
                      <button key={s} onClick={() => setSex(s)}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${sex === s ? "border-[#1A73E8] bg-blue-50 text-[#1A73E8]" : "border-gray-200 bg-white text-gray-500"}`}>
                        {s === "Male" ? "♂ Male" : "♀ Female"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-bold text-[#1A1A2E] mb-2">Date of Birth</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input type="date" value={dob} onChange={e => setDob(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 bg-[#F8FAFC] rounded-xl border border-gray-200 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]" />
                  </div>
                  {dob && <p className="text-xs text-gray-400 mt-1 ml-1">Age: <span className="font-semibold text-gray-600">{age} years old</span></p>}
                </div>

                {/* Height + Weight */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-[#1A1A2E] mb-2">Height (cm)</label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input type="number" value={height} onChange={e => setHeight(e.target.value)} min={100} max={250} placeholder="e.g. 175"
                        className="w-full h-12 pl-10 pr-3 bg-[#F8FAFC] rounded-xl border border-gray-200 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1A1A2E] mb-2">Weight (kg)</label>
                    <div className="relative">
                      <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input type="number" value={weight} onChange={e => setWeight(e.target.value)} min={20} max={300} placeholder="e.g. 70"
                        className="w-full h-12 pl-10 pr-3 bg-[#F8FAFC] rounded-xl border border-gray-200 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]" />
                    </div>
                  </div>
                </div>

                {/* BMI preview */}
                {height && weight && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-bold text-[#1A1A2E]">BMI</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-green-600">{bmi}</span>
                      <span className={`ml-2 text-xs font-semibold ${bmiMeta.color}`}>({bmiMeta.label})</span>
                    </div>
                  </motion.div>
                )}

                {/* Allergies */}
                <div>
                  <label className="block text-sm font-bold text-[#1A1A2E] mb-2">
                    Allergies <span className="text-gray-400 font-normal text-xs">(separate by comma)</span>
                  </label>
                  <div className="relative">
                    <AlertCircle className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    <textarea value={allergies} onChange={e => setAllergies(e.target.value)} rows={2}
                      placeholder="e.g. Penicillin, Peanuts, Latex"
                      className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] rounded-xl border border-gray-200 text-sm text-[#1A1A2E] placeholder:text-gray-400 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] resize-none" />
                  </div>
                </div>

                {/* success feedback */}
                <AnimatePresence>
                  {saved && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm font-semibold border border-green-100">
                      <CheckCircle2 className="w-4 h-4" /> Health profile saved successfully!
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* buttons */}
                <div className="flex gap-3 pb-2">
                  <button onClick={() => setShowEdit(false)}
                    className="flex-1 py-3 bg-gray-100 text-[#1A1A2E] rounded-xl font-semibold text-sm">
                    Cancel
                  </button>
                  <button onClick={handleSave}
                    className="flex-1 py-3 bg-[#1A73E8] text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-[0.98] transition-transform">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── helpers ─────────────────────────────────────────────────── */
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

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  const [bg, text, border] = color.split(" ");
  return (
    <div className={`${bg} rounded-2xl p-3 border ${border} flex flex-col`}>
      <p className="text-[10px] text-gray-400 font-medium mb-1">{label}</p>
      <p className={`text-sm font-bold ${text}`}>{value}</p>
    </div>
  );
}