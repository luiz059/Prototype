import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  FileText, Activity, Syringe, FileStack, Download,
  ChevronLeft, Search, X, ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RecentFile {
  name: string;
  date: string;
  size: string;
  type: "pdf" | "img" | "doc";
}

interface RecordItem {
  id: string;
  title: string;
  doctor: string;
  date: string;
  status: "Normal" | "Pending" | "Abnormal";
  notes: string;
}

// ─── Mock detail data per category ───────────────────────────────────────────

const CATEGORY_RECORDS: Record<string, RecordItem[]> = {
  Prescriptions: [
    { id: "RX-001", title: "Metformin 500mg",    doctor: "Dr. Reyes",  date: "May 20, 2025", status: "Normal",   notes: "Take twice daily with meals. 30-day supply." },
    { id: "RX-002", title: "Amlodipine 5mg",     doctor: "Dr. Santos", date: "May 10, 2025", status: "Normal",   notes: "Once daily. Monitor blood pressure weekly." },
    { id: "RX-003", title: "Amoxicillin 500mg",  doctor: "Dr. Lim",    date: "Apr 28, 2025", status: "Pending",  notes: "Complete full 7-day course." },
  ],
  "Lab Results": [
    { id: "LB-001", title: "Complete Blood Count",      doctor: "Dr. Lim",    date: "May 18, 2025", status: "Normal",   notes: "All values within normal range." },
    { id: "LB-002", title: "Lipid Panel",               doctor: "Dr. Reyes",  date: "May 5, 2025",  status: "Abnormal", notes: "LDL slightly elevated. Dietary changes recommended." },
    { id: "LB-003", title: "Blood Glucose (Fasting)",   doctor: "Dr. Santos", date: "Apr 15, 2025", status: "Pending",  notes: "Results under review." },
  ],
  Vaccinations: [
    { id: "VC-001", title: "COVID-19 Booster",     doctor: "Dr. Garcia", date: "May 1, 2025",  status: "Normal", notes: "Moderna XBB.1.5 booster administered." },
    { id: "VC-002", title: "Hepatitis B – Dose 2", doctor: "Dr. Cruz",   date: "Mar 10, 2025", status: "Normal", notes: "3rd dose due September 2025." },
    { id: "VC-003", title: "Influenza Vaccine",    doctor: "Dr. Garcia", date: "Jan 8, 2025",  status: "Normal", notes: "Annual flu vaccine completed." },
  ],
  "Medical Documents": [
    { id: "MD-001", title: "Annual Physical Exam", doctor: "Dr. Santos", date: "Apr 20, 2025", status: "Normal", notes: "Overall health is satisfactory." },
    { id: "MD-002", title: "Chest X-Ray Report",   doctor: "Dr. Tan",    date: "Feb 14, 2025", status: "Normal", notes: "No acute cardiopulmonary process." },
  ],
};

const RECENT_FILES: RecentFile[] = [
  { name: "Blood Test Report.pdf",       date: "Oct 10, 2026", size: "2.4 MB", type: "pdf" },
  { name: "Chest X-Ray Scan.jpg",        date: "Sep 28, 2026", size: "5.1 MB", type: "img" },
  { name: "Prescription – Oct 2026.pdf", date: "Oct 1, 2026",  size: "0.8 MB", type: "pdf" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: RecordItem["status"] }) {
  const map = {
    Normal:   "bg-emerald-100 text-emerald-700",
    Pending:  "bg-amber-100 text-amber-700",
    Abnormal: "bg-red-100 text-red-700",
  };
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${map[status]}`}>
      {status}
    </span>
  );
}

function FileTypeIcon({ type }: { type: RecentFile["type"] }) {
  const map = {
    pdf: "bg-red-50 text-red-500",
    img: "bg-purple-50 text-purple-500",
    doc: "bg-blue-50 text-blue-500",
  };
  return (
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${map[type]}`}>
      <FileText className="w-6 h-6" />
    </div>
  );
}

// ─── Category Detail Bottom Sheet ────────────────────────────────────────────

