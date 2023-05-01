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
    path: `/musclegroup/${path}` as const,
    element,
  }));
  const otherRoutes = [
    { path: "/*", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ] as const;
  return useRoutes<screenRoute>([...routes, ...otherRoutes]);
};
export default App;
