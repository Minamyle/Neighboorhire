import { Outlet } from "react-router-dom";
import MainHeader from "../components/headerComponent";
import MainFooter from "../components/mainFooter";

export default function IndexPageLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors duration-500">
      <MainHeader />

      <main className="pt-24 md:pt-32">
        <Outlet />
      </main>

      <MainFooter />
    </div>
  );
}
