import React, { PropsWithChildren } from "react
import { Header } from "./layout/header";

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full pb-52  flex justify-center items-center">
      <div style={{ width: 700 }} className="h-auto relative p-5 flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
};
