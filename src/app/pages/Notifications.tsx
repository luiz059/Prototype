import { useState } from "react";
import { Bell, Calendar, Activity, MessageSquare, Pill, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export function Notifications() {
  const [filter, setFilter] = useState("All");

  const notifications = [
    {
      id: 1,
      type: "appointment",
      title: "Appointment Reminder",
      message: "You have an appointment with Dr. Sarah Jenkins tomorrow at 10:30 AM",
      time: "2 hours ago",
      read: false,
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      type: "prescription",
      title: "Prescription Refill Due",
      message: "Your Lisinopril prescription is due for refill in 3 days",
      time: "5 hours ago",
      read: false,
      icon: Pill,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 3,
      type: "result",
      title: "Lab Results Available",
      message: "Your blood test results from Oct 10 are now available",
      time: "1 day ago",
      read: true,
      icon: FileText,
      color: "bg-teal-100 text-teal-600",
    },
    {
      id: 4,
      type: "update",
      title: "Appointment Confirmed",
      message: "Dr. Michael Chen confirmed your appointment for Oct 20 at 2:00 PM",
      time: "2 days ago",
      read: true,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 5,
      type: "reminder",
      title: "Health Checkup Reminder",
      message: "It's time for your annual health checkup. Book an appointment today!",
      time: "3 days ago",
      read: true,
      icon: Activity,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 6,
      type: "message",
      title: "New Secure Message",
      message: "Dr. Lisa Park sent you a message regarding your treatment plan",
      time: "4 days ago",
      read: true,
      icon: MessageSquare,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  const filteredNotifications = filter === "All"
    ? notifications
    : notifications.filter(n => !n.read);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="px-6 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-500 mt-1">{unreadCount} unread notifications</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button className="text-sm text-[#1A73E8] font-medium">
              Mark all read
            </button>
          )}
        </div>

        <div className="flex gap-3">
          {["All", "Unread"].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                filter === tab
                  ? "bg-[#1A73E8] text-white shadow-md shadow-blue-500/20"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No unread notifications</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notif, i) => {
              const Icon = notif.icon;
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-white rounded-2xl p-4 shadow-sm border ${
                    notif.read ? "border-gray-100" : "border-blue-200 shadow-blue-100"
                  } relative`}
                >
                  {!notif.read && (
                    <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-[#1A73E8] rounded-full" />
                  )}

                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 pr-4">
                      <h3 className={`font-bold text-[#1A1A2E] text-sm mb-1 ${!notif.read ? "text-[#1A1A2E]" : ""}`}>
                        {notif.title}
                      </h3>
                      <p className={`text-sm mb-2 leading-relaxed ${notif.read ? "text-gray-500" : "text-gray-600"}`}>
                        {notif.message}
                      </p>
                      <p className="text-xs text-gray-400">{notif.time}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
