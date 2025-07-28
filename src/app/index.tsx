import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App as AntdApp } from "antd";

import AddProductPage from "src/pages/add-product";
import HomePage from "src/pages/home";
import ProductPage from "src/pages/product";
import ProfilePage from "src/pages/profile";
import AuthPage from "src/pages/auth";
import SearchPage from "src/pages/search";

import ruRU from "antd/locale/ru_RU";
import "dayjs/locale/ru";

import { AuthProvider, RequireAuth } from "src/shared/lib/auth";
import { ProtectedLayout } from "./ProtectedLayout";

import "./index.css";

dayjs.locale("ru-ru");

const queryClient = new QueryClient();

// TODO: error boundary
function App() {
  return (
    <ConfigProvider
      locale={ruRU}
      componentSize="large"
      getPopupContainer={() => document.getElementById("root-container")!}
      theme={{
        cssVar: true,
        token: {
          colorPrimary: "#e85fed",
          colorLink: "#e85fed",
          // colorBgContainer: "#f6ffed",
          // colorBgBase
          // colorBorder
          // colorWhite
        },
      }}
    >
      <AntdApp>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <div id="root-container">
              <BrowserRouter basename="/banka/">
                <Routes>
                  {/* Публичные страницы */}
                  <Route path="/auth" element={<AuthPage />} />

                  {/* Защищённые страницы с layout-обёрткой */}
                  <Route element={<RequireAuth />}>
                    <Route element={<ProtectedLayout />}>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/add-product" element={<AddProductPage />} />
                      <Route path="/product/:id" element={<ProductPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/search" element={<SearchPage />} />
                    </Route>
                  </Route>

                  {/* Фолбэк: редиректим на главную или login */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </BrowserRouter>
            </div>
          </AuthProvider>
        </QueryClientProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
