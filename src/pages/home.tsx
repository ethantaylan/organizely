import React from "react";
import { Hero } from "../components/layout/hero";
import { AppLayout } from "../components/layout/layout";

export const Home: React.FC = () => {
  return (
    <AppLayout>
      <Hero />
    </AppLayout>
  );
};
