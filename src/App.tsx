import { Auth0Provider } from "@auth0/auth0-react";
import "./App.css";
import { Home } from "./pages/home";

function App() {
  return (
    <Auth0Provider
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENTID}
      cacheLocation="localstorage"
    >
      <Home />
    </Auth0Provider>
  );
}

export default App;
