import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Stethoscope, CalendarCheck, FileText, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Find Doctors Near You",
    subtitle: "Discover the best specialists around your location effortlessly.",
    icon: Stethoscope,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Book Appointments Instantly",
    subtitle: "Schedule in-clinic or telemedicine appointments in seconds.",
    icon: CalendarCheck,
    color: "bg-teal-100 text-teal-600",
  },
  {
    title: "Your Health, Your Records",
    subtitle: "Keep track of your medical history and prescriptions securely.",
    icon: FileText,
    color: "bg-purple-100 text-purple-600",
  },
];

export function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      navigate("/login");
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const Icon = slides[currentSlide].icon;

  return (
    <div className="flex flex-col w-full h-full bg-white relative pb-8">
      <div className="flex justify-end p-6">
        <button
          onClick={() => navigate("/login")}
          className="text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className={`w-64 h-64 rounded-full flex items-center justify-center mb-10 ${slides[currentSlide].color}`}>
              <Icon className="w-32 h-32" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">
              {slides[currentSlide].title}
            </h2>
            <p className="text-[#6B7280] text-sm leading-relaxed max-w-[280px]">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center px-8 pb-8 pt-4">
        <div className="flex gap-2 mb-8">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-[#1A73E8]" : "w-2 bg-gray-200"
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="w-full h-14 bg-[#1A73E8] text-white rounded-xl font-medium text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
