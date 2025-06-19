import { HomeOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router";
import { BottomNavigationTabs } from "src/shared/ui/bottom-navigation-tabs";
import { Header } from "src/widgets/header";

const tabData = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: "Главная",
  },
  {
    key: "/add-product",
    icon: <PlusOutlined />,
    label: "Добавить",
  },
  {
    key: "/profile",
    icon: <UserOutlined />,
    label: "Профиль",
  },
];

export const ProtectedLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="root-container">
      <Header className="full-width-container" />

      <main style={{ height: "100%" }}>
        <Outlet />
        <BottomNavigationTabs tabs={tabData} activeKey={pathname} onChange={navigate} />
      </main>
    </div>
  );
};
