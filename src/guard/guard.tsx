import { useAuth0 } from "@auth0/auth0-react";
import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

export const Guard: React.FC<PropsWithChildren> = ({ children }) => {
  const [ready, setReady] = React.useState<boolean>(false);

  const { isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      setReady(true);
    } else {
      navigate("/");
    }
  }, [ready, isAuthenticated]);

  return ready ? children : null;
};
