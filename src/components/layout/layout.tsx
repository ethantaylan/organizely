import React from "react";
import { Header } from "./layout/header";

export const AppLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-between">
      <Header />
    </div>
  );
};
