import { useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Mail,
  Calendar,
  Edit3,
  Save,
  X,
  CheckCircle,
  Star,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function CustomerProfile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: user?.phone || "",
    address: user?.address || "",
    location: user?.location || "",
    bio: user?.bio || "",
  });

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const avatarColor = "from-blue-500 to-indigo-600";

  return (
    <div className="min-h-screen  p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* --- Profile Header Card --- */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-8 mb-8 shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Letter Avatar */}
            <div
              className={`h-32 w-32 rounded-3xl bg-linear-to-br ${avatarColor} flex items-center justify-center text-white text-5xl font-black shadow-2xl border-4 border-white dark:border-slate-700`}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {user?.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest rounded-full border border-blue-200/50">
                  Customer
                </span>
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm font-medium">
                  <Calendar size={14} /> Joined {user?.joinDate || "2024"}
                </span>
              </div>
            </div>

            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 ${
                isEditing
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                  : "bg-slate-900 dark:bg-slate-700 text-white"
              }`}
            >
              {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
              <span>{isEditing ? "Save Profile" : "Edit Profile"}</span>
            </button>
          </div>
        </div>

        {/* --- Account Details Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-4xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700/50 pb-3 flex items-center gap-2">
              <Phone size={18} className="text-blue-500" /> Contact Info
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                  WhatsApp Number
                </label>
                {isEditing ? (
                  <input
                    className="w-full bg-slate-100 dark:bg-slate-900/50 border-none rounded-xl px-4 py-3 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-slate-700 dark:text-slate-200 font-bold">
                    {user?.phone || "No number set"}
                  </p>
                )}
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                  Email Address
                </label>
                <p className="text-slate-700 dark:text-slate-200 font-bold flex items-center gap-2 lowercase">
                  <Mail size={14} className="text-slate-400" /> {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-4xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700/50 pb-3 flex items-center gap-2">
              <MapPin size={18} className="text-blue-500" /> Service Location
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                  Digital Address (GPS)
                </label>
                {isEditing ? (
                  <input
                    className="w-full bg-slate-100 dark:bg-slate-900/50 border-none rounded-xl px-4 py-3 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="AK-000-0000"
                  />
                ) : (
                  <p className="text-slate-700 dark:text-slate-200 font-bold">
                    {user?.address || "Add digital address"}
                  </p>
                )}
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                  Neighborhood
                </label>
                {isEditing ? (
                  <select
                    className="w-full bg-slate-100 dark:bg-slate-900/50 border-none rounded-xl px-4 py-3 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  >
                    <option value="Adum">Adum</option>
                    <option value="Nhyiaeso">Nhyiaeso</option>
                    <option value="KNUST">KNUST</option>
                  </select>
                ) : (
                  <p className="text-slate-700 dark:text-slate-200 font-bold">
                    {user?.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- Activity Summary --- */}
        <div className="mt-8 p-8 rounded-4xl bg-linear-to-br from-blue-600 to-indigo-700 text-white flex justify-around items-center shadow-2xl shadow-blue-900/20">
          <div className="text-center">
            <p className="text-3xl font-black">{user?.totalJobsPosted || 0}</p>
            <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest">
              Jobs Posted
            </p>
          </div>
          <div className="h-10 w-px bg-white/20" />
          <div className="text-center">
            <p className="text-3xl font-black">4</p>
            <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest">
              Active Requests
            </p>
          </div>
          <div className="h-10 w-px bg-white/20" />
          <div className="text-center">
            <p className="text-3xl font-black flex items-center gap-1">
              5<Star size={20} fill="white" />
            </p>
            <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest">
              User Trust
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
