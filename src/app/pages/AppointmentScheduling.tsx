import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Calendar, Clock, Video, Building2, ChevronDown, Upload, User, FileText, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export function AppointmentScheduling() {
  const navigate = useNavigate();
  const [consultType, setConsultType] = useState("In-Clinic");
  const [selectedReason, setSelectedReason] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);

  const reasons = [
    "General Consultation",
    "Follow-up Visit",
    "Chest Pain / Discomfort",
    "Shortness of Breath",
    "High Blood Pressure",
    "Heart Palpitations",
    "Routine Checkup",
    "Test Results Review",
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center gap-3 border-b border-gray-100 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-[#1A1A2E]">Schedule Appointment</h1>
          <p className="text-xs text-gray-500">Step 1 of 2</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "50%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-[#1A73E8] rounded-full"
        />
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Doctor Summary Card */}
        <div className="mx-4 mt-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-blue-50 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#1A1A2E]">Dr. Sarah Jenkins</h3>
              <p className="text-sm text-[#1A73E8] font-medium">Cardiologist</p>
              <p className="text-xs text-gray-500 mt-0.5">City Heart Hospital</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Fee</p>
              <p className="font-bold text-[#1A1A2E]">$150</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-[#1A73E8]" />
              <span className="font-medium">Wed, May 14</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-[#1A73E8]" />
              <span className="font-medium">10:00 AM</span>
            </div>
          </div>
        </div>

        <div className="px-4 mt-6 space-y-5">
          {/* Consultation Type */}
          <div>
            <label className="block text-sm font-bold text-[#1A1A2E] mb-3">
              Consultation Type
            </label>
            <div className="flex gap-3">
              {[
                { label: "In-Clinic", icon: Building2 },
                { label: "Telemedicine", icon: Video },
              ].map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setConsultType(label)}
                  className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all ${
                    consultType === label
                      ? "border-[#1A73E8] bg-blue-50 text-[#1A73E8]"
                      : "border-gray-200 bg-white text-gray-500"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reason for Visit */}
          <div>
            <label className="block text-sm font-bold text-[#1A1A2E] mb-3">
              Reason for Visit <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                onClick={() => setShowReasonDropdown(!showReasonDropdown)}
                className="w-full h-14 px-4 bg-white border border-gray-200 rounded-xl text-left flex items-center justify-between text-sm focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
              >
                <span className={selectedReason ? "text-[#1A1A2E] font-medium" : "text-gray-400"}>
                  {selectedReason || "Select reason for visit"}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showReasonDropdown ? "rotate-180" : ""}`} />
              </button>

              {showReasonDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                >
                  {reasons.map((reason) => (
                    <button
                      key={reason}
                      onClick={() => {
                        setSelectedReason(reason);
                        setShowReasonDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-[#1A1A2E] hover:bg-blue-50 hover:text-[#1A73E8] transition-colors font-medium border-b border-gray-50 last:border-0"
                    >
                      {reason}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-sm font-bold text-[#1A1A2E] mb-3">
              Describe Your Symptoms
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe your symptoms or concerns in detail to help the doctor prepare..."
              rows={4}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#1A1A2E] placeholder:text-gray-400 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] resize-none leading-relaxed"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{symptoms.length}/500</p>
          </div>

          {/* Upload Documents */}
          <div>
            <label className="block text-sm font-bold text-[#1A1A2E] mb-3">
              Upload Documents <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <button className="w-full h-20 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 bg-white hover:border-[#1A73E8] hover:bg-blue-50 transition-colors active:scale-[0.98]">
              <Upload className="w-6 h-6 text-gray-400" />
              <p className="text-sm text-gray-400">Tap to upload lab results, prescriptions</p>
            </button>
          </div>

          {/* Patient Info Summary */}
          <div>
            <label className="block text-sm font-bold text-[#1A1A2E] mb-3">
              Patient Information
            </label>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#1A73E8]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Full Name</p>
                  <p className="text-sm font-bold text-[#1A1A2E]">John Doe</p>
                </div>
                <button className="text-xs text-[#1A73E8] font-medium">Edit</button>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#F8FAFC] rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Age</p>
                  <p className="text-sm font-bold text-[#1A1A2E]">32</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Blood Type</p>
                  <p className="text-sm font-bold text-red-500">O+</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Allergies</p>
                  <p className="text-sm font-bold text-[#1A1A2E]">Pen.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-amber-50 rounded-2xl p-4 flex gap-3 border border-amber-100">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-700 mb-1">Before your appointment</p>
              <p className="text-xs text-amber-600 leading-relaxed">
                Please arrive 10 minutes early. Bring a valid ID and any existing medical records or prescriptions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">Consultation Fee</span>
          <span className="font-bold text-[#1A1A2E] text-lg">$150.00</span>
        </div>
        <button
          onClick={() => navigate("/app/confirmation")}
          className="w-full h-14 bg-[#1A73E8] text-white rounded-xl font-bold text-base active:scale-[0.98] transition-transform shadow-md shadow-blue-500/20"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
