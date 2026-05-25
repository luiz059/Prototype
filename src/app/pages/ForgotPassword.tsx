import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Mail, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 px-6 pt-8"
          >
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-[#1A1A2E] mb-3">
                Forgot Password?
              </h1>
              <p className="text-gray-500 leading-relaxed">
                Don't worry! Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full h-14 pl-11 pr-4 bg-[#F8FAFC] text-gray-900 rounded-xl border-0 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1A73E8] sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-14 bg-[#1A73E8] text-white rounded-xl font-medium text-base shadow-md shadow-blue-500/20 active:scale-[0.98] transition-transform"
              >
                Send Reset Link
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-gray-600"
              >
                Remember your password?{" "}
                <span className="text-[#1A73E8] font-medium">Sign In</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center px-6 text-center"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3">
              Check Your Email
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-[300px] mb-8">
              We've sent a password reset link to{" "}
              <span className="font-medium text-[#1A1A2E]">{email}</span>
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full h-14 bg-[#1A73E8] text-white rounded-xl font-medium text-base shadow-md shadow-blue-500/20"
            >
              Back to Sign In
            </button>
            <button
              onClick={() => setSent(false)}
              className="mt-4 text-sm text-gray-600"
            >
              Didn't receive the email?{" "}
              <span className="text-[#1A73E8] font-medium">Resend</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
