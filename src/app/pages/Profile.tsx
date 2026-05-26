import { useState } from "react";
import { useNavigate } from "react-router";
import {
  User, Settings, Shield, HelpCircle, LogOut, ChevronRight, Heart, Bell,
  Lock, Mail, Phone, MapPin, Calendar, X, Camera, Star, BellRing,
  BellOff, MessageSquare, Stethoscope, ChevronDown, CheckCircle2,
  FileText, Headphones, ChevronUp, AlertCircle, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ─── static data ─────────────────────────────────────────────── */
const savedDoctors = [
  { name: "Dr. Sarah Jenkins", specialty: "Cardiologist", rating: 4.8, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop" },
  { name: "Dr. Michael Chen", specialty: "Dermatologist", rating: 4.9, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop" },
];

const faqs = [
  { q: "How do I book an appointment?", a: "Go to the Home screen, tap 'Book' or browse doctors under 'Top Doctors'. Choose your preferred doctor, select a date and time slot, then confirm your booking." },
  { q: "Can I cancel or reschedule an appointment?", a: "Yes. Open the Appointments tab, tap on the appointment you want to change, then select 'Cancel' or 'Reschedule'. Changes must be made at least 2 hours before your slot." },
  { q: "How do I view my medical records?", a: "Tap 'Records' in the quick actions on the Home screen or navigate via the bottom menu. All uploaded and shared records appear there." },
  { q: "Is my health data private?", a: "Absolutely. CareConnect uses end-to-end encryption for all health data. We are fully HIPAA-compliant and never sell your data to third parties." },
  { q: "How do I message my doctor?", a: "Tap the Messages icon in the bottom navigation bar. Select the conversation with your doctor or start a new one from their profile page." },
  { q: "What payment methods are accepted?", a: "We accept major credit/debit cards, GCash, PayMaya, and select HMO plans. Payment details are managed securely in your wallet settings." },
];

/* ─── main component ──────────────────────────────────────────── */
export function Profile() {
  const navigate = useNavigate();

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showSavedDoctors, setShowSavedDoctors] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotifSettings, setShowNotifSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Notification toggles
  const [notifs, setNotifs] = useState({
    appointments: true,
    reminders: true,
    messages: true,
    labResults: true,
    promotions: false,
    appUpdates: true,
  });

  // Save-success feedback
  const [savedProfile, setSavedProfile] = useState(false);
  const [savedPassword, setSavedPassword] = useState(false);
  const [saved2FA, setSaved2FA] = useState(false);

  // FAQ open state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Saved doctors list (removable)
  const [doctors, setDoctors] = useState(savedDoctors);

  const toggleNotif = (key: keyof typeof notifs) =>
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">

      {/* ── Header card ─────────────────────────────────────────── */}
      <div className="px-6 py-8 bg-white border-b border-gray-100 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full border-4 border-blue-50 bg-gray-100 overflow-hidden mb-4 relative group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop"
            alt="User"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-[#1A1A2E] mb-1">Luiz Andrew Reyes</h1>
        <p className="text-[#6B7280] text-sm mb-4">luiz.reyes@example.com</p>
        <button
          onClick={() => setShowEditProfile(true)}
          className="px-6 py-2 bg-blue-50 text-[#1A73E8] font-semibold text-sm rounded-full active:scale-95 transition-transform"
        >
          Edit Profile
        </button>
      </div>

      {/* ── Menu items ──────────────────────────────────────────── */}
      <div className="p-6 overflow-y-auto space-y-6 pb-10">

        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Account</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <ProfileItem icon={User} label="Personal Information" onClick={() => setShowEditProfile(true)} />
            <Divider />
            <ProfileItem icon={Heart} label="Saved Doctors & Clinics" badge={doctors.length} onClick={() => setShowSavedDoctors(true)} />
            <Divider />
            <ProfileItem icon={Bell} label="Notification Settings" onClick={() => setShowNotifSettings(true)} />
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Security & Support</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <ProfileItem icon={Shield} label="Privacy & Security" onClick={() => setShowSecurity(true)} />
            <Divider />
            <ProfileItem icon={HelpCircle} label="Help Center" onClick={() => setShowHelp(true)} />
          </div>
        </div>

        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl font-bold active:scale-[0.98] transition-transform"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>

        <p className="text-center text-xs text-gray-400 pb-2">CareConnect v1.0.0</p>
      </div>

      {/* ════════════════════════════════════════════════════════ */}
      {/*  MODALS                                                 */}
      {/* ════════════════════════════════════════════════════════ */}

      {/* Edit Profile */}
      <Modal show={showEditProfile} onClose={() => { setShowEditProfile(false); setSavedProfile(false); }} title="Edit Profile">
        <div className="space-y-4">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden mb-3 relative group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-500">Tap to change photo</p>
          </div>

          <InputField icon={User} label="Full Name" defaultValue="Luiz Andrew Reyes" />
          <InputField icon={Mail} label="Email" defaultValue="luiz.reyes@example.com" type="email" />
          <InputField icon={Phone} label="Phone" defaultValue="+63 912 345 6789" type="tel" />
          <InputField icon={Calendar} label="Date of Birth" defaultValue="1990-05-15" type="date" />
          <InputField icon={MapPin} label="Address" defaultValue="568 Mayor's Drive, Cavite City" />

          <AnimatePresence>
            {savedProfile && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm font-medium"
              >
                <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowEditProfile(false)} className="flex-1 py-3 bg-gray-100 text-[#1A1A2E] rounded-xl font-medium">
              Cancel
            </button>
            <button
              onClick={() => { setSavedProfile(true); setTimeout(() => setShowEditProfile(false), 1200); }}
              className="flex-1 py-3 bg-[#1A73E8] text-white rounded-xl font-semibold shadow-md shadow-blue-500/20"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Privacy & Security */}
      <Modal show={showSecurity} onClose={() => { setShowSecurity(false); setSavedPassword(false); setSaved2FA(false); }} title="Privacy & Security">
        <div className="space-y-5">

          {/* 2FA card */}
          <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#1A73E8]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A2E] text-sm">Two-Factor Authentication</h3>
                <p className="text-xs text-gray-500">Extra security for your account</p>
              </div>
            </div>
            <AnimatePresence>
              {saved2FA && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-xs text-green-600 font-medium mb-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 2FA enabled successfully!
                </motion.p>
              )}
            </AnimatePresence>
            <button
              onClick={() => { setSaved2FA(true); }}
              className="w-full py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#1A73E8] active:scale-[0.98] transition-transform"
            >
              {saved2FA ? "✓ 2FA Enabled" : "Enable 2FA via SMS"}
            </button>
          </div>

          {/* Password change */}
          <div>
            <h3 className="font-bold text-[#1A1A2E] text-sm mb-3">Change Password</h3>
            <div className="space-y-3">
              <InputField icon={Lock} label="Current Password" type="password" placeholder="Enter current password" />
              <InputField icon={Lock} label="New Password" type="password" placeholder="Enter new password" />
              <InputField icon={Lock} label="Confirm Password" type="password" placeholder="Confirm new password" />
            </div>
          </div>

          <AnimatePresence>
            {savedPassword && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" /> Password updated!
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 pt-1">
            <button onClick={() => setShowSecurity(false)} className="flex-1 py-3 bg-gray-100 text-[#1A1A2E] rounded-xl font-medium">
              Cancel
            </button>
            <button
              onClick={() => { setSavedPassword(true); setTimeout(() => setShowSecurity(false), 1200); }}
              className="flex-1 py-3 bg-[#1A73E8] text-white rounded-xl font-semibold shadow-md shadow-blue-500/20"
            >
              Update Password
            </button>
          </div>
        </div>
      </Modal>

      {/* Saved Doctors */}
      <Modal show={showSavedDoctors} onClose={() => setShowSavedDoctors(false)} title="Saved Doctors">
        <div className="space-y-3">
          {doctors.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Heart className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium text-sm">No saved doctors yet</p>
              <p className="text-gray-400 text-xs mt-1">Bookmark doctors from their profile page</p>
            </div>
          ) : (
            doctors.map((doctor, i) => (
              <motion.div key={i} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-[#F8FAFC] rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
                <img src={doctor.image} alt={doctor.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#1A1A2E] text-sm">{doctor.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">{doctor.specialty}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-semibold text-gray-600">{doctor.rating}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => navigate("/app/schedule")}
                    className="px-3 py-1.5 bg-[#1A73E8] text-white text-xs font-bold rounded-lg"
                  >
                    Book
                  </button>
                  <button
                    onClick={() => setDoctors(prev => prev.filter((_, idx) => idx !== i))}
                    className="w-full flex items-center justify-center py-1.5 bg-red-50 text-red-500 text-xs rounded-lg"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Modal>

      {/* Notification Settings */}
      <Modal show={showNotifSettings} onClose={() => setShowNotifSettings(false)} title="Notification Settings">
        <div className="space-y-2">
          <p className="text-sm text-gray-500 mb-4">Choose which alerts you'd like to receive.</p>

          <NotifToggle
            icon={Calendar}
            color="bg-blue-100 text-blue-600"
            label="Appointment Reminders"
            desc="Get reminded before your visits"
            value={notifs.appointments}
            onToggle={() => toggleNotif("appointments")}
          />
          <NotifToggle
            icon={BellRing}
            color="bg-purple-100 text-purple-600"
            label="Medication Reminders"
            desc="Alerts for prescription refills"
            value={notifs.reminders}
            onToggle={() => toggleNotif("reminders")}
          />
          <NotifToggle
            icon={MessageSquare}
            color="bg-orange-100 text-orange-600"
            label="New Messages"
            desc="When your doctor sends a message"
            value={notifs.messages}
            onToggle={() => toggleNotif("messages")}
          />
          <NotifToggle
            icon={FileText}
            color="bg-teal-100 text-teal-600"
            label="Lab Results"
            desc="When new results are available"
            value={notifs.labResults}
            onToggle={() => toggleNotif("labResults")}
          />
          <NotifToggle
            icon={Stethoscope}
            color="bg-green-100 text-green-600"
            label="Health Tips & Updates"
            desc="Weekly health insights"
            value={notifs.appUpdates}
            onToggle={() => toggleNotif("appUpdates")}
          />
          <NotifToggle
            icon={BellOff}
            color="bg-gray-100 text-gray-500"
            label="Promotions"
            desc="Offers and partner discounts"
            value={notifs.promotions}
            onToggle={() => toggleNotif("promotions")}
          />

          <button
            onClick={() => setShowNotifSettings(false)}
            className="w-full mt-4 py-3 bg-[#1A73E8] text-white rounded-xl font-semibold shadow-md shadow-blue-500/20"
          >
            Save Preferences
          </button>
        </div>
      </Modal>

      {/* Help Center */}
      <Modal show={showHelp} onClose={() => setShowHelp(false)} title="Help Center">
        <div className="space-y-4">

          {/* Contact options */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <button className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-2xl active:scale-95 transition-transform">
              <div className="w-10 h-10 bg-[#1A73E8] rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold text-[#1A1A2E]">Live Chat</span>
              <span className="text-xs text-gray-500">Avg. 2 min reply</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-teal-50 rounded-2xl active:scale-95 transition-transform">
              <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold text-[#1A1A2E]">Call Support</span>
              <span className="text-xs text-gray-500">Mon–Fri 8AM–6PM</span>
            </button>
          </div>

          {/* Alert */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3">
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">For medical emergencies, call <span className="font-bold">911</span> immediately.</p>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="font-bold text-[#1A1A2E] text-sm mb-3">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[#F8FAFC] rounded-xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="text-sm font-semibold text-[#1A1A2E] pr-4">{faq.q}</span>
                    {openFaq === i
                      ? <ChevronUp className="w-4 h-4 text-[#1A73E8] flex-shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    }
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium active:scale-[0.98] transition-transform">
            <ExternalLink className="w-4 h-4" />
            Visit Full Help Center
          </button>
        </div>
      </Modal>

      {/* Logout Confirmation */}
      <Modal show={showLogoutConfirm} onClose={() => setShowLogoutConfirm(false)} title="Log Out">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="font-bold text-[#1A1A2E] mb-2">Are you sure?</h3>
          <p className="text-gray-500 text-sm mb-6">You'll need to sign in again to access your health records and appointments.</p>
          <div className="flex gap-3">
            <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-3 bg-gray-100 text-[#1A1A2E] rounded-xl font-semibold">
              Stay
            </button>
            <button onClick={() => navigate("/login")} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold shadow-md shadow-red-500/20">
              Log Out
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

/* ─── helpers ─────────────────────────────────────────────────── */
function Divider() {
  return <div className="h-px bg-gray-100 ml-[72px]" />;
}

function ProfileItem({ icon: Icon, label, badge, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
          <Icon className="w-5 h-5" />
        </div>
        <span className="font-medium text-[#1A1A2E]">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge != null && (
          <span className="px-2 py-0.5 bg-blue-100 text-[#1A73E8] text-xs font-bold rounded-full">
            {badge}
          </span>
        )}
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </button>
  );
}

function NotifToggle({ icon: Icon, color, label, desc, value, onToggle }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-2xl border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1A1A2E]">{label}</p>
          <p className="text-xs text-gray-400">{desc}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
          value ? "bg-[#1A73E8]" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
            value ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function Modal({ show, onClose, title, children }: any) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-50 max-h-[88vh] flex flex-col"
          >
            <div className="flex-shrink-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-lg font-bold text-[#1A1A2E]">{title}</h2>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 px-6 py-5">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InputField({ icon: Icon, label, type = "text", defaultValue = "", placeholder = "" }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="block w-full h-12 pl-11 pr-4 bg-[#F8FAFC] text-gray-900 rounded-xl border-0 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1A73E8] text-sm outline-none transition"
        />
      </div>
    </div>
  );
}