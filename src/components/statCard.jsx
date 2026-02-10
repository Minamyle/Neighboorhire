export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  glowGradient,
  isCurrency = false, // New prop to toggle currency symbol
}) {
  const baseColor = color.split("-")[1];

  return (
    <div
      className="rounded-3xl h-44 flex justify-between p-7 relative overflow-hidden transition-all duration-500 group
                    bg-white/70 dark:bg-white/5 backdrop-blur-3xl 
                    border border-white dark:border-white/10 
                    shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none"
    >
      {/* Text Info */}
      <div className="flex flex-col justify-between z-10">
        <p className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
          {title}
        </p>
        <h2
          className={`text-4xl font-black tracking-tighter flex items-baseline gap-1 ${color}`}
        >
          {/* Conditional Currency Symbol */}
          {isCurrency && (
            <span className="text-xl font-bold opacity-70">GH₵</span>
          )}
          {value}
        </h2>
      </div>

      {/* Modern Glass Icon Circle */}
      <div
        className={`z-10 w-14 h-14 flex justify-center items-center rounded-2xl shadow-lg 
                       bg-${baseColor}-500/20 dark:bg-${baseColor}-500/20 
                       border border-${baseColor}-500/20 backdrop-blur-md`}
      >
        <Icon size={28} className={color} />
      </div>

      {/* 2026 Style Animated "Aura" Glow */}
      <div
        className={`absolute -right-4 -bottom-4 w-32 h-32 rounded-full blur-[50px] opacity-40 
                      group-hover:opacity-70 group-hover:scale-150 transition-all duration-700
                      ${glowGradient}`}
      />

      {/* Secondary Accent Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-transparent via-transparent to-white/10 dark:to-white/5 pointer-events-none" />
    </div>
  );
}
