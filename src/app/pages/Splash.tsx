import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Activity } from "lucide-react";
import { motion } from "motion/react";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#1A73E8] text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <Activity className="w-10 h-10 text-[#1A73E8]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">CareConnect</h1>
        <p className="text-white/80 font-medium">Your Health, Our Priority</p>
      </motion.div>
    </div>
  );
}
