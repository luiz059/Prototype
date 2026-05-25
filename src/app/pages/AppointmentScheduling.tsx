import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeft, Calendar, Clock, Video, Building2, ChevronDown,
  Upload, User, AlertCircle, CheckCircle2, CreditCard, Wallet,
  Smartphone, Shield, Lock, ChevronRight, FileText, X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ─── data ────────────────────────────────────────────────────── */
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

const paymentMethods = [
  { id: "card",   icon: CreditCard,  label: "Credit / Debit Card",  sub: "Visa, Mastercard, JCB" },
  { id: "gcash",  icon: Smartphone,  label: "GCash",                sub: "Pay via mobile wallet" },
  { id: "paymaya",icon: Wallet,      label: "PayMaya",              sub: "Pay via mobile wallet" },
  { id: "hmo",    icon: Shield,      label: "HMO / Insurance",      sub: "PhilHealth, Maxicare, Medicard" },
];

/* ════════════════════════════════════════════════════════════════ */
export function AppointmentScheduling() {
  const navigate = useNavigate();

  /* step 1 state */
  const [consultType, setConsultType]         = useState("In-Clinic");
  const [selectedReason, setSelectedReason]   = useState("");
  const [symptoms, setSymptoms]               = useState("");
  const [showReasonDropdown, setShowDropdown] = useState(false);
  const [uploadedFile, setUploadedFile]       = useState<string | null>(null);

  /* step 2 state */
  const [step, setStep]                       = useState<1 | 2>(1);
  const [paymentMethod, setPaymentMethod]     = useState("card");
  const [cardNumber, setCardNumber]           = useState("");
  const [cardName, setCardName]               = useState("");
  const [cardExpiry, setCardExpiry]           = useState("");
  const [cardCvv, setCardCvv]                 = useState("");
  const [agreeTerms, setAgreeTerms]           = useState(false);
  const [showCardForm, setShowCardForm]       = useState(false);

  /* validation */
  const step1Valid = selectedReason.trim() !== "";
  const step2Valid = agreeTerms && (
    paymentMethod !== "card" || (cardNumber.length >= 16 && cardName && cardExpiry && cardCvv)
  );

  /* handlers */
  const handleNext = () => {
    if (step1Valid) setStep(2);
  };

  const handleConfirm = () => {
    if (step2Valid) navigate("/app/confirmation");
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  /* ── STEP 1 ──────────────────────────────────────────────────── */
  if (step === 1) return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">

      {/* header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center gap-3 border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 active:scale-95 transition-transform">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-[#1A1A2E]">Schedule Appointment</h1>
          <p className="text-xs text-gray-500">Step 1 of 2 — Visit Details</p>
        </div>
        <span className="text-xs font-semibold text-[#1A73E8] bg-blue-50 px-3 py-1 rounded-full">1 / 2</span>
      </div>

      {/* progress */}
      <div className="h-1.5 bg-gray-100">
        <motion.div initial={{ width: 0 }} animate={{ width: "50%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-[#1A73E8] rounded-full" />
      </div>

      <div className="flex-1 overflow-y-auto pb-6">

        {/* doctor card */}
        <div className="mx-4 mt-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-blue-50 flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop" alt="Doctor" className="w-full h-full object-cover" />
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

          {/* consultation type */}
          <div>
            <label className="block text-sm font-bold text-[#1A1A2E] mb-3">Consultation Type</label>
            <div className="flex gap-3">
              {[{ label: "In-Clinic", icon: Building2 }, { label: "Telemedicine", icon: Video }].map(({ label, icon: Icon }) => (
                <button key={label} onClick={() => setConsultType(label)}
                  className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all ${
                    consultType === label
                      ? "border-[#1A73E8] bg-blue-50 text-[#1A73E8]"
                      : "border-gray-200 bg-white text-gray-500"
                  }`}>
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* reason dropdown */}
          <div>
            <label className="block text-sm font-bold text-[#1A1A2E] mb-3">
              Reason for Visit <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button onClick={() => setShowDropdown(v => !v)}
                className={`w-full h-14 px-4 bg-white rounded-xl text-left flex items-center justify-between text-sm border transition-all ${
                  showReasonDropdown ? "border-[#1A73E8] ring-1 ring-[#1A73E8]" : "border-gray-200"
                }`}>
                <span className={selectedReason ? "text-[#1A1A2E] font-medium" : "text-gray-400"}>
                  {selectedReason || "Select reason for visit"}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showReasonDropdown ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showReasonDropdown && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                    {reasons.map(r => (
                      <button key={r} onClick={() => { setSelectedReason(r); setShowDropdown(false); }}
                        className={`w-full px-4 py-3.5 text-left text-sm font-medium border-b border-gray-50 last:border-0 transition-colors flex items-center justify-between ${
                          selectedReason === r ? "bg-blue-50 text-[#1A73E8]" : "text-[#1A1A2E] hover:bg-gray-50"
                        }`}>
                        {r}
                        {selectedReason === r && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* symptoms */}
          <div>
            <label className="block text-sm font-bold text-[#1A1A2E] mb-3">Describe Your Symptoms</label>
            <textarea value={symptoms} onChange={e => setSymptoms(e.target.value.slice(0, 500))}
              placeholder="Describe your symptoms or concerns to help the doctor prepare..."
              rows={4}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#1A1A2E] placeholder:text-gray-400 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] resize-none leading-relaxed" />
            <p className="text-xs text-gray-400 mt-1 text-right">{symptoms.length}/500</p>
          </div>

          {/* upload */}
          <div>
            <label className="block text-sm font-bold text-[#1A1A2E] mb-3">
              Upload Documents <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            {uploadedFile ? (
              <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="w-10 h-10 bg-[#1A73E8] rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1A1A2E] truncate">{uploadedFile}</p>
                  <p className="text-xs text-gray-500">Uploaded successfully</p>
                </div>
                <button onClick={() => setUploadedFile(null)}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ) : (
              <button onClick={() => setUploadedFile("Lab_Results_Oct2026.pdf")}
                className="w-full h-20 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 bg-white hover:border-[#1A73E8] hover:bg-blue-50 transition-colors active:scale-[0.98]">
                <Upload className="w-6 h-6 text-gray-400" />
                <p className="text-sm text-gray-400">Tap to upload lab results, prescriptions</p>
              </button>
            )}
          </div>

          {/* patient info */}
          <div>
            <label className="block text-sm font-bold text-[#1A1A2E] mb-3">Patient Information</label>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#1A73E8]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Full Name</p>
                  <p className="text-sm font-bold text-[#1A1A2E]">John Doe</p>
                </div>
                <button onClick={() => navigate("/app/profile")} className="text-xs text-[#1A73E8] font-semibold">Edit</button>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="grid grid-cols-3 gap-3 text-center">
                {[["Age", "32", "text-[#1A1A2E]"], ["Blood Type", "O+", "text-red-500"], ["Allergies", "Pen.", "text-[#1A1A2E]"]].map(([label, val, color]) => (
                  <div key={label} className="bg-[#F8FAFC] rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">{label}</p>
                    <p className={`text-sm font-bold ${color}`}>{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* note */}
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

      {/* bottom CTA */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">Consultation Fee</span>
          <span className="font-bold text-[#1A1A2E] text-lg">$150.00</span>
        </div>
        <button onClick={handleNext} disabled={!step1Valid}
          className={`w-full h-14 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
            step1Valid
              ? "bg-[#1A73E8] text-white shadow-md shadow-blue-500/20 active:scale-[0.98]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}>
          Next — Payment
          <ChevronRight className="w-5 h-5" />
        </button>
        {!step1Valid && (
          <p className="text-center text-xs text-red-400 mt-2">Please select a reason for your visit</p>
        )}
      </div>
    </div>
  );

  /* ── STEP 2 ──────────────────────────────────────────────────── */
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">

      {/* header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center gap-3 border-b border-gray-100 shadow-sm">
        <button onClick={() => setStep(1)}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 active:scale-95 transition-transform">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-[#1A1A2E]">Payment & Review</h1>
          <p className="text-xs text-gray-500">Step 2 of 2 — Confirm & Pay</p>
        </div>
        <span className="text-xs font-semibold text-[#1A73E8] bg-blue-50 px-3 py-1 rounded-full">2 / 2</span>
      </div>

      {/* progress */}
      <div className="h-1.5 bg-gray-100">
        <motion.div initial={{ width: "50%" }} animate={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-[#1A73E8] rounded-full" />
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        <div className="px-4 pt-5 space-y-5">

          {/* booking summary */}
          <div>
            <p className="text-sm font-bold text-[#1A1A2E] mb-3">Booking Summary</p>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 flex items-center gap-4">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop"
                  alt="Doctor" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-[#1A1A2E]">Dr. Sarah Jenkins</h3>
                  <p className="text-sm text-[#1A73E8] font-medium">Cardiologist</p>
                  <p className="text-xs text-gray-500">City Heart Hospital</p>
                </div>
              </div>
              <div className="border-t border-gray-100 px-4 py-3 space-y-2.5">
                {[
                  [Calendar, "Date",  "Wednesday, May 14, 2026"],
                  [Clock,    "Time",  "10:00 AM – 10:30 AM"],
                  [consultType === "In-Clinic" ? Building2 : Video, "Type", consultType],
                  [FileText, "Reason", selectedReason],
                ].map(([Icon, label, val]: any) => (
                  <div key={label} className="flex items-center gap-3 text-sm">
                    <Icon className="w-4 h-4 text-[#1A73E8] flex-shrink-0" />
                    <span className="text-gray-400 w-16 flex-shrink-0">{label}</span>
                    <span className="font-semibold text-[#1A1A2E] truncate">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* payment method */}
          <div>
            <p className="text-sm font-bold text-[#1A1A2E] mb-3">Payment Method</p>
            <div className="space-y-2.5">
              {paymentMethods.map(pm => {
                const Icon = pm.icon;
                const isSelected = paymentMethod === pm.id;
                return (
                  <button key={pm.id}
                    onClick={() => { setPaymentMethod(pm.id); setShowCardForm(pm.id === "card"); }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? "border-[#1A73E8] bg-blue-50"
                        : "border-gray-200 bg-white"
                    }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected ? "bg-[#1A73E8]" : "bg-gray-100"
                    }`}>
                      <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-gray-500"}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-bold ${isSelected ? "text-[#1A73E8]" : "text-[#1A1A2E]"}`}>{pm.label}</p>
                      <p className="text-xs text-gray-400">{pm.sub}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? "border-[#1A73E8]" : "border-gray-300"
                    }`}>
                      {isSelected && <div className="w-2.5 h-2.5 bg-[#1A73E8] rounded-full" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* card form */}
          <AnimatePresence>
            {paymentMethod === "card" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
                className="overflow-hidden">
                <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
                  <p className="text-sm font-bold text-[#1A1A2E] mb-1">Card Details</p>

                  {/* card number */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Card Number</label>
                    <div className="relative">
                      <input value={cardNumber}
                        onChange={e => setCardNumber(formatCard(e.target.value))}
                        placeholder="0000 0000 0000 0000" maxLength={19}
                        className="w-full h-12 pl-4 pr-12 bg-[#F8FAFC] rounded-xl border border-gray-200 text-sm font-medium text-[#1A1A2E] placeholder:text-gray-300 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] tracking-widest" />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    </div>
                  </div>

                  {/* cardholder name */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Cardholder Name</label>
                    <input value={cardName} onChange={e => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full h-12 px-4 bg-[#F8FAFC] rounded-xl border border-gray-200 text-sm text-[#1A1A2E] placeholder:text-gray-300 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]" />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Expiry Date</label>
                      <input value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/YY" maxLength={5}
                        className="w-full h-12 px-4 bg-[#F8FAFC] rounded-xl border border-gray-200 text-sm text-[#1A1A2E] placeholder:text-gray-300 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]" />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-gray-500 mb-1.5 block">CVV</label>
                      <div className="relative">
                        <input value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="•••" maxLength={4} type="password"
                          className="w-full h-12 pl-4 pr-10 bg-[#F8FAFC] rounded-xl border border-gray-200 text-sm text-[#1A1A2E] placeholder:text-gray-300 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]" />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2.5">
                    <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <p className="text-xs text-green-700 font-medium">Your payment is secured with 256-bit SSL encryption</p>
                  </div>
                </div>
              </motion.div>
            )}

            {(paymentMethod === "gcash" || paymentMethod === "paymaya") && (
              <motion.div key="wallet" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 items-center">
                <Smartphone className="w-5 h-5 text-[#1A73E8] flex-shrink-0" />
                <p className="text-sm text-[#1A73E8] font-medium">
                  You'll be redirected to {paymentMethod === "gcash" ? "GCash" : "PayMaya"} to complete payment after confirming.
                </p>
              </motion.div>
            )}

            {paymentMethod === "hmo" && (
              <motion.div key="hmo" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
                <p className="text-sm font-bold text-[#1A1A2E] mb-1">HMO / Insurance Details</p>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">HMO Provider</label>
                  <input placeholder="e.g. Maxicare, Medicard, PhilHealth"
                    className="w-full h-12 px-4 bg-[#F8FAFC] rounded-xl border border-gray-200 text-sm text-[#1A1A2E] placeholder:text-gray-300 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Member ID / Card Number</label>
                  <input placeholder="Enter your HMO member ID"
                    className="w-full h-12 px-4 bg-[#F8FAFC] rounded-xl border border-gray-200 text-sm text-[#1A1A2E] placeholder:text-gray-300 focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* fee breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-sm font-bold text-[#1A1A2E] mb-3">Order Summary</p>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Consultation Fee</span>
                <span className="font-medium text-[#1A1A2E]">$150.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Platform Fee</span>
                <span className="font-medium text-[#1A1A2E]">$5.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Discount</span>
                <span className="font-medium text-green-600">— $0.00</span>
              </div>
              <div className="h-px bg-gray-100 my-1" />
              <div className="flex justify-between">
                <span className="font-bold text-[#1A1A2E]">Total</span>
                <span className="font-bold text-[#1A73E8] text-base">$155.00</span>
              </div>
            </div>
          </div>

          {/* terms */}
          <button onClick={() => setAgreeTerms(v => !v)}
            className="w-full flex items-start gap-3 text-left">
            <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
              agreeTerms ? "bg-[#1A73E8] border-[#1A73E8]" : "border-gray-300 bg-white"
            }`}>
              {agreeTerms && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              I agree to the <span className="text-[#1A73E8] font-semibold">Terms & Conditions</span> and{" "}
              <span className="text-[#1A73E8] font-semibold">Cancellation Policy</span>. I confirm that the information provided is accurate.
            </p>
          </button>

        </div>
      </div>

      {/* bottom CTA */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">Total to pay</span>
          <span className="font-bold text-[#1A73E8] text-lg">$155.00</span>
        </div>
        <button onClick={handleConfirm} disabled={!step2Valid}
          className={`w-full h-14 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
            step2Valid
              ? "bg-[#1A73E8] text-white shadow-md shadow-blue-500/20 active:scale-[0.98]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}>
          <Lock className="w-4 h-4" />
          Confirm & Pay $155.00
        </button>
        {!agreeTerms && (
          <p className="text-center text-xs text-red-400 mt-2">Please agree to the terms to continue</p>
        )}
      </div>
    </div>
  );
}