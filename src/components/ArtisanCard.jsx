import {Star, CheckCircle2} from "lucide-react";

export default function ArtisanCard({artisan}) {
  const {
    name,
    profession,
    rating,
    reviews,
    bio,
    price,
    image,
    isVerified,
    isOnline,
  } = artisan;

  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 relative">
      <div className="flex items-start justify-between mb-5">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-800 shadow-sm">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 uppercase font-black text-xl">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-zinc-900 ${
              isOnline ? "bg-green-500" : "bg-slate-300"
            }`}
          />
        </div>

        {isVerified && (
          <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full">
            <CheckCircle2
              size={12}
              className="text-blue-600 dark:text-blue-400"
            />
            <span className="text-[10px] font-black text-blue-700 dark:text-blue-300 uppercase tracking-wider">
              Verified
            </span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase italic truncate">
          {name}
        </h3>
        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
          {profession}
        </p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1">
          <Star size={14} className="fill-blue-500 text-blue-500" />
          <span className="text-sm font-black text-slate-900 dark:text-white">
            {rating}
          </span>
        </div>
        <span className="text-xs font-bold text-slate-400">
          ({reviews} reviews)
        </span>
      </div>

      <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-2 min-h-[2.5rem]">
        {bio}
      </p>

      <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-zinc-800">
        <div>
          <span className="text-lg font-black text-slate-900 dark:text-white">
            ₦{price.toLocaleString()}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">
            /hr
          </span>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95">
          View Profile
        </button>
      </div>
    </div>
  );
}
