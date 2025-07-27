import axios from "axios";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";

import AvailableBooks from "../pages/DonationRequests";
import Dashboard from "../pages/Dashboard";
import DetailsPage from "../pages/DetailsPage";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";

import Register from "../pages/Register";
import DonationRequestForm from "../pages/DonationRequestForm";
import Myrequests from "../pages/Myrequests";
import PrivateRoute from "../Routers/PrivateRoute";
import DonationRequests from "../pages/DonationRequests";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/donation-request",
        element: (
          <PrivateRoute>
            <DonationRequestForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/available-requests",
        element: <DonationRequests></DonationRequests>,
      },
      {
        path: "/my-requests",
        element: (
          <PrivateRoute>
            <Myrequests />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:requestId",
        element: <PrivateRoute><DetailsPage /></PrivateRoute>,
        loader: async ({ params }) => {
          const {data} = await axios.get(`http://localhost:5000/details/${params.requestId}`);
          return data;
        },
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "registration",
        element: <Register></Register>,
      },
      {},
    ],
  },
]);

export default MainRoutes;
