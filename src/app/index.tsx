import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AddProductPage from "src/pages/add-product";
import HomePage from "src/pages/home";
import ProductPage from "src/pages/product";
import ProfilePage from "src/pages/profile";

import ruRU from "antd/locale/ru_RU";
import "dayjs/locale/zh-cn";

import AuthPage from "src/pages/auth";
import { AuthProvider, RequireAuth } from "src/shared/lib/auth";
import { ProtectedLayout } from "./ProtectedLayout";

import "./index.css";

dayjs.locale("ru-ru");

const queryClient = new QueryClient();


function App() {
  return (
    <ConfigProvider
      locale={ruRU}
      componentSize="large"
      theme={{
        cssVar: true,
        token: {
          // Seed Token
          colorPrimary: "#e85fed",
          colorLink: "#e85fed",
          // borderRadius: 2,
          // Alias Token
          // colorBgContainer: "#f6ffed",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            {/* <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/product/:id" element={<Product />} />
            </Routes> */}

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
                </Route>
              </Route>

              {/* Фолбэк: редиректим на главную или login */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
