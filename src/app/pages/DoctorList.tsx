import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Search, SlidersHorizontal, Star, MapPin, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ─── data ────────────────────────────────────────────────────── */
const ALL_DOCTORS = [
  { id: "1",  name: "Dr. Sarah Jenkins",  specialty: "Cardiologist",      hospital: "City Heart Hospital",         rating: 4.8, reviews: 124, distance: 1.2, fee: 150, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop",  available: true  },
  { id: "2",  name: "Dr. Michael Chen",   specialty: "Dermatologist",      hospital: "Skin & Beauty Clinic",        rating: 4.9, reviews: 208, distance: 2.5, fee: 120, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop",  available: true  },
  { id: "3",  name: "Dr. Emily Roberts",  specialty: "Pediatrician",       hospital: "Children's Medical Center",   rating: 4.7, reviews: 89,  distance: 3.0, fee: 100, image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop",  available: false },
  { id: "4",  name: "Dr. James Reyes",    specialty: "Orthopedic Surgeon", hospital: "Metro Bone & Joint Clinic",   rating: 4.6, reviews: 175, distance: 4.1, fee: 200, image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&h=200&auto=format&fit=crop",  available: true  },
  { id: "5",  name: "Dr. Lisa Park",      specialty: "General Physician",  hospital: "CareConnect Primary Clinic",  rating: 4.5, reviews: 310, distance: 0.8, fee: 80,  image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?q=80&w=200&h=200&auto=format&fit=crop",  available: true  },
  { id: "6",  name: "Dr. Ryan Santos",    specialty: "ENT Specialist",     hospital: "Ear Nose Throat Institute",   rating: 4.8, reviews: 97,  distance: 2.1, fee: 130, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&h=200&auto=format&fit=crop",  available: false },
  { id: "7",  name: "Dr. Anna Torres",    specialty: "Neurologist",        hospital: "Brain & Spine Center",        rating: 4.9, reviews: 143, distance: 5.2, fee: 220, image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=200&h=200&auto=format&fit=crop",  available: true  },
  { id: "8",  name: "Dr. David Kim",      specialty: "Psychiatrist",       hospital: "MindCare Wellness Clinic",    rating: 4.7, reviews: 62,  distance: 3.8, fee: 180, image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=200&h=200&auto=format&fit=crop",  available: false },
];

const SPECIALTIES = ["All", "Cardiologist", "Dermatologist", "Pediatrician", "General Physician", "Neurologist", "ENT Specialist", "Orthopedic Surgeon", "Psychiatrist"];

type QuickFilter = "All" | "Available Today" | "Highest Rated" | "Near Me";

/* ════════════════════════════════════════════════════════════════ */
export function DoctorList() {
  const navigate = useNavigate();

  const [search, setSearch]               = useState("");
  const [quickFilter, setQuickFilter]     = useState<QuickFilter>("All");
  const [specialty, setSpecialty]         = useState("All");
  const [showFilterSheet, setShowFilter]  = useState(false);
  const [maxFee, setMaxFee]               = useState(250);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  /* derived list */
  const filtered = useMemo(() => {
    let list = [...ALL_DOCTORS];

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.hospital.toLowerCase().includes(q)
      );
    }

    // specialty tab
    if (specialty !== "All") list = list.filter(d => d.specialty === specialty);

    // quick filter chip
    if (quickFilter === "Available Today") list = list.filter(d => d.available);
    if (quickFilter === "Highest Rated")   list = [...list].sort((a, b) => b.rating - a.rating);
    if (quickFilter === "Near Me")         list = [...list].sort((a, b) => a.distance - b.distance);

    // filter sheet
    if (onlyAvailable) list = list.filter(d => d.available);
    list = list.filter(d => d.fee <= maxFee);

    return list;
  }, [search, quickFilter, specialty, maxFee, onlyAvailable]);

  const activeFilterCount = (onlyAvailable ? 1 : 0) + (maxFee < 250 ? 1 : 0);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">

      {/* ── sticky header ── */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-100 shadow-sm">
        <div className="px-4 pt-4 pb-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 active:scale-95 transition-transform flex-shrink-0">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search doctors, specialties…"
              className="w-full h-11 pl-10 pr-10 bg-[#F8FAFC] rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button onClick={() => setShowFilter(true)}
            className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 relative transition-colors ${
              activeFilterCount > 0 ? "bg-[#1A73E8] border-[#1A73E8] text-white" : "bg-white border-gray-200 text-gray-700"
            }`}>
            <SlidersHorizontal className="w-5 h-5" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Quick filter chips */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto hide-scrollbar">
          {(["All", "Available Today", "Highest Rated", "Near Me"] as QuickFilter[]).map(f => (
            <button key={f} onClick={() => setQuickFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all active:scale-95 flex-shrink-0 ${
                quickFilter === f
                  ? "bg-[#1A73E8] text-white shadow-sm shadow-blue-500/20"
                  : "bg-gray-100 text-gray-600"
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* Specialty scroll */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto hide-scrollbar">
          {SPECIALTIES.map(s => (
            <button key={s} onClick={() => setSpecialty(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 flex-shrink-0 border ${
                specialty === s
                  ? "bg-blue-50 border-[#1A73E8] text-[#1A73E8]"
                  : "bg-white border-gray-200 text-gray-500"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── list ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 space-y-4">

        {/* result count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <span className="font-bold text-[#1A1A2E]">{filtered.length}</span> doctor{filtered.length !== 1 ? "s" : ""} found
          </p>
          {(quickFilter !== "All" || specialty !== "All" || activeFilterCount > 0) && (
            <button onClick={() => { setQuickFilter("All"); setSpecialty("All"); setMaxFee(250); setOnlyAvailable(false); }}
              className="text-xs font-bold text-red-500 active:opacity-70">
              Clear all
            </button>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <p className="font-bold text-gray-600 mb-1">No doctors found</p>
              <p className="text-sm text-gray-400">Try adjusting your filters or search</p>
            </motion.div>
          ) : (
            filtered.map((doctor, i) => (
              <motion.div key={doctor.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
                onClick={() => navigate(`/app/doctors/${doctor.id}`)}>

                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden relative bg-gray-100 flex-shrink-0">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                    {doctor.available && (
                      <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-green-500 rounded-full px-1.5 py-0.5">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                    {!doctor.available && (
                      <div className="absolute bottom-0 inset-x-0 bg-black/40 py-0.5 text-center">
                        <span className="text-[9px] text-white font-bold uppercase tracking-wide">Unavailable</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-[#1A1A2E] text-base leading-tight">{doctor.name}</h3>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-gray-700">{doctor.rating}</span>
                        <span className="text-xs text-gray-400">({doctor.reviews})</span>
                      </div>
                    </div>

                    <p className="text-[#1A73E8] text-sm font-semibold mt-0.5">{doctor.specialty}</p>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{doctor.hospital}</span>
                      <span className="flex-shrink-0 text-gray-300">·</span>
                      <span className="flex-shrink-0">{doctor.distance} km</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <span className="text-xs text-gray-400">From </span>
                        <span className="font-bold text-[#1A1A2E]">${doctor.fee}</span>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); navigate("/app/schedule"); }}
                        className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all active:scale-95 ${
                          doctor.available
                            ? "bg-[#1A73E8] text-white shadow-sm shadow-blue-500/20"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!doctor.available}>
                        {doctor.available ? "Book" : "Unavailable"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* ── Filter Bottom Sheet ── */}
      <AnimatePresence>
        {showFilterSheet && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowFilter(false)} className="fixed inset-0 bg-black/50 z-40" />
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-50">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h2 className="text-lg font-bold text-[#1A1A2E]">Filter Doctors</h2>
                <button onClick={() => setShowFilter(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="px-6 py-5 space-y-6">

                {/* availability toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#1A1A2E] text-sm">Available Today Only</p>
                    <p className="text-xs text-gray-400 mt-0.5">Show only doctors with open slots</p>
                  </div>
                  <button onClick={() => setOnlyAvailable(v => !v)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${onlyAvailable ? "bg-[#1A73E8]" : "bg-gray-200"}`}>
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${onlyAvailable ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                </div>

                {/* fee slider */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-bold text-[#1A1A2E] text-sm">Max Consultation Fee</p>
                    <span className="text-sm font-bold text-[#1A73E8]">${maxFee}</span>
                  </div>
                  <input type="range" min={80} max={250} step={10} value={maxFee}
                    onChange={e => setMaxFee(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#1A73E8]" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>$80</span><span>$250</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => { setMaxFee(250); setOnlyAvailable(false); }}
                    className="flex-1 py-3 bg-gray-100 text-[#1A1A2E] rounded-xl font-semibold text-sm">
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFilter(false)}
                    className="flex-1 py-3 bg-[#1A73E8] text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-500/20">
                    Apply Filters
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