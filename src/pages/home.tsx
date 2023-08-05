import { NewspaperIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Alert } from "../components/alert";
import { Card } from "../components/card";
import { Hero } from "../components/layout/hero";
import { AppLayout } from "../components/layout/layout";

export const Home: React.FC = () => {
  const [alert, setAlert] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 4500);
  }, [alert]);

  return (
    <AppLayout>
      {alert && (
        <Alert
          title="Organizely is optimized for mobile devices, desktop version is under construct."
          className="alert my-2 text-white w-auto bg-secondary bg-opacity-10 border-secondary border-opacity-50 right-9 top-20"
        />
      )}

      <Hero />

      <div className="mt-10">
        <div className="flex items-center">
          <NewspaperIcon className="h-5 me-2 text-secondary" />
          <h1 className="text-xl font-bold  text-white">Recent features</h1>
        </div>

        <div className="flex flex-wrap w-full">
          <Card
            title="Get faster with Favorite users !"
            content="When creating a new todo, you can now quickly add a user by only selecting one"
            btnLabel="See"
          />

          <Card
            title="Share your todos !"
            content="You can now share your todos with emails"
            btnLabel="See"
          />
        </div>
      </div>
    </AppLayout>
  );
};