function CategorySheet({
  show, onClose, title, color, icon: Icon,
}: {
  show: boolean; onClose: () => void;
  title: string; color: string; icon: any;
}) {
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | RecordItem["status"]>("All");
  const [selectedRecord, setSelectedRecord] = useState<RecordItem | null>(null);

  const records = CATEGORY_RECORDS[title] ?? [];

  const filtered = useMemo(() => records.filter(r => {
    const matchSearch  = r.title.toLowerCase().includes(search.toLowerCase()) ||
                         r.doctor.toLowerCase().includes(search.toLowerCase());
    const matchStatus  = filterStatus === "All" || r.status === filterStatus;
    return matchSearch && matchStatus;
  }), [search, filterStatus, records]);

  const handleClose = () => {
    setSearch("");
    setFilterStatus("All");
    setSelectedRecord(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-50 max-h-[88vh] flex flex-col"
          >
            {/* Sheet header */}
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1A1A2E]">{title}</h2>
                  <p className="text-xs text-gray-500">{records.length} records</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-95 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search + filter */}
            <div className="px-6 py-3 space-y-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search records…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 bg-[#F8FAFC] rounded-xl text-sm text-gray-700 placeholder-gray-400 ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                {(["All", "Normal", "Pending", "Abnormal"] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      filterStatus === s
                        ? "bg-[#1A73E8] text-white"
                        : "bg-gray-100 text-gray-600 active:bg-gray-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Record list */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                    <FileText className="w-7 h-7 text-gray-400" />
                  </div>
                  <p className="font-semibold text-gray-600">No records found</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
                </div>
              ) : (
                filtered.map((record, i) => (
                  <motion.button
                    key={record.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedRecord(record)}
                    className="w-full bg-[#F8FAFC] rounded-2xl p-4 text-left active:scale-[0.98] transition-transform border border-gray-100 hover:border-gray-200"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#1A1A2E] text-sm">{record.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{record.doctor} · {record.date}</p>
                        <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">{record.notes}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <StatusBadge status={record.status} />
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>

          {/* Record detail modal */}
          <AnimatePresence>
            {selectedRecord && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setSelectedRecord(null)}
                  className="fixed inset-0 bg-black/60 z-50"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-3xl z-50 overflow-hidden shadow-2xl"
                >
                  <div className="bg-[#1A73E8] px-6 py-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-blue-200 text-xs font-medium uppercase tracking-widest mb-1">{title}</p>
                        <h3 className="text-white font-bold text-lg leading-tight">{selectedRecord.title}</h3>
                      </div>
                      <button
                        onClick={() => setSelectedRecord(null)}
                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white active:scale-95 transition-transform"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-3">
                      <StatusBadge status={selectedRecord.status} />
                    </div>
                  </div>
                  <div className="px-6 py-5 space-y-4">
                    {[
                      { label: "Record ID", value: selectedRecord.id },
                      { label: "Physician", value: selectedRecord.doctor },
                      { label: "Date",      value: selectedRecord.date },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                        <p className="text-sm text-gray-500">{label}</p>
                        <p className="text-sm font-bold text-[#1A1A2E]">{value}</p>
                      </div>
                    ))}
                    <div className="bg-[#F8FAFC] rounded-xl p-4">
                      <p className="text-xs text-gray-500 font-medium mb-1">Notes</p>
                      <p className="text-sm text-[#1A1A2E]">{selectedRecord.notes}</p>
                    </div>
                    <button
                      onClick={() => setSelectedRecord(null)}
                      className="w-full py-3 bg-[#1A73E8] text-white font-bold rounded-xl active:scale-[0.98] transition-transform shadow-md shadow-blue-500/20"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── RecordCategory (preserved + enhanced) ───────────────────────────────────

function RecordCategory({ icon: Icon, title, count, color, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between active:scale-[0.98] transition-all hover:border-gray-200 hover:shadow-md group"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="font-bold text-[#1A1A2E] text-base">{title}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
          {count} items
        </span>
        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#1A73E8] transition-colors" />
      </div>
    </button>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  { icon: FileText,  title: "Prescriptions",    count: 12, color: "bg-blue-100 text-blue-600"    },
  { icon: Activity,  title: "Lab Results",       count: 5,  color: "bg-teal-100 text-teal-600"    },
  { icon: Syringe,   title: "Vaccinations",      count: 8,  color: "bg-purple-100 text-purple-600" },
  { icon: FileStack, title: "Medical Documents", count: 3,  color: "bg-orange-100 text-orange-600" },
];

export function Records() {
  const navigate = useNavigate();
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const [showAllFiles, setShowAllFiles] = useState(false);

  const activeCategory = CATEGORIES.find(c => c.title === activeSheet);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* ── Header ── */}
      <div className="px-6 py-6 bg-[#1A73E8] text-white sticky top-0 z-10 rounded-b-[32px] shadow-md">
        {/* Back button + title */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-2xl bg-white/15 flex items-center justify-center active:scale-95 transition-transform hover:bg-white/25"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold leading-tight">My Health Records</h1>
            <p className="text-blue-200 text-xs mt-0.5">Barangay Health Services</p>
          </div>
        </div>

        {/* Patient card — unchanged from original */}
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
          <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-4">
            <div>
              <p className="text-white/80 text-xs mb-1">Patient Name</p>
              <p className="font-bold">John Doe</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-xs mb-1">Age</p>
              <p className="font-bold">32 Yrs</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white/80 text-xs mb-1">Blood Type</p>
              <p className="font-bold text-red-200">O+</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-xs mb-1">Allergies</p>
              <p className="font-bold">Penicillin</p>
            </div>
          </div>
        </div>

        {/* Summary stats row */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: "Total Records", value: 28 },
            { label: "This Month",    value: 4  },
            { label: "Pending",       value: 3  },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/10 rounded-2xl py-3 px-2 text-center border border-white/15">
              <p className="text-xl font-bold">{value}</p>
              <p className="text-white/70 text-[10px] mt-0.5 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-4">

          {/* Section label */}
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1A1A2E]">Categories</h2>
            <span className="text-xs text-gray-400">Tap to view records</span>
          </div>

          {/* Categories */}
          {CATEGORIES.map(({ icon: Icon, title, count, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <RecordCategory
                icon={Icon}
                title={title}
                count={count}
                color={color}
                onClick={() => setActiveSheet(title)}
              />
            </motion.div>
          ))}

          {/* Recent Files */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-[#1A1A2E]">Recent Files</h2>
              <button
                onClick={() => setShowAllFiles(v => !v)}
                className="text-xs font-bold text-[#1A73E8] active:opacity-70"
              >
                {showAllFiles ? "Show less" : "See all"}
              </button>
            </div>
            <div className="space-y-3">
              {(showAllFiles ? RECENT_FILES : RECENT_FILES.slice(0, 1)).map((file, i) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <FileTypeIcon type={file.type} />
                    <div>
                      <p className="font-bold text-[#1A1A2E] text-sm">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.date} · {file.size}</p>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-blue-50 text-[#1A73E8] flex items-center justify-center active:scale-90 transition-transform hover:bg-blue-100">
                    <Download className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="h-6" />
        </div>
      </div>

      {/* ── Category Detail Sheet ── */}
      {activeCategory && (
        <CategorySheet
          show={!!activeSheet}
          onClose={() => setActiveSheet(null)}
          title={activeCategory.title}
          color={activeCategory.color}
          icon={activeCategory.icon}
        />
      )}
    </div>
  );
}