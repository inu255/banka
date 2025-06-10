import { Outlet } from "react-router";
import { Header } from "src/widgets/header";

export const ProtectedLayout = () => {
  return (
    <div className="root-container">
      <Header className="full-width-container" />

      <main style={{ height: "100%" }}>
        <Outlet />
      </main>
    </div>
  );
};
