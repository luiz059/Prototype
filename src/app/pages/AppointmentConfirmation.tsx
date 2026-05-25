import { useNavigate } from "react-router";
import { Calendar, Clock, MapPin, CheckCircle2, Download, Share2, Home, CalendarPlus } from "lucide-react";
import { motion } from "motion/react";

export function AppointmentConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-y-auto">
      {/* Success Hero */}
      <div className="bg-white px-6 pt-16 pb-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">Appointment Booked!</h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Your appointment has been confirmed. A reminder will be sent 24 hours before.
          </p>
        </motion.div>
      </div>

      <div className="px-4 pb-8 space-y-4">
        {/* Booking Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1A73E8] rounded-2xl p-5 text-white"
        >
          <p className="text-white/70 text-xs mb-1 font-medium">BOOKING REFERENCE</p>
          <p className="text-2xl font-bold tracking-wider mb-4">#CC-2026-04891</p>
          <div className="h-px bg-white/20 mb-4" />
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white/30 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-lg">Dr. Sarah Jenkins</p>
              <p className="text-white/70 text-sm">Cardiologist</p>
            </div>
          </div>
        </motion.div>

        {/* Appointment Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4"
        >
          <h2 className="font-bold text-[#1A1A2E]">Appointment Details</h2>

          <div className="space-y-3">
            <DetailRow icon={Calendar} label="Date" value="Wednesday, May 14, 2026" />
            <div className="h-px bg-gray-100" />
            <DetailRow icon={Clock} label="Time" value="10:00 AM – 10:30 AM" />
            <div className="h-px bg-gray-100" />
            <DetailRow icon={MapPin} label="Location" value="City Heart Hospital, Floor 3" />
          </div>

          <div className="bg-[#F8FAFC] rounded-xl p-3 flex justify-between items-center">
            <span className="text-sm text-gray-500">Consultation Type</span>
            <span className="text-sm font-bold text-[#1A1A2E] bg-blue-100 text-[#1A73E8] px-3 py-1 rounded-full">In-Clinic</span>
          </div>
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
        >
          <h2 className="font-bold text-[#1A1A2E] mb-4">Payment Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Consultation Fee</span>
              <span className="font-medium text-[#1A1A2E]">$150.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Service Fee</span>
              <span className="font-medium text-[#1A1A2E]">$5.00</span>
            </div>
            <div className="h-px bg-gray-100 my-2" />
            <div className="flex justify-between">
              <span className="font-bold text-[#1A1A2E]">Total</span>
              <span className="font-bold text-[#1A73E8] text-lg">$155.00</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <button className="w-full h-14 bg-white border border-[#1A73E8] text-[#1A73E8] rounded-xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            <CalendarPlus className="w-5 h-5" />
            Add to Calendar
          </button>

          <button className="w-full h-14 bg-white border border-gray-200 text-gray-600 rounded-xl font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            <Download className="w-5 h-5" />
            Download Receipt
          </button>

          <button
            onClick={() => navigate("/app")}
            className="w-full h-14 bg-[#1A73E8] text-white rounded-xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-md shadow-blue-500/20"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-[#1A73E8]" />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-bold text-[#1A1A2E]">{value}</p>
      </div>
    </div>
  );
}
