import { useState } from "react";
import {
  X,
  CheckCircle2,
  User,
  Globe,
  Phone,
  Mail,
  MapPin,
  MessageCircle, // Added for WhatsApp context
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";

export default function CreateJobModal({ artisan, onClose }) {
  const { user } = useAuth();
  const { createJob } = useJobs();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: artisan?.category || "",
    budget: "",
    location: "",
    phone: user?.phone || "",
    email: user?.email || "",
    materialsProvided: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      ...formData,
      id: `job_${Date.now()}`,
      budget: Number(formData.budget),
      customerId: user.id,
      artisanId: artisan ? artisan.id : null,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    createJob(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      {/* Glassmorphic Container */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-gray-200/30 dark:border-slate-700/30 flex justify-between items-center bg-white/20 dark:bg-slate-800/20">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              {artisan ? `Hire ${artisan.name}` : "Post Public Job"}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              {artisan ? (
                <span className="flex items-center gap-1 text-[10px] font-black text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full border border-blue-200/50 tracking-widest">
                  <User size={12} /> DIRECT HIRE
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full border border-emerald-200/50 tracking-widest">
                  <Globe size={12} /> PUBLIC FEED
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all"
          >
            <X size={22} className="text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar"
        >
          {/* Job Title */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
              Project Title
            </label>
            <input
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Fix leaking kitchen pipe"
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-gray-300/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Category & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={!!artisan}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-gray-300/50 dark:border-slate-600/50 rounded-xl dark:text-white disabled:opacity-50"
              >
                <option value="">Select Category</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Painting">Painting</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                Budget (GH₵)
              </label>
              <input
                required
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-gray-300/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none"
              />
            </div>
          </div>

          {/* Contact & Location Section */}
          <div className="space-y-4 p-5 bg-white/40 dark:bg-slate-800/40 rounded-2xl border border-white/40 dark:border-slate-700/40 shadow-inner">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Location */}
              <div className="flex-1">
                <label className="flex items-center gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <MapPin size={14} className="text-blue-500" /> Location
                </label>
                <input
                  required
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Adum, Kumasi"
                  className="w-full px-4 py-2.5 bg-white/60 dark:bg-slate-700/50 border border-gray-300/50 dark:border-slate-600/50 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone with WhatsApp Recommendation */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="flex items-center gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300">
                    <Phone size={14} className="text-green-500" /> Phone
                  </label>
                  <span className="text-[9px] font-black text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-1.5 py-0.5 rounded border border-green-200 dark:border-green-800 tracking-tighter">
                    WHATSAPP RECOMMENDED
                  </span>
                </div>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="024XXXXXXX"
                  className="w-full px-4 py-2.5 bg-white/60 dark:bg-slate-700/50 border border-gray-300/50 dark:border-slate-600/50 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <Mail size={14} className="text-blue-500" /> Contact Email
              </label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white/60 dark:bg-slate-700/50 border border-gray-300/50 dark:border-slate-600/50 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
              Job Description
            </label>
            <textarea
              required
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the problem clearly..."
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-gray-300/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none resize-none"
            />
          </div>

          {/* Materials Checkbox */}
          <label className="flex items-center group cursor-pointer gap-3 p-4 bg-blue-500/5 dark:bg-blue-400/5 rounded-2xl border border-blue-500/20 hover:bg-blue-500/10 transition-colors">
            <input
              type="checkbox"
              name="materialsProvided"
              checked={formData.materialsProvided}
              onChange={handleChange}
              className="w-5 h-5 accent-blue-600 rounded-lg cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              I will provide necessary materials
            </span>
          </label>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="order-2 sm:order-1 flex-1 px-4 py-4 rounded-2xl font-bold text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="order-1 sm:order-2 flex-[2] px-4 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <CheckCircle2 size={20} />
              Confirm & Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
