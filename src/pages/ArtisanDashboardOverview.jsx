import { Wallet } from "lucide-react";

export default function ArtisanDashboardOverview() {
  return (
    <div className="space-y-7">
      <div className="p-5 flex flex-col gap-2  rounded-xl shadow-lg bg-white/5 backdrop-blur-2xl  ">
        <h1 className="text-2xl md:text-3xl font-bold font-sans dark:text-white">
          Welcome, {"Samuel"}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Keep track of your bussiness
        </p>
      </div>
      {/* overview cards */}
      <div className=" grid grid-cols-1 gap-4  lg:grid-cols-3 ">
        <div className="rounded-2xl bg-white/5 backdrop-blur-2xl h-40 shadow-2xl md:shadow-[0_5px_10px_rgba(250,250,250,0.2)] flex justify-between p-5 relative">
          <div className="flex flex-col gap-3 ">
            <p className="text-lg font-semibold ">Total Earnings</p>
            <h2 className="text-2xl font-extrabold text-green-400">$257</h2>
          </div>
          <span className="z-2 w-13 h-13 flex justify-center items-center bg-green-400 rounded-full  ">
            <Wallet size={25} className="text-green-950 " />
          </span>

          <div className="absolute right-7   w-20 h-20 rounded-full bg-linear-210 from-green-800 to-green-500 blur-3xl animate-spin duration-300 transition-all" />
        </div>
        <div className="rounded-2xl bg-white/5 backdrop-blur-2xl h-40 shadow-2xl md:shadow-[0_5px_10px_rgba(250,250,250,0.2)] flex justify-between p-5 relative">
          <div className="flex flex-col gap-3 ">
            <p className="text-lg font-semibold ">Pending jobs</p>
            <h2 className="text-2xl font-extrabold text-orange-400">12</h2>
          </div>
          <span className="z-2 w-13 h-13 flex justify-center items-center bg-orange-400 rounded-full  ">
            <Wallet size={25} className="text-orange-950 " />
          </span>

          <div className="absolute right-7 bottom-0   w-20 h-20 rounded-full bg-linear-210 from-orange-800 to-orange-500 blur-3xl animate-spin duration-300 transition-all" />
        </div>

        <div className="rounded-2xl bg-white/5 backdrop-blur-2xl h-40 shadow-2xl md:shadow-[0_5px_10px_rgba(250,250,250,0.2)] flex justify-between p-5 relative">
          <div className="flex flex-col gap-3 ">
            <p className="text-lg font-semibold ">Available Jobs</p>
            <h2 className="text-2xl font-extrabold text-purple-800">17</h2>
          </div>
          <span className="z-2 w-13 h-13 flex justify-center items-center bg-purple-400 rounded-full  ">
            <Wallet size={25} className="text-green-950 " />
          </span>

          <div className="absolute right-7 bottom-0   w-20 h-20 rounded-full bg-linear-210 from-purple-800 to-purple-500 blur-3xl ease-in-out animate-spin duration-400 transition-transform" />
        </div>
      </div>
    </div>
  );
}
