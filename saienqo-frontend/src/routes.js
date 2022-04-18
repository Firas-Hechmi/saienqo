

import Login from "auth/Login.js";
import Index from "components/Index";
import Project from "components/Project";


var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
    {
      path: "/index",
      name: "Dashboard",
      icon: "ni ni-tv-2 text-primary",
      component:Index,
      layout: "/admin",
    },
    {
      path: "/projects/:project_id",
      name: "Dashboard",
      icon: "ni ni-tv-2 text-primary",
      component:Project,
      layout: "/admin",
    },
];
export default routes;
