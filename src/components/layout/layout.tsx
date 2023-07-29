import React, { PropsWithChildren } from "react";
import { Header } from "./layout/header";

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen w-screen flex-col">
      <Header />
      {children}
    </div>
  );
};
