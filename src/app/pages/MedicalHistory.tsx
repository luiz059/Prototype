import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Calendar, Pill, Activity, FileText, ChevronRight, ChevronLeft,
  X, CheckCircle2, AlertCircle, Clock, User, Stethoscope, Download,
  RotateCcw, ChevronDown, ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ─── types ───────────────────────────────────────────────────── */
interface TimelineItem {
  id: string;
  date: string;
  type: "Consultation" | "Lab Result" | "Vaccination";
  doctor?: string;
  specialty?: string;
  diagnosis?: string;
  notes?: string;
  prescription?: string;
  title?: string;
  status?: string;
  details?: string;
}

interface Medication {
  name: string; dosage: string; frequency: string;
  duration: string; prescribedBy: string; startDate: string; active: boolean;
  instructions: string; sideEffects: string;
}

interface Diagnosis {
  condition: string; diagnosedDate: string; status: string;
  doctor: string; details: string; treatment: string; followUp: string;
}

/* ─── data ────────────────────────────────────────────────────── */
const timeline: TimelineItem[] = [
  {
    id: "t1", date: "Oct 15, 2026", type: "Consultation",
    doctor: "Dr. Sarah Jenkins", specialty: "Cardiologist",
    diagnosis: "Routine Checkup",
    notes: "Blood pressure normal. Heart rate: 72 bpm. Patient in good health.",
    prescription: "Continue current medication",
  },
  {
    id: "t2", date: "Sep 8, 2026", type: "Lab Result",
    title: "Complete Blood Count", status: "Normal",
    details: "All values within normal range. Hemoglobin: 14.2 g/dL",
  },
  {
    id: "t3", date: "Aug 22, 2026", type: "Consultation",
    doctor: "Dr. Michael Chen", specialty: "Dermatologist",
    diagnosis: "Mild Eczema",
    notes: "Prescribed topical steroid cream. Follow up in 4 weeks.",
    prescription: "Hydrocortisone 1% cream",
  },
  {
    id: "t4", date: "Jul 10, 2026", type: "Vaccination",
    title: "Influenza Vaccine", status: "Completed",
    details: "Annual flu shot administered. No adverse reactions.",
  },
];

const medications: Medication[] = [
  {
    name: "Lisinopril", dosage: "10mg", frequency: "Once daily",
    duration: "Ongoing", prescribedBy: "Dr. Sarah Jenkins",
    startDate: "Jan 2025", active: true,
    instructions: "Take in the morning with or without food. Avoid potassium supplements.",
    sideEffects: "Dry cough, dizziness, headache",
  },
  {
    name: "Vitamin D3", dosage: "2000 IU", frequency: "Once daily",
    duration: "Ongoing", prescribedBy: "Dr. Michael Chen",
    startDate: "Mar 2025", active: true,
    instructions: "Take with a meal for better absorption.",
    sideEffects: "Rare; nausea if taken on empty stomach",
  },
  {
    name: "Hydrocortisone Cream", dosage: "1%", frequency: "As needed",
    duration: "4 weeks", prescribedBy: "Dr. Michael Chen",
    startDate: "Aug 2026", active: false,
    instructions: "Apply a thin layer to affected area twice daily.",
    sideEffects: "Skin thinning with prolonged use",
  },
];

const diagnoses: Diagnosis[] = [
  {
    condition: "Hypertension (Stage 1)", diagnosedDate: "January 2025",
    status: "Managed", doctor: "Dr. Sarah Jenkins",
    details: "Blood pressure consistently reading 140/90 mmHg. Managed through lifestyle changes and medication.",
    treatment: "Lisinopril 10mg once daily + dietary sodium restriction",
    followUp: "Every 3 months",
  },
  {
    condition: "Vitamin D Deficiency", diagnosedDate: "March 2025",
    status: "Resolved", doctor: "Dr. Michael Chen",
    details: "Serum 25-OHD levels were below 20 ng/mL. Corrected through supplementation over 3 months.",
    treatment: "Vitamin D3 2000 IU daily + sun exposure",
    followUp: "Annual blood test",
  },
  {
    condition: "Mild Eczema", diagnosedDate: "August 2026",
    status: "Resolved", doctor: "Dr. Michael Chen",
    details: "Contact dermatitis on forearms. Resolved with topical treatment within 4 weeks.",
    treatment: "Hydrocortisone 1% cream + fragrance-free moisturizer",
    followUp: "As needed",
  },
];

