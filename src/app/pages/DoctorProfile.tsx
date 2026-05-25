import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Share2, Star, Clock, MapPin, CheckCircle2 } from "lucide-react";

export function DoctorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDay, setSelectedDay] = useState(2);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [type, setType] = useState("In-Clinic");
  const [booked, setBooked] = useState(false);

  // Mock data
  const days = [
    { day: "Mon", date: "12" },
    { day: "Tue", date: "13" },
    { day: "Wed", date: "14" },
    { day: "Thu", date: "15" },
    { day: "Fri", date: "16" },
  ];

  const times = ["09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "03:00 PM"];

  if (booked) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white px-6">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">Appointment Booked!</h2>
        <p className="text-gray-500 text-center mb-8">
          Your appointment has been successfully scheduled. You will receive a confirmation email shortly.
        </p>
        <button
          onClick={() => navigate("/app/appointments")}
          className="w-full h-14 bg-[#1A73E8] text-white rounded-xl font-medium text-base mb-4"
        >
          View Appointments
        </button>
        <button
          onClick={() => navigate("/app")}
          className="w-full h-14 bg-white text-[#1A73E8] border border-blue-100 rounded-xl font-medium text-base"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="absolute top-0 w-full z-10 px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-gray-700">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-gray-700">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        <div className="h-64 bg-blue-50 relative">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&h=300&auto=format&fit=crop"
            alt="Doctor"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        <div className="px-6 -mt-8 relative z-10">
          <h1 className="text-2xl font-bold text-[#1A1A2E] mb-1">Dr. Sarah Jenkins</h1>
          <p className="text-[#1A73E8] font-medium mb-4">Cardiologist • City Heart Hospital</p>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <p className="text-[#1A1A2E] font-bold text-sm">4.8</p>
                <p className="text-gray-500 text-xs">124 reviews</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#1A73E8]" />
              </div>
              <div>
                <p className="text-[#1A1A2E] font-bold text-sm">10+ Years</p>
                <p className="text-gray-500 text-xs">Experience</p>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-[#1A1A2E] text-base mb-2">About</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Dr. Sarah is a top cardiologist at City Heart Hospital. She has performed over 500 successful procedures and is known for her compassionate patient care... <span className="text-[#1A73E8] font-medium">Read more</span>
          </p>

          <h3 className="font-bold text-[#1A1A2E] text-base mb-4">Available Slots</h3>
          
          <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-6 px-6 mb-6 pb-2">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDay(i)}
                className={`flex flex-col items-center justify-center min-w-[64px] py-3 rounded-2xl border ${
                  selectedDay === i
                    ? "bg-[#1A73E8] border-[#1A73E8] text-white shadow-md shadow-blue-500/20"
                    : "bg-white border-gray-200 text-gray-600"
                }`}
              >
                <span className="text-xs mb-1">{d.day}</span>
                <span className="text-lg font-bold">{d.date}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {times.map((t, i) => (
              <button
                key={i}
                onClick={() => setSelectedTime(t)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium border ${
                  selectedTime === t
                    ? "bg-blue-50 border-[#1A73E8] text-[#1A73E8]"
                    : "bg-white border-gray-200 text-gray-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <h3 className="font-bold text-[#1A1A2E] text-base mb-4">Consultation Type</h3>
          <div className="flex gap-4 p-1 bg-gray-100 rounded-xl mb-4">
            {["In-Clinic", "Telemedicine"].map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg ${
                  type === t ? "bg-white text-[#1A1A2E] shadow-sm" : "text-gray-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] z-20">
        <button
          onClick={() => navigate("/app/schedule")}
          className="w-full h-14 bg-[#1A73E8] text-white rounded-xl font-medium text-base shadow-md shadow-blue-500/20"
        >
          Book Appointment • $150
        </button>
      </div>
    </div>
  );
}
