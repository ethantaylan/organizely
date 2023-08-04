import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { TaskDetail } from "./components/task-detail";
import { GlobalContextProvider } from "./context/context";
import { Guard } from "./guard/guard";
import { FavoriteUsers } from "./pages/favorite-users";
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
            <Route path="/tasks">
              <Route
                index
                element={
                  <Guard>
                    <Tasks />
                  </Guard>
                }
              />

              <Route
                path=":todoId"
                element={
                  <Guard>
                    <TaskDetail />
                  </Guard>
                }
              />
            </Route>
            <Route
              path="/favorite-users"
              element={
                <Guard>
                  <FavoriteUsers />
                </Guard>
              }
            />
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </GlobalContextProvider>
  );
}

export default App;
