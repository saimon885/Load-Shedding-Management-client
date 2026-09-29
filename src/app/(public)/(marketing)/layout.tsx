import type { ReactNode } from "react";
import Footer from "@/components/layout/shared/footer/Footer";

import Navbar from "@/components/layout/shared/Header/Navbar";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main className="flex-1">{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
