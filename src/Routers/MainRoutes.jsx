import axios from "axios";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";

import AvailableBooks from "../pages/AvailableBooks";
import Dashboard from "../pages/Dashboard";
import DetailsPage from "../pages/DetailsPage";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";

import Register from "../pages/Register";
import DonationRequestForm from "../pages/DonationRequestForm";
import Myrequests from "../pages/Myrequests";
import PrivateRoute from "../Routers/PrivateRoute";

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
        path: "/available-books",
        element: <AvailableBooks />,
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
        path: "/details/:bookId",
        element: <DetailsPage />,
        loader: async ({ params }) => {
          const {data} = await axios.get(`http://localhost:5000/details/${params.bookId}`);
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
