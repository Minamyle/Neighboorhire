import { Outlet } from "react-router-dom";

export default function ArtisanDashboard() {
  return (
    <div className=" min-h-screen min-w-screen grid grid-cols-[auto_1fr] ">
      <div className="col-1  bg-white/50 min-h-screen">side bar</div>
      <div className="flex flex-col space-y-7">
        <div>Top header</div>
        <Outlet />
      </div>
    </div>
  );
}
