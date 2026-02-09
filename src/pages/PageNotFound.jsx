import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-[#09090b] overflow-hidden text-white font-sans">
      {/* Animated Mesh Gradients - The "Danger" Orange Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px] animate-bounce duration-[10s]" />

      <div className="relative z-10 text-center px-6">
        {/* Main Brand Element */}
        <div className="mb-6 flex flex-col items-center">
          <span className="px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest animate-fade-in">
            NeighbourHire Hub
          </span>
        </div>

        {/* Hero 404 with Custom Animation */}
        <div className="relative group">
          <h1 className="text-[12rem] md:text-[18rem] font-black leading-none select-none tracking-tighter opacity-10 group-hover:opacity-20 transition-opacity duration-700">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl md:text-5xl font-bold italic tracking-tight text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
              LOST IN THE HOOD?
            </p>
          </div>
        </div>

        <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
          Looks like you've wandered into an empty lot. Let's get you back to
          the best local services in town.
        </p>

        {/* Animated Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="group relative px-10 py-4 w-full sm:w-auto rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all active:scale-95"
          >
            <span className="font-semibold tracking-wide">Back to Safety</span>
            {/* Subtle Slide Animation on Hover */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-10 py-4 w-full sm:w-auto rounded-xl bg-orange-600 font-bold shadow-[0_10px_20px_rgba(234,88,12,0.3)] hover:bg-orange-500 hover:shadow-[0_15px_30px_rgba(234,88,12,0.5)] transition-all duration-300 active:scale-95"
          >
            Go to Home Feed
          </button>
        </div>

        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>
    </div>
  );
}
