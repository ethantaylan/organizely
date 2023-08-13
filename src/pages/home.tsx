import {
  InformationCircleIcon,
  NewspaperIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { NewFeatureCard } from "../components/card";
import { Hero } from "../components/layout/hero";
import { AppLayout } from "../components/layout/layout";

export const Home: React.FC = () => {
  // const [alert, setAlert] = React.useState<boolean>(true);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setAlert(false);
  //   }, 4500);
  // }, [alert]);

  return (
    <AppLayout>
      {/* {alert && (
        <Alert
          title="Organizely is optimized for mobile devices, desktop version is under construct."
          className="alert my-2 text-slate-300 w-auto bg-primary bg-opacity-10 border-opacity-50 right-9 top-20"
        />
      )} */}

      <div className="flex p-2 bg-slate-900 badge">
        <InformationCircleIcon className="w-4 me-1" />
        <p className="text-sm font-semibold">Optimized for mobile devices</p>
      </div>

      <Hero />

      <div className="mt-10">
        <div className="flex items-center">
          <NewspaperIcon className="h-5 me-2 text-secondary" />
          <h1 className="text-xl font-bold  text-slate-300">Recent features</h1>
        </div>

        <div className="flex flex-wrap w-full">
          <NewFeatureCard
            title="Get faster with Favorite users !"
            content="When creating a new todo, you can now quickly add a user by only selecting one"
            btnLabel="See"
          />

          <NewFeatureCard
            title="Share your todos !"
            content="You can now share your todos with emails"
            btnLabel="See"
          />
        </div>
      </div>
    </AppLayout>
  );
};
