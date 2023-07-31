import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { GlobalContextProvider } from "./context/context";
import { Home } from "./pages/home";
import { Tasks } from "./pages/tasks";

function App() {
  return (
    <GlobalContextProvider>
      <Auth0Provider
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENTID}
        cacheLocation="localstorage"
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </GlobalContextProvider>
  );
}

export default App;