/* ─── status badge ────────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Managed:   "bg-blue-100 text-blue-700",
    Resolved:  "bg-green-100 text-green-700",
    Ongoing:   "bg-amber-100 text-amber-700",
    Normal:    "bg-green-100 text-green-700",
    Completed: "bg-purple-100 text-purple-700",
    Active:    "bg-green-100 text-green-700",
  };
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

/* ─── modal wrapper ───────────────────────────────────────────── */
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
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-50 max-h-[88vh] flex flex-col">
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

/* ─── detail row helper ───────────────────────────────────────── */
function DetailRow({ label, value, valueClass = "text-[#1A1A2E]" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0 gap-4">
      <span className="text-sm text-gray-500 flex-shrink-0">{label}</span>
      <span className={`text-sm font-semibold text-right ${valueClass}`}>{value}</span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export function MedicalHistory() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Timeline");

  /* modal state */
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineItem | null>(null);
  const [selectedMed, setSelectedMed]           = useState<Medication | null>(null);
  const [selectedDiag, setSelectedDiag]         = useState<Diagnosis | null>(null);
  const [expandedMed, setExpandedMed]           = useState<string | null>(null);
  const [downloadedItem, setDownloadedItem]     = useState<string | null>(null);

  const typeColor: Record<string, string> = {
    Consultation: "bg-blue-100 text-blue-600",
    "Lab Result": "bg-teal-100 text-teal-600",
    Vaccination:  "bg-purple-100 text-purple-600",
  };
  const typeIcon: Record<string, any> = {
    Consultation: Activity,
    "Lab Result": FileText,
    Vaccination:  Pill,
  };

  const handleDownload = (id: string) => {
    setDownloadedItem(id);
    setTimeout(() => setDownloadedItem(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">

      {/* header */}
      <div className="px-6 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-[#1A1A2E]">Medical History</h1>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {["Timeline", "Medications", "Diagnoses"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === tab ? "bg-white text-[#1A1A2E] shadow-sm" : "text-gray-500"
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* body */}
      <div className="flex-1 overflow-y-auto p-5">
        <AnimatePresence mode="wait">

          {/* ── TIMELINE ── */}
          {activeTab === "Timeline" && (
            <motion.div key="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-4">
              {timeline.map((item, i) => {
                const Icon = typeIcon[item.type];
                return (
                  <motion.button key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => setSelectedTimeline(item)}
                    className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-left active:scale-[0.98] transition-transform relative">

                    {/* vertical line connector */}
                    {i < timeline.length - 1 && (
                      <div className="absolute left-[30px] top-[64px] w-0.5 h-[calc(100%-32px+16px)] bg-gray-200 z-0" />
                    )}

                    <div className="flex items-start gap-4 relative z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${typeColor[item.type]}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs text-gray-400 font-medium">{item.date}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColor[item.type]}`}>
                            {item.type}
                          </span>
                        </div>
                        <h3 className="font-bold text-[#1A1A2E] text-sm">
                          {"doctor" in item && item.doctor ? item.doctor : item.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {"specialty" in item && item.specialty ? item.specialty
                           : "details" in item ? item.details : ""}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {/* ── MEDICATIONS ── */}
          {activeTab === "Medications" && (
            <motion.div key="meds" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-5">

              <div>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Active</h2>
                <div className="space-y-3">
                  {medications.filter(m => m.active).map((med, i) => (
                    <motion.div key={med.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                      <button onClick={() => setExpandedMed(expandedMed === med.name ? null : med.name)}
                        className="w-full p-4 flex items-center justify-between text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Pill className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-bold text-[#1A1A2E] text-sm">{med.name}</p>
                            <p className="text-xs text-gray-500">{med.dosage} · {med.frequency}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status="Active" />
                          {expandedMed === med.name
                            ? <ChevronUp className="w-4 h-4 text-gray-400" />
                            : <ChevronDown className="w-4 h-4 text-gray-400" />
                          }
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedMed === med.name && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                            className="overflow-hidden">
                            <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
                              <div className="grid grid-cols-2 gap-3">
                                {[
                                  ["Prescribed by", med.prescribedBy],
                                  ["Start Date", med.startDate],
                                  ["Duration", med.duration],
                                  ["Frequency", med.frequency],
                                ].map(([label, val]) => (
                                  <div key={label} className="bg-[#F8FAFC] rounded-xl p-3">
                                    <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
                                    <p className="text-xs font-bold text-[#1A1A2E]">{val}</p>
                                  </div>
                                ))}
                              </div>
                              <div className="bg-blue-50 rounded-xl p-3">
                                <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Instructions</p>
                                <p className="text-xs text-gray-600">{med.instructions}</p>
                              </div>
                              <div className="bg-amber-50 rounded-xl p-3">
                                <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">Side Effects</p>
                                <p className="text-xs text-gray-600">{med.sideEffects}</p>
                              </div>
                              <div className="flex gap-2 pt-1">
                                <button onClick={() => setSelectedMed(med)}
                                  className="flex-1 py-2.5 bg-[#1A73E8] text-white text-xs font-bold rounded-xl active:scale-95 transition-transform shadow-sm shadow-blue-500/20">
                                  View Full Details
                                </button>
                                <button onClick={() => handleDownload(med.name)}
                                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                                    downloadedItem === med.name
                                      ? "bg-green-50 border-green-200 text-green-600"
                                      : "bg-white border-gray-200 text-gray-600"
                                  }`}>
                                  {downloadedItem === med.name ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Past Medications</h2>
                <div className="space-y-3">
                  {medications.filter(m => !m.active).map((med, i) => (
                    <button key={med.name} onClick={() => setSelectedMed(med)}
                      className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between opacity-60 active:scale-[0.98] transition-transform">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                          <Pill className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-[#1A1A2E] text-sm">{med.name}</p>
                          <p className="text-xs text-gray-500">{med.dosage} · {med.frequency}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status="Completed" />
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── DIAGNOSES ── */}
          {activeTab === "Diagnoses" && (
            <motion.div key="diag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-4">
              {diagnoses.map((d, i) => (
                <motion.div key={d.condition} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">

                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 pr-3">
                      <h3 className="font-bold text-[#1A1A2E] text-sm mb-1">{d.condition}</h3>
                      <p className="text-xs text-gray-500">{d.doctor} · {d.diagnosedDate}</p>
                    </div>
                    <StatusBadge status={d.status} />
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{d.details}</p>

                  <button onClick={() => setSelectedDiag(d)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-[#1A73E8] text-sm font-bold rounded-xl active:scale-[0.98] transition-transform">
                    View Full Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── TIMELINE DETAIL MODAL ── */}
      <Modal show={!!selectedTimeline} onClose={() => setSelectedTimeline(null)}
        title={selectedTimeline?.type ?? ""}>
        {selectedTimeline && (() => {
          const Icon = typeIcon[selectedTimeline.type];
          const isConsult = "doctor" in selectedTimeline && selectedTimeline.doctor;
          return (
            <div className="space-y-4">
              <div className={`flex items-center gap-3 p-4 rounded-2xl ${typeColor[selectedTimeline.type].replace("text-", "bg-").replace("600", "50").replace("blue-50","blue-50").replace("teal-50","teal-50").replace("purple-50","purple-50")} border border-gray-100`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColor[selectedTimeline.type]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#1A1A2E]">
                    {isConsult ? selectedTimeline.doctor : selectedTimeline.title}
                  </p>
                  <p className="text-xs text-gray-500">{selectedTimeline.date}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-0">
                {isConsult ? (
                  <>
                    <DetailRow label="Specialty" value={selectedTimeline.specialty!} />
                    <DetailRow label="Diagnosis" value={selectedTimeline.diagnosis!} valueClass="text-[#1A73E8]" />
                    <DetailRow label="Date" value={selectedTimeline.date} />
                  </>
                ) : (
                  <>
                    <DetailRow label="Type" value={selectedTimeline.type} />
                    <DetailRow label="Status" value={selectedTimeline.status!} valueClass="text-green-600" />
                    <DetailRow label="Date" value={selectedTimeline.date} />
                  </>
                )}
              </div>

              <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">
                  {isConsult ? "Doctor's Notes" : "Details"}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isConsult ? selectedTimeline.notes : selectedTimeline.details}
                </p>
              </div>

              {isConsult && selectedTimeline.prescription && (
                <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <Pill className="w-5 h-5 text-[#1A73E8] flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase mb-0.5">Prescription</p>
                    <p className="text-sm font-semibold text-[#1A73E8]">{selectedTimeline.prescription}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button onClick={() => handleDownload(selectedTimeline.id)}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border transition-all active:scale-95 ${
                    downloadedItem === selectedTimeline.id
                      ? "bg-green-50 border-green-200 text-green-600"
                      : "bg-white border-gray-200 text-gray-700"
                  }`}>
                  {downloadedItem === selectedTimeline.id
                    ? <><CheckCircle2 className="w-4 h-4" /> Saved!</>
                    : <><Download className="w-4 h-4" /> Download</>
                  }
                </button>
                <button onClick={() => setSelectedTimeline(null)}
                  className="flex-1 py-3 bg-[#1A73E8] text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-transform">
                  Done
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* ── MEDICATION DETAIL MODAL ── */}
      <Modal show={!!selectedMed} onClose={() => setSelectedMed(null)} title="Medication Details">
        {selectedMed && (
          <div className="space-y-4">
            <div className={`flex items-center gap-4 p-4 rounded-2xl ${selectedMed.active ? "bg-green-50 border border-green-100" : "bg-gray-50 border border-gray-100"}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedMed.active ? "bg-green-100" : "bg-gray-100"}`}>
                <Pill className={`w-6 h-6 ${selectedMed.active ? "text-green-600" : "text-gray-400"}`} />
              </div>
              <div>
                <p className="font-bold text-[#1A1A2E] text-lg">{selectedMed.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={selectedMed.active ? "Active" : "Completed"} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-0">
              <DetailRow label="Dosage" value={selectedMed.dosage} />
              <DetailRow label="Frequency" value={selectedMed.frequency} />
              <DetailRow label="Duration" value={selectedMed.duration} />
              <DetailRow label="Prescribed by" value={selectedMed.prescribedBy} />
              <DetailRow label="Start Date" value={selectedMed.startDate} />
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <p className="text-xs font-bold text-[#1A73E8] uppercase mb-2">Instructions</p>
              <p className="text-sm text-gray-700 leading-relaxed">{selectedMed.instructions}</p>
            </div>

            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <p className="text-xs font-bold text-amber-600 uppercase">Possible Side Effects</p>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{selectedMed.sideEffects}</p>
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={() => { handleDownload(selectedMed.name); }}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border transition-all active:scale-95 ${
                  downloadedItem === selectedMed.name
                    ? "bg-green-50 border-green-200 text-green-600"
                    : "bg-white border-gray-200 text-gray-700"
                }`}>
                {downloadedItem === selectedMed.name
                  ? <><CheckCircle2 className="w-4 h-4" /> Saved!</>
                  : <><Download className="w-4 h-4" /> Save</>
                }
              </button>
              <button onClick={() => setSelectedMed(null)}
                className="flex-1 py-3 bg-[#1A73E8] text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-transform">
                Done
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── DIAGNOSIS DETAIL MODAL ── */}
      <Modal show={!!selectedDiag} onClose={() => setSelectedDiag(null)} title="Diagnosis Details">
        {selectedDiag && (
          <div className="space-y-4">
            <div className="flex items-start justify-between bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100">
              <div>
                <h3 className="font-bold text-[#1A1A2E] text-base">{selectedDiag.condition}</h3>
                <p className="text-xs text-gray-500 mt-1">{selectedDiag.doctor}</p>
              </div>
              <StatusBadge status={selectedDiag.status} />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-0">
              <DetailRow label="Diagnosed" value={selectedDiag.diagnosedDate} />
              <DetailRow label="Physician" value={selectedDiag.doctor} />
              <DetailRow label="Follow-up" value={selectedDiag.followUp} valueClass="text-[#1A73E8]" />
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">About this Condition</p>
              <p className="text-sm text-gray-700 leading-relaxed">{selectedDiag.details}</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <p className="text-xs font-bold text-[#1A73E8] uppercase mb-2">Treatment Plan</p>
              <p className="text-sm text-gray-700 leading-relaxed">{selectedDiag.treatment}</p>
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={() => navigate("/app/schedule")}
                className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm active:scale-95 transition-transform">
                Book Follow-up
              </button>
              <button onClick={() => setSelectedDiag(null)}
                className="flex-1 py-3 bg-[#1A73E8] text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-transform">
                Done
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}