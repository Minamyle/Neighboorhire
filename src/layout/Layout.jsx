import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Router from "../routes/Router";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main>
        <Router />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
