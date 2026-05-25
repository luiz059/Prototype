import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Settings, Shield, HelpCircle, LogOut, ChevronRight, Heart, Bell, Lock, Mail, Phone, MapPin, Calendar, X, Camera, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Profile() {
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showSavedDoctors, setShowSavedDoctors] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const savedDoctors = [
    { name: "Dr. Sarah Jenkins", specialty: "Cardiologist", rating: 4.8, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop" },
    { name: "Dr. Michael Chen", specialty: "Dermatologist", rating: 4.9, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="px-6 py-8 bg-white border-b border-gray-100 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full border-4 border-blue-50 bg-gray-100 overflow-hidden mb-4 relative group">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-[#1A1A2E] mb-1">John Doe</h1>
        <p className="text-[#6B7280] text-sm mb-4">john.doe@example.com</p>
        <button
          onClick={() => setShowEditProfile(true)}
          className="px-6 py-2 bg-blue-50 text-[#1A73E8] font-medium text-sm rounded-full active:scale-95 transition-transform"
        >
          Edit Profile
        </button>
      </div>

      <div className="p-6 overflow-y-auto space-y-6">
        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Account</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <ProfileItem icon={User} title="Personal Information" onClick={() => setShowEditProfile(true)} />
            <div className="h-px bg-gray-100 ml-12"></div>
            <ProfileItem icon={Heart} title="Saved Doctors & Clinics" badge={savedDoctors.length} onClick={() => setShowSavedDoctors(true)} />
            <div className="h-px bg-gray-100 ml-12"></div>
            <ProfileItem icon={Bell} title="Notification Settings" />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Security & Support</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <ProfileItem icon={Shield} title="Privacy & Security" onClick={() => setShowSecurity(true)} />
            <div className="h-px bg-gray-100 ml-12"></div>
            <ProfileItem icon={HelpCircle} title="Help Center" />
          </div>
        </div>

        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl font-bold mt-4 active:scale-[0.98] transition-transform"
        >
          <LogOut className="w-6 h-6" />
          <span>Log Out</span>
        </button>

        <p className="text-center text-xs text-gray-400 pb-4">
          CareConnect v1.0.0
        </p>
      </div>

      {/* Edit Profile Modal */}
      <Modal show={showEditProfile} onClose={() => setShowEditProfile(false)} title="Edit Profile">
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

          <InputField icon={User} label="Full Name" defaultValue="John Doe" />
          <InputField icon={Mail} label="Email" defaultValue="john.doe@example.com" type="email" />
          <InputField icon={Phone} label="Phone" defaultValue="+1 (555) 123-4567" type="tel" />
          <InputField icon={Calendar} label="Date of Birth" defaultValue="1990-05-15" type="date" />
          <InputField icon={MapPin} label="Address" defaultValue="123 Main St, New York, NY" />

          <div className="flex gap-3 pt-4">
            <button onClick={() => setShowEditProfile(false)} className="flex-1 py-3 bg-gray-100 text-[#1A1A2E] rounded-xl font-medium">
              Cancel
            </button>
            <button onClick={() => setShowEditProfile(false)} className="flex-1 py-3 bg-[#1A73E8] text-white rounded-xl font-medium shadow-md shadow-blue-500/20">
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Security Modal */}
      <Modal show={showSecurity} onClose={() => setShowSecurity(false)} title="Privacy & Security">
        <div className="space-y-4">
          <div className="bg-[#F8FAFC] rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5 text-[#1A73E8]" />
              <h3 className="font-bold text-[#1A1A2E]">Two-Factor Authentication</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
            <button className="w-full py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-[#1A1A2E]">
              Enable 2FA
            </button>
          </div>

          <InputField icon={Lock} label="Current Password" type="password" placeholder="Enter current password" />
          <InputField icon={Lock} label="New Password" type="password" placeholder="Enter new password" />
          <InputField icon={Lock} label="Confirm Password" type="password" placeholder="Confirm new password" />

          <div className="flex gap-3 pt-4">
            <button onClick={() => setShowSecurity(false)} className="flex-1 py-3 bg-gray-100 text-[#1A1A2E] rounded-xl font-medium">
              Cancel
            </button>
            <button onClick={() => setShowSecurity(false)} className="flex-1 py-3 bg-[#1A73E8] text-white rounded-xl font-medium shadow-md shadow-blue-500/20">
              Update Password
            </button>
          </div>
        </div>
      </Modal>

      {/* Saved Doctors Modal */}
      <Modal show={showSavedDoctors} onClose={() => setShowSavedDoctors(false)} title="Saved Doctors">
        <div className="space-y-3">
          {savedDoctors.map((doctor, i) => (
            <div key={i} className="bg-[#F8FAFC] rounded-xl p-4 flex items-center gap-4">
              <img src={doctor.image} alt={doctor.name} className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1">
                <h3 className="font-bold text-[#1A1A2E] text-sm">{doctor.name}</h3>
                <p className="text-xs text-gray-500">{doctor.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-medium text-gray-600">{doctor.rating}</span>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Modal>

      {/* Logout Confirmation */}
      <Modal show={showLogoutConfirm} onClose={() => setShowLogoutConfirm(false)} title="Log Out">
        <div className="text-center py-4">
          <p className="text-gray-600 mb-6">Are you sure you want to log out of your account?</p>
          <div className="flex gap-3">
            <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-3 bg-gray-100 text-[#1A1A2E] rounded-xl font-medium">
              Cancel
            </button>
            <button onClick={() => navigate("/login")} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium">
              Log Out
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ProfileItem({ icon: Icon, title, badge, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors active:bg-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
          <Icon className="w-5 h-5" />
        </div>
        <span className="font-medium text-[#1A1A2E]">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="px-2 py-0.5 bg-blue-100 text-[#1A73E8] text-xs font-bold rounded-full">
            {badge}
          </span>
        )}
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </button>
  );
}

function Modal({ show, onClose, title, children }: any) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-hidden"
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1A1A2E]">{title}</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-80px)]">
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
      <label className="block text-sm font-medium text-[#1A1A2E] mb-2">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="block w-full h-12 pl-11 pr-4 bg-[#F8FAFC] text-gray-900 rounded-xl border-0 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1A73E8] text-sm"
        />
      </div>
    </div>
  );
}
