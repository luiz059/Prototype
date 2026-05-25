import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Calendar, Clock, MapPin, X, ChevronLeft, CheckCircle2,
  AlertTriangle, RotateCcw, Star, FileText, Video, Building2,
  ChevronRight, MessageSquare, Phone
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ─── types ───────────────────────────────────────────────────── */
type Status = "Confirmed" | "Pending" | "Completed" | "Cancelled";

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  hospital: string;
  date: string;
  dateShort: string;
  time: string;
  type: "In-Clinic" | "Telemedicine";
  status: Status;
  fee: string;
  image: string;
  ref: string;
  cancelReason?: string;
  cancelDate?: string;
  rating?: number;
}

/* ─── mock data ───────────────────────────────────────────────── */
const initialAppointments: Appointment[] = [
  {
    id: "1",
    doctor: "Dr. Sarah Jenkins",
    specialty: "Cardiologist",
    hospital: "City Heart Hospital",
    date: "Thursday, Oct 15, 2026",
    dateShort: "Oct 15, 2026",
    time: "10:00 AM – 10:30 AM",
    type: "In-Clinic",
    status: "Confirmed",
    fee: "$150",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop",
    ref: "#CC-2026-04891",
  },
  {
    id: "2",
    doctor: "Dr. Michael Chen",
    specialty: "Dermatologist",
    hospital: "Skin & Beauty Clinic",
    date: "Monday, Oct 20, 2026",
    dateShort: "Oct 20, 2026",
    time: "2:00 PM – 2:30 PM",
    type: "Telemedicine",
    status: "Pending",
    fee: "$120",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop",
    ref: "#CC-2026-04902",
  },
  {
    id: "3",
    doctor: "Dr. Emily Roberts",
    specialty: "Pediatrician",
    hospital: "Children's Wellness Center",
    date: "Friday, Sep 5, 2026",
    dateShort: "Sep 5, 2026",
    time: "9:00 AM – 9:30 AM",
    type: "In-Clinic",
    status: "Completed",
    fee: "$90",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop",
    ref: "#CC-2026-04750",
    rating: 5,
  },
  {
    id: "4",
    doctor: "Dr. James Reyes",
    specialty: "Orthopedic Surgeon",
    hospital: "Metro Bone & Joint Clinic",
    date: "Tuesday, Aug 12, 2026",
    dateShort: "Aug 12, 2026",
    time: "11:00 AM – 11:30 AM",
    type: "In-Clinic",
    status: "Completed",
    fee: "$200",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&h=200&auto=format&fit=crop",
    ref: "#CC-2026-04612",
    rating: 4,
  },
  {
    id: "5",
    doctor: "Dr. Lisa Park",
    specialty: "General Physician",
    hospital: "CareConnect Primary Clinic",
    date: "Wednesday, Jul 30, 2026",
    dateShort: "Jul 30, 2026",
    time: "3:30 PM – 4:00 PM",
    type: "Telemedicine",
    status: "Cancelled",
    fee: "$80",
    image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?q=80&w=200&h=200&auto=format&fit=crop",
    ref: "#CC-2026-04580",
    cancelReason: "Schedule conflict",
    cancelDate: "Jul 28, 2026",
  },
  {
    id: "6",
    doctor: "Dr. Ryan Santos",
    specialty: "ENT Specialist",
    hospital: "Ear Nose Throat Institute",
    date: "Thursday, Jun 19, 2026",
    dateShort: "Jun 19, 2026",
    time: "1:00 PM – 1:30 PM",
    type: "In-Clinic",
    status: "Cancelled",
    fee: "$130",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&h=200&auto=format&fit=crop",
    ref: "#CC-2026-04401",
    cancelReason: "Doctor unavailable",
    cancelDate: "Jun 17, 2026",
  },
];

const cancelReasons = [
  "Schedule conflict",
  "Feeling better, no longer needed",
  "Found another doctor",
  "Financial reasons",
  "Emergency came up",
  "Other",
];

