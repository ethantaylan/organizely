import React from "react";
import { AppLayout } from "../components/layout/layout";
import { Hero } from "../components/layout/hero";

export const Home: React.FC = () => {
  return (
    <AppLayout>
      <Hero />
    </AppLayout>
  );
};
