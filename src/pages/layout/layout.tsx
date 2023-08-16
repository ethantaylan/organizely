import React, { PropsWithChildren } from "react";
import { Header } from "./layout/header";

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div style={{ width: 600 }} className="h-auto p-5 flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
};
