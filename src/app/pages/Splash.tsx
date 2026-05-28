import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import logoImg from "../../uploads/careconnect-logo.png";

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
        <img src={logoImg} alt="CareConnect Logo" className="w-36 h-36 object-contain mb-6" />
        <h1 className="text-3xl font-bold tracking-tight mb-2">CareConnect</h1>
        <p className="text-white/80 font-medium">Your Health, Our Priority</p>
      </motion.div>
    </div>
  );
}