import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import { BrowserRouter, Route, Routes } from "react-router";

import AddProduct from "src/pages/add-product";
import Product from "src/pages/product";
import Home from "src/pages/home";

import { Header } from "src/widgets/header";

import ruRU from "antd/locale/ru_RU";
import "dayjs/locale/zh-cn";

import "./index.css";

dayjs.locale("ru-ru");

function App() {
  return (
    <div className="container">
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
        <BrowserRouter>
          <Header className="full-width-container" />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
