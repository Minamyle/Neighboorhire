// ── Review Modal ───────────────────────────────────────────────────────────────
export default function ReviewModal({ job, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit(job.id, { rating, review });
    setSubmitted(true);
    setTimeout(onClose, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 dark:border-white/[0.07]">
          <h2 className="font-black text-lg text-slate-900 dark:text-white tracking-tight">
            Leave a Review
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-400"
          >
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 px-6 py-12">
            <CheckCircle2 size={48} className="text-emerald-500" />
            <p className="font-bold text-lg text-slate-800 dark:text-white">
              Thanks for your feedback!
            </p>
            <p className="text-sm text-slate-500 dark:text-zinc-400 text-center">
              Your review has been submitted successfully.
            </p>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-5">
            {/* Job info */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.06]">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-500/15">
                <Briefcase size={16} className="text-blue-500" />
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-800 dark:text-white">
                  {job.title ?? "Completed Job"}
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
                  {job.description ?? "No description."}
                </p>
              </div>
            </div>

            {/* Star picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                Your Rating
              </label>
              <StarPicker value={rating} onChange={setRating} />
              {rating === 0 && (
                <p className="text-xs text-rose-400">
                  Please select a star rating.
                </p>
              )}
            </div>

            {/* Review text */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                Review{" "}
                <span className="normal-case font-normal">(optional)</span>
              </label>
              <textarea
                rows={3}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your experience with this artisan…"
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3.5 py-2.5 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold shadow-sm transition-all"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
