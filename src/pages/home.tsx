import React from "react";
import { Hero } from "../components/layout/hero";
import { AppLayout } from "../components/layout/layout";
import { Alert } from "../components/alert";

export const Home: React.FC = () => {
  const [alert, setAlert] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 2500);
  }, [alert]);

  return (
    <AppLayout>
      <Hero />
      <div className="flex w-full left-0 p-10 fixed bottom-0">
        {alert && (
          <Alert
            title={"Organizely is only available in mobile version"}
            className="alert"
          />
        )}
      </div>
    </AppLayout>
  );
};
