import { useNavigate } from "react-router";
import { ChevronLeft, Search, SlidersHorizontal, Star, MapPin } from "lucide-react";
import { motion } from "motion/react";

const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Jenkins",
    specialty: "Cardiologist",
    hospital: "City Heart Hospital",
    rating: 4.8,
    reviews: 124,
    distance: "1.2 km",
    fee: "$150",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop",
    available: true
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    hospital: "Skin & Beauty Clinic",
    rating: 4.9,
    reviews: 208,
    distance: "2.5 km",
    fee: "$120",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop",
    available: true
  },
  {
    id: "3",
    name: "Dr. Emily Roberts",
    specialty: "Pediatrician",
    hospital: "Children's Medical Center",
    rating: 4.7,
    reviews: 89,
    distance: "3.0 km",
    fee: "$100",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop",
    available: false
  }
];

export function DoctorList() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-50 text-gray-700">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-lg font-semibold text-[#1A1A2E] ml-2">Find a Doctor</span>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Search */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full h-12 pl-11 pr-4 bg-white text-gray-900 rounded-xl border border-gray-200 focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] sm:text-sm"
              placeholder="Search doctors..."
            />
          </div>
          <button className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-700">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6 -mx-4 px-4 pb-1">
          {["All", "Available Today", "Highest Rated", "Near Me"].map((filter, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                i === 0 
                  ? "bg-[#1A73E8] text-white border border-[#1A73E8]" 
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-4 pb-8">
          {doctors.map((doctor, i) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
              onClick={() => navigate(`/app/doctors/${doctor.id}`)}
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden relative bg-gray-100 flex-shrink-0">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  {doctor.available && (
                    <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-[#1A1A2E] text-base">{doctor.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold">{doctor.rating}</span>
                    </div>
                  </div>
                  <p className="text-[#1A73E8] text-sm font-medium mb-1">{doctor.specialty}</p>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{doctor.hospital} • {doctor.distance}</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-[#1A1A2E]">{doctor.fee}</span>
                    <button className="px-4 py-1.5 bg-blue-50 text-[#1A73E8] font-medium text-xs rounded-lg hover:bg-blue-100 transition-colors">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
