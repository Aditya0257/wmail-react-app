import * as React from "react";
import {
  createBrowserRouter,
  //   RouterProvider,
  //   Route,
  //   Link,
} from "react-router-dom";
import App from "./App";
import EmailList from "./components/HomePage/EmailList";
import Mail from "./components/HomePage/Mail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <EmailList />,
      },
      {
        path: "/mail",
        element: <Mail />,
      },
      //   {
      //     path: "dashboard",
      //     element: <Dashboard />,
      //     loader: ({ request }) =>
      //       fetch("/api/dashboard.json", {
      //         signal: request.signal,
      //       }),
      //   },
      //   {
      //     element: <AuthLayout />,
      //     children: [
      //       {
      //         path: "login",
      //         element: <Login />,
      //         loader: redirectIfUser,
      //       },
      //       {
      //         path: "logout",
      //         action: logoutUser,
      //       },
      //     ],
      //   },
    ],
  },
]);

export default router;
