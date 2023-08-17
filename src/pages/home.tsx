import {
  InformationCircleIcon,
  NewspaperIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import {
  NewFeatureCard,
  NewFeatureCardProps,
} from "../components/generic-components/card";
import { Hero } from "./layout/hero";
import { AppLayout } from "./layout/layout";
import { Footer } from "./layout/layout/footer";

export const Home: React.FC = () => {
  const features: NewFeatureCardProps[] = [
    {
      title: "Shared users are now notified !",
      content:
        "When you share a to-do with someone, they will now receive an email notification.",
    },
    {
      title: "Get faster with Favorite users !",
      content:
        "When creating a new todo, you can now quickly add a user by only selecting one.",
    },
    {
      title: "Share your todos !",
      content: "You can now share your todos with emails.",
    },
  ];

  return (
    <AppLayout>
      <div className="flex badge border-0 bg-slate-900">
        <InformationCircleIcon className="w-3 me-1" />
        <p className="text-sm border-0">Optimized for mobile devices</p>
      </div>

      <Hero />

      <div className="flex mt-10 items-center">
        <NewspaperIcon className="h-5 me-2 text-secondary" />
        <h1 className="text-xl font-bold text-slate-300">Recent features</h1>
      </div>

      <div className="flex flex-wrap w-full">
        {features.map((feature) => (
          <NewFeatureCard title={feature.title} content={feature.content} />
        ))}
      </div>
      <hr className="mt-10 border-slate-800" />

      <Footer />
    </AppLayout>
  );
};
