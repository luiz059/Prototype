import { useState } from "react";
import { Calendar, Pill, Activity, FileText, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export function MedicalHistory() {
  const [activeTab, setActiveTab] = useState("Timeline");

  const timeline = [
    {
      date: "Oct 15, 2026",
      type: "Consultation",
      doctor: "Dr. Sarah Jenkins",
      specialty: "Cardiologist",
      diagnosis: "Routine Checkup",
      notes: "Blood pressure normal. Heart rate: 72 bpm. Patient in good health.",
      prescription: "Continue current medication",
    },
    {
      date: "Sep 8, 2026",
      type: "Lab Result",
      title: "Complete Blood Count",
      status: "Normal",
      details: "All values within normal range. Hemoglobin: 14.2 g/dL",
    },
    {
      date: "Aug 22, 2026",
      type: "Consultation",
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      diagnosis: "Mild Eczema",
      notes: "Prescribed topical steroid cream. Follow up in 4 weeks.",
      prescription: "Hydrocortisone 1% cream",
    },
    {
      date: "Jul 10, 2026",
      type: "Vaccination",
      title: "Influenza Vaccine",
      status: "Completed",
      details: "Annual flu shot administered. No adverse reactions.",
    },
  ];

  const medications = [
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "Ongoing",
      prescribedBy: "Dr. Sarah Jenkins",
      startDate: "Jan 2025",
      active: true,
    },
    {
      name: "Vitamin D3",
      dosage: "2000 IU",
      frequency: "Once daily",
      duration: "Ongoing",
      prescribedBy: "Dr. Michael Chen",
      startDate: "Mar 2025",
      active: true,
    },
    {
      name: "Hydrocortisone Cream",
      dosage: "1%",
      frequency: "As needed",
      duration: "4 weeks",
      prescribedBy: "Dr. Michael Chen",
      startDate: "Aug 2026",
      active: false,
    },
  ];

  const diagnoses = [
    { condition: "Hypertension (Stage 1)", diagnosedDate: "Jan 2025", status: "Managed" },
    { condition: "Vitamin D Deficiency", diagnosedDate: "Mar 2025", status: "Resolved" },
    { condition: "Mild Eczema", diagnosedDate: "Aug 2026", status: "Resolved" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="px-6 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-[#1A1A2E] mb-6">Medical History</h1>

        <div className="flex bg-gray-100 p-1 rounded-xl">
          {["Timeline", "Medications", "Diagnoses"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === tab ? "bg-white text-[#1A1A2E] shadow-sm" : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "Timeline" && (
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative"
              >
                {i !== timeline.length - 1 && (
                  <div className="absolute left-[30px] top-[60px] w-0.5 h-[calc(100%+16px)] bg-gray-200" />
                )}

                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    item.type === "Consultation" ? "bg-blue-100" :
                    item.type === "Lab Result" ? "bg-teal-100" :
                    item.type === "Vaccination" ? "bg-purple-100" : "bg-gray-100"
                  }`}>
                    {item.type === "Consultation" ? <Activity className="w-5 h-5 text-blue-600" /> :
                     item.type === "Lab Result" ? <FileText className="w-5 h-5 text-teal-600" /> :
                     item.type === "Vaccination" ? <Pill className="w-5 h-5 text-purple-600" /> :
                     <Calendar className="w-5 h-5 text-gray-600" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 font-medium">{item.date}</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        item.type === "Consultation" ? "bg-blue-50 text-blue-700" :
                        item.type === "Lab Result" ? "bg-teal-50 text-teal-700" :
                        "bg-purple-50 text-purple-700"
                      }`}>
                        {item.type}
                      </span>
                    </div>

                    {"doctor" in item ? (
                      <>
                        <h3 className="font-bold text-[#1A1A2E] mb-1">{item.doctor}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.specialty}</p>
                        <div className="bg-[#F8FAFC] rounded-xl p-3 mb-2">
                          <p className="text-xs text-gray-500 mb-1">Diagnosis</p>
                          <p className="text-sm font-medium text-[#1A1A2E]">{item.diagnosis}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.notes}</p>
                        {item.prescription && (
                          <div className="flex items-center gap-2 text-sm">
                            <Pill className="w-4 h-4 text-[#1A73E8]" />
                            <span className="text-[#1A73E8] font-medium">{item.prescription}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <h3 className="font-bold text-[#1A1A2E] mb-2">{item.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
                            {item.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{item.details}</p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "Medications" && (
          <div className="space-y-4">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#1A1A2E] mb-4">Active Medications</h2>
              {medications.filter(m => m.active).map((med, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-[#1A1A2E] text-base mb-1">{med.name}</h3>
                      <p className="text-sm text-gray-500">Prescribed by {med.prescribedBy}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                      Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-[#F8FAFC] rounded-xl p-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Dosage</p>
                      <p className="text-sm font-medium text-[#1A1A2E]">{med.dosage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Frequency</p>
                      <p className="text-sm font-medium text-[#1A1A2E]">{med.frequency}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Duration</p>
                      <p className="text-sm font-medium text-[#1A1A2E]">{med.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Start Date</p>
                      <p className="text-sm font-medium text-[#1A1A2E]">{med.startDate}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#1A1A2E] mb-4">Past Medications</h2>
              {medications.filter(m => !m.active).map((med, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4 opacity-60"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-[#1A1A2E] text-base mb-1">{med.name}</h3>
                      <p className="text-sm text-gray-500">{med.dosage} • {med.frequency}</p>
                    </div>
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-semibold">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Diagnoses" && (
          <div className="space-y-4">
            {diagnoses.map((diagnosis, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1A1A2E] text-base mb-2">{diagnosis.condition}</h3>
                    <p className="text-sm text-gray-500 mb-3">Diagnosed on {diagnosis.diagnosedDate}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                    diagnosis.status === "Managed" ? "bg-blue-100 text-blue-700" :
                    diagnosis.status === "Resolved" ? "bg-green-100 text-green-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>
                    {diagnosis.status}
                  </span>
                </div>
                <button className="flex items-center text-[#1A73E8] text-sm font-medium">
                  View full details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
