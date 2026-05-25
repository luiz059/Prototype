import { useNavigate } from "react-router";
import { Activity, ChevronLeft } from "lucide-react";

export function Register() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full bg-white overflow-y-auto">
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-gray-50 text-gray-700"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-base font-semibold text-[#1A1A2E] ml-2">Create Account</span>
      </div>

      <div className="px-6 py-6 flex-1">
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full h-14 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. john@example.com"
              className="w-full h-14 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full h-14 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full h-14 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]"
            />
          </div>
        </div>

        <button
          onClick={() => navigate("/app")}
          className="w-full h-14 bg-[#1A73E8] text-white rounded-xl font-medium text-base active:scale-[0.98] transition-transform shadow-md shadow-blue-500/20 mb-6"
        >
          Register
        </button>

        <div className="text-center text-sm">
          <span className="text-gray-500">Already have an account? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-[#1A73E8] font-medium"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
