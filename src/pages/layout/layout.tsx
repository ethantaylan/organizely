import React, { PropsWithChildren } from "react";
import { BottomNavigation } from "./layout/bottom-nav";
import { Footer } from "./layout/footer";
import { Header } from "./layout/header";

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full pb-52  flex justify-center items-center">
      <div style={{ width: 700 }} className="h-auto relative p-5 flex-col">
        <Header />
        {children}

        <div className="md:hidden">
          <BottomNavigation />
        </div>

        <hr className="mt-10 border-slate-800" />
        <Footer />
      </div>
    </div>
  );
};
