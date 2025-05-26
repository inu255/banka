import { BrowserRouter, Route, Routes } from "react-router";
import { ConfigProvider } from "antd";

import Home from "src/pages/home";
import AddProduct from "src/pages/add-product";

import { Header } from "src/widgets/header";

import "./index.css";

function App() {
  return (
    <div className="container">
      <ConfigProvider
        theme={{
          cssVar: true,
          token: {
            // Seed Token
            colorPrimary: "#e85fed",
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
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
