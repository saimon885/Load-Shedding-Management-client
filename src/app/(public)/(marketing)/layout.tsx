import Footer from "@/components/layout/shared/footer/Footer";
import Navbar from "@/components/layout/shared/Header/Navbar";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
