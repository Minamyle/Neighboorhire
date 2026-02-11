import { Outlet } from "react-router-dom";

export default function IndexPageLayout() {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