const reschedDays = [
  { day: "Mon", date: "13" }, { day: "Tue", date: "14" },
  { day: "Wed", date: "15" }, { day: "Thu", date: "16" },
  { day: "Fri", date: "17" },
];
const reschedTimes = ["09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "03:00 PM", "04:30 PM"];

/* ─── status styles ───────────────────────────────────────────── */
const statusStyle: Record<Status, string> = {
  Confirmed: "bg-blue-100 text-[#1A73E8]",
  Pending:   "bg-amber-100 text-amber-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};

/* ════════════════════════════════════════════════════════════════ */
export function Appointments() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"Upcoming" | "Past" | "Cancelled">("Upcoming");
  const [appts, setAppts] = useState(initialAppointments);

  // modal states
  const [cancelTarget, setCancelTarget]   = useState<Appointment | null>(null);
  const [reschedTarget, setReschedTarget] = useState<Appointment | null>(null);
  const [summaryTarget, setSummaryTarget] = useState<Appointment | null>(null);
  const [cancelStep, setCancelStep]       = useState<1 | 2>(1);
  const [cancelReason, setCancelReason]   = useState("");
  const [reschedDay, setReschedDay]       = useState(0);
  const [reschedTime, setReschedTime]     = useState("10:00 AM");
  const [reschedDone, setReschedDone]     = useState(false);

  const upcoming  = appts.filter(a => a.status === "Confirmed" || a.status === "Pending");
  const past      = appts.filter(a => a.status === "Completed");
  const cancelled = appts.filter(a => a.status === "Cancelled");

  /* handlers */
  const confirmCancel = () => {
    if (!cancelTarget || !cancelReason) return;
    setAppts(prev => prev.map(a =>
      a.id === cancelTarget.id
        ? { ...a, status: "Cancelled", cancelReason, cancelDate: "Today" }
        : a
    ));
    setCancelStep(2);
  };

  const closeCancel = () => {
    setCancelTarget(null);
    setCancelStep(1);
    setCancelReason("");
  };

  const confirmResched = () => setReschedDone(true);

  const closeResched = () => {
    setReschedTarget(null);
    setReschedDone(false);
    setReschedDay(0);
    setReschedTime("10:00 AM");
  };

  /* render */
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">

      {/* sticky header */}
      <div className="px-6 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#1A1A2E] mb-5">My Appointments</h1>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {(["Upcoming", "Past", "Cancelled"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all relative ${
                tab === t ? "bg-white text-[#1A1A2E] shadow-sm" : "text-gray-500"
              }`}
            >
              {t}
              {t === "Cancelled" && cancelled.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cancelled.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* list */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <AnimatePresence mode="wait">

          {/* ── UPCOMING ── */}
          {tab === "Upcoming" && (
            <motion.div key="upcoming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {upcoming.length === 0 ? (
                <EmptyState icon={Calendar} title="No upcoming appointments" sub="Book a visit with one of our doctors." cta="Book Now" onCta={() => navigate("/app/doctors")} />
              ) : upcoming.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">

                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 overflow-hidden flex-shrink-0">
                        <img src={a.image} alt={a.doctor} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1A1A2E] text-sm">{a.doctor}</h3>
                        <p className="text-gray-400 text-xs">{a.specialty}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          {a.type === "Telemedicine"
                            ? <Video className="w-3 h-3 text-purple-500" />
                            : <Building2 className="w-3 h-3 text-blue-400" />}
                          <span className="text-xs text-gray-400">{a.type}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${statusStyle[a.status]}`}>{a.status}</span>
                  </div>

                  <div className="bg-[#F8FAFC] rounded-xl p-3 space-y-2 mb-4 border border-gray-100">
                    <InfoRow icon={Calendar} text={a.date} />
                    <InfoRow icon={Clock}    text={a.time} />
                    <InfoRow icon={MapPin}   text={a.hospital} />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-400">Ref: <span className="font-semibold text-gray-600">{a.ref}</span></span>
                    <span className="text-xs font-bold text-[#1A73E8]">{a.fee}</span>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => { setCancelTarget(a); setCancelStep(1); }}
                      className="flex-1 py-2.5 bg-gray-100 text-[#1A1A2E] text-sm font-semibold rounded-xl active:scale-95 transition-transform">
                      Cancel
                    </button>
                    <button onClick={() => setReschedTarget(a)}
                      className="flex-1 py-2.5 bg-[#1A73E8] text-white text-sm font-semibold rounded-xl active:scale-95 transition-transform shadow-md shadow-blue-500/20">
                      Reschedule
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ── PAST ── */}
          {tab === "Past" && (
            <motion.div key="past" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {past.length === 0 ? (
                <EmptyState icon={Clock} title="No past appointments" sub="Completed visits will appear here." />
              ) : past.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">

                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 overflow-hidden flex-shrink-0">
                        <img src={a.image} alt={a.doctor} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1A1A2E] text-sm">{a.doctor}</h3>
                        <p className="text-gray-400 text-xs">{a.specialty}</p>
                        <p className="text-gray-400 text-xs">{a.dateShort}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${statusStyle.Completed}`}>Completed</span>
                  </div>

                  {a.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} className={`w-4 h-4 ${idx < a.rating! ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">Your rating</span>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setSummaryTarget(a)}
                      className="flex-1 py-2.5 bg-gray-100 text-[#1A1A2E] text-sm font-semibold rounded-xl active:scale-95 transition-transform">
                      View Summary
                    </button>
                    <button onClick={() => navigate("/app/schedule")}
                      className="flex-1 py-2.5 bg-white border border-[#1A73E8] text-[#1A73E8] text-sm font-semibold rounded-xl active:scale-95 transition-transform">
                      Book Again
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ── CANCELLED ── */}
          {tab === "Cancelled" && (
            <motion.div key="cancelled" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {cancelled.length === 0 ? (
                <EmptyState icon={CheckCircle2} title="No cancelled appointments" sub="Great! All your bookings are active." />
              ) : (
                <>
                  <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="text-xs text-red-600 font-medium">
                      {cancelled.length} appointment{cancelled.length > 1 ? "s were" : " was"} cancelled. You may rebook any time.
                    </p>
                  </div>

                  {cancelled.map((a, i) => (
                    <motion.div key={a.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                      className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm relative overflow-hidden">

                      {/* red left stripe */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400 rounded-l-2xl" />

                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-3 items-center">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 grayscale opacity-70">
                            <img src={a.image} alt={a.doctor} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-500 text-sm">{a.doctor}</h3>
                            <p className="text-gray-400 text-xs">{a.specialty}</p>
                            <p className="text-gray-400 text-xs">{a.hospital}</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-100 text-red-600">Cancelled</span>
                      </div>

                      <div className="bg-red-50 rounded-xl p-3 space-y-2 mb-3 border border-red-100">
                        <InfoRow icon={Calendar} text={a.date}   muted />
                        <InfoRow icon={Clock}    text={a.time}   muted />
                        <InfoRow icon={MapPin}   text={a.hospital} muted />
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1.5">
                          <X className="w-3.5 h-3.5 text-red-400" />
                          <span className="text-xs text-red-500 font-medium">
                            Cancelled on {a.cancelDate}{a.cancelReason ? ` · ${a.cancelReason}` : ""}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button onClick={() => navigate("/app/schedule")}
                          className="flex-1 py-2.5 bg-[#1A73E8] text-white text-sm font-semibold rounded-xl active:scale-95 transition-transform shadow-md shadow-blue-500/20">
                          Rebook
                        </button>
                        <button onClick={() => navigate(`/app/doctors/1`)}
                          className="flex-1 py-2.5 bg-gray-100 text-gray-600 text-sm font-semibold rounded-xl active:scale-95 transition-transform">
                          View Doctor
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ════ CANCEL MODAL ════ */}
      <Modal show={!!cancelTarget} onClose={closeCancel}
        title={cancelStep === 1 ? "Cancel Appointment" : "Appointment Cancelled"}>
        {cancelStep === 1 && cancelTarget && (
          <div className="space-y-5">
            {/* appointment mini-card */}
            <div className="bg-[#F8FAFC] rounded-2xl p-4 flex items-center gap-3 border border-gray-100">
              <img src={cancelTarget.image} alt={cancelTarget.doctor} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              <div>
                <p className="font-bold text-[#1A1A2E] text-sm">{cancelTarget.doctor}</p>
                <p className="text-xs text-gray-500">{cancelTarget.date} · {cancelTarget.time}</p>
              </div>
            </div>

            {/* warning */}
            <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                Cancelling within 24 hours of your appointment may incur a cancellation fee. This action cannot be undone.
              </p>
            </div>

            {/* reason picker */}
            <div>
              <p className="text-sm font-bold text-[#1A1A2E] mb-3">Reason for cancellation <span className="text-red-500">*</span></p>
              <div className="space-y-2">
                {cancelReasons.map(r => (
                  <button key={r} onClick={() => setCancelReason(r)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      cancelReason === r
                        ? "border-[#1A73E8] bg-blue-50 text-[#1A73E8]"
                        : "border-gray-200 bg-white text-[#1A1A2E]"
                    }`}>
                    {r}
                    {cancelReason === r && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={closeCancel}
                className="flex-1 py-3 bg-gray-100 text-[#1A1A2E] rounded-xl font-semibold">
                Keep Appointment
              </button>
              <button onClick={confirmCancel} disabled={!cancelReason}
                className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all ${
                  cancelReason ? "bg-red-600 shadow-md shadow-red-500/20" : "bg-red-200 cursor-not-allowed"
                }`}>
                Cancel Booking
              </button>
            </div>
          </div>
        )}

        {cancelStep === 2 && cancelTarget && (
          <div className="text-center py-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-500" />
            </motion.div>
            <h3 className="font-bold text-[#1A1A2E] text-lg mb-2">Booking Cancelled</h3>
            <p className="text-gray-500 text-sm mb-1">{cancelTarget.doctor}</p>
            <p className="text-gray-400 text-xs mb-6">{cancelTarget.date}</p>
            <div className="bg-[#F8FAFC] rounded-xl p-4 text-left mb-6 border border-gray-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Reason</span>
                <span className="font-semibold text-[#1A1A2E]">{cancelReason}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Refund</span>
                <span className="font-semibold text-green-600">Processing (3–5 days)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Ref</span>
                <span className="font-semibold text-gray-600">{cancelTarget.ref}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={closeCancel}
                className="flex-1 py-3 bg-gray-100 text-[#1A1A2E] rounded-xl font-semibold">
                Done
              </button>
              <button onClick={() => { closeCancel(); navigate("/app/schedule"); }}
                className="flex-1 py-3 bg-[#1A73E8] text-white rounded-xl font-semibold shadow-md shadow-blue-500/20">
                Rebook
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ════ RESCHEDULE MODAL ════ */}
      <Modal show={!!reschedTarget} onClose={closeResched}
        title={reschedDone ? "Rescheduled!" : "Reschedule Appointment"}>
        {!reschedDone && reschedTarget && (
          <div className="space-y-5">
            <div className="bg-[#F8FAFC] rounded-2xl p-4 flex items-center gap-3 border border-gray-100">
              <img src={reschedTarget.image} alt={reschedTarget.doctor} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              <div>
                <p className="font-bold text-[#1A1A2E] text-sm">{reschedTarget.doctor}</p>
                <p className="text-xs text-gray-500">{reschedTarget.specialty}</p>
                <p className="text-xs text-gray-400 mt-0.5 line-through">{reschedTarget.date} · {reschedTarget.time.split(" – ")[0]}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-[#1A1A2E] mb-3">Select New Date</p>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                {reschedDays.map((d, i) => (
                  <button key={i} onClick={() => setReschedDay(i)}
                    className={`flex flex-col items-center min-w-[60px] py-3 rounded-2xl border transition-all ${
                      reschedDay === i
                        ? "bg-[#1A73E8] border-[#1A73E8] text-white shadow-md shadow-blue-500/20"
                        : "bg-white border-gray-200 text-gray-600"
                    }`}>
                    <span className="text-xs mb-1">{d.day}</span>
                    <span className="text-lg font-bold">{d.date}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-[#1A1A2E] mb-3">Select New Time</p>
              <div className="flex flex-wrap gap-2">
                {reschedTimes.map(t => (
                  <button key={t} onClick={() => setReschedTime(t)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      reschedTime === t
                        ? "bg-blue-50 border-[#1A73E8] text-[#1A73E8]"
                        : "bg-white border-gray-200 text-gray-600"
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={closeResched}
                className="flex-1 py-3 bg-gray-100 text-[#1A1A2E] rounded-xl font-semibold">
                Cancel
              </button>
              <button onClick={confirmResched}
                className="flex-1 py-3 bg-[#1A73E8] text-white rounded-xl font-semibold shadow-md shadow-blue-500/20">
                Confirm
              </button>
            </div>
          </div>
        )}

        {reschedDone && reschedTarget && (
          <div className="text-center py-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </motion.div>
            <h3 className="font-bold text-[#1A1A2E] text-lg mb-1">All Set!</h3>
            <p className="text-gray-500 text-sm mb-5">Your appointment has been rescheduled.</p>
            <div className="bg-[#F8FAFC] rounded-xl p-4 text-left border border-gray-100 space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Doctor</span>
                <span className="font-semibold text-[#1A1A2E]">{reschedTarget.doctor}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">New Date</span>
                <span className="font-semibold text-[#1A73E8]">Oct {reschedDays[reschedDay].date}, 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">New Time</span>
                <span className="font-semibold text-[#1A73E8]">{reschedTime}</span>
              </div>
            </div>
            <button onClick={closeResched}
              className="w-full py-3 bg-[#1A73E8] text-white rounded-xl font-semibold shadow-md shadow-blue-500/20">
              Done
            </button>
          </div>
        )}
      </Modal>

      {/* ════ VISIT SUMMARY MODAL ════ */}
      <Modal show={!!summaryTarget} onClose={() => setSummaryTarget(null)} title="Visit Summary">
        {summaryTarget && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100">
              <img src={summaryTarget.image} alt={summaryTarget.doctor} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              <div>
                <p className="font-bold text-[#1A1A2E]">{summaryTarget.doctor}</p>
                <p className="text-xs text-gray-500">{summaryTarget.specialty} · {summaryTarget.hospital}</p>
                <p className="text-xs text-gray-400 mt-0.5">{summaryTarget.dateShort}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
              <h4 className="font-bold text-[#1A1A2E] text-sm">Doctor's Notes</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Patient presented with mild symptoms. Vital signs were normal. Recommended increased water intake, adequate rest, and a follow-up if symptoms persist beyond 7 days.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2">
              <h4 className="font-bold text-[#1A1A2E] text-sm mb-3">Prescription</h4>
              {[
                { name: "Amoxicillin 500mg", instruction: "1 capsule, 3x daily after meals · 7 days" },
                { name: "Paracetamol 500mg", instruction: "1 tablet every 6 hours as needed" },
              ].map((med, i) => (
                <div key={i} className="flex gap-3 items-start bg-blue-50 rounded-xl p-3">
                  <div className="w-8 h-8 bg-[#1A73E8] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1A2E]">{med.name}</p>
                    <p className="text-xs text-gray-500">{med.instruction}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h4 className="font-bold text-[#1A1A2E] text-sm mb-3">Your Rating</h4>
              <div className="flex items-center gap-2 mb-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className={`w-6 h-6 ${idx < (summaryTarget.rating ?? 0) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`} />
                ))}
                <span className="text-sm font-bold text-gray-600 ml-1">{summaryTarget.rating}/5</span>
              </div>
              <p className="text-xs text-gray-400">Excellent care and very thorough consultation.</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => navigate("/app/schedule")}
                className="flex-1 py-3 bg-[#1A73E8] text-white rounded-xl font-semibold shadow-md shadow-blue-500/20">
                Book Again
              </button>
              <button onClick={() => setSummaryTarget(null)}
                className="flex-1 py-3 bg-gray-100 text-[#1A1A2E] rounded-xl font-semibold">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* ─── shared sub-components ───────────────────────────────────── */
function InfoRow({ icon: Icon, text, muted }: { icon: any; text: string; muted?: boolean }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <Icon className={`w-4 h-4 flex-shrink-0 ${muted ? "text-red-300" : "text-gray-400"}`} />
      <span className={muted ? "text-gray-400" : "text-[#1A1A2E]"}>{text}</span>
    </div>
  );
}

function EmptyState({ icon: Icon, title, sub, cta, onCta }: any) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <p className="text-gray-600 font-bold mb-1">{title}</p>
      <p className="text-gray-400 text-sm">{sub}</p>
      {cta && (
        <button onClick={onCta}
          className="mt-5 px-6 py-2.5 bg-[#1A73E8] text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-transform">
          {cta}
        </button>
      )}
    </div>
  );
}

function Modal({ show, onClose, title, children }: any) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/50 z-40" />
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-50 max-h-[90vh] flex flex-col">
            <div className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-lg font-bold text-[#1A1A2E]">{title}</h2>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}