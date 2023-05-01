import { Register } from "../Register";
import { Login } from "../Login";

import { BrowserRouter } from "react-router-dom";
import { muscleGroups, screenRoute, useRoutes } from "../../misc";
import { Home } from "../Home";

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

const Router = () => {
  const element = <Home />;
  const routes = muscleGroups.map((path) => ({
    path: `/gym-routine-tracker/musclegroup/${path}` as const,
    element,
  }));
  const otherRoutes = [
    { path: "/gym-routine-tracker/", element: <Home /> },
    { path: "/gym-routine-tracker/login", element: <Login /> },
    { path: "/gym-routine-tracker/register", element: <Register /> },
    { path: "/*", element: <div>404</div> },
  ] as const;
  return useRoutes<screenRoute>([...routes, ...otherRoutes]);
};
export default App;
