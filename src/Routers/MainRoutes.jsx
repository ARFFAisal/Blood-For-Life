import axios from "axios";
import { createBrowserRouter } from "react-router";

import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import AvailableBooks from "../pages/DonationRequests";
import Dashboard from "../pages/Dashboard";
import DetailsPage from "../pages/DetailsPage";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DonationRequestForm from "../pages/DonationRequestForm";
import Myrequests from "../pages/Myrequests";
import DonationRequests from "../pages/DonationRequests";
import BlogPage from "../pages/BlogPage";

import PrivateRoute from "../Routers/PrivateRoute";
import RoleBasedRoute from "../Routers/RoleBasedRoute";

import CreateRequest from "../pages/CreateRequest";
import AllRequests from "../pages/AllRequests";
import VolunteerBlogs from "../pages/VolunteerBlogs";
import ManageUsers from "../pages/ManageUsers";
import ManageBlogs from "../pages/ManageBlogs";
import ContentManagement from "../pages/ContentManagement"; // <-- Import your ContentManagement page here
import AddBlogForm from "../pages/AddBlogForm";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },

      {
        path: "/donation-request",
        element: (
          <PrivateRoute>
            <DonationRequestForm />
          </PrivateRoute>
        ),
      },
      { path: "/available-requests", element: <DonationRequests /> },
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
  element: (
    <PrivateRoute>
      <DetailsPage />
    </PrivateRoute>
  ),
  loader: async ({ params }) => {
    const { data } = await axios.get(`https://assignment-12-sever.vercel.app/details/${params.requestId}`);
    return data;
  },
},


      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          // User role routes
          { path: "create-request", element: <CreateRequest /> },
          { path: "my-requests", element: <Myrequests /> },

          // Volunteer role routes
          { path: "all-requests", element: <AllRequests /> },
          { path: "volunteer-blogs", element: <VolunteerBlogs /> },

          // Admin role routes wrapped with RoleBasedRoute
          {
            path: "manage-users",
            element: (
              <RoleBasedRoute allowedRoles={["admin"]}>
                <ManageUsers />
              </RoleBasedRoute>
            ),
          },
          {
            path: "manage-blogs",
            element: (
              <RoleBasedRoute allowedRoles={["admin"]}>
                <ManageBlogs />
              </RoleBasedRoute>
            ),
          },

           {
      path: "add-blog",
      element: (
        <RoleBasedRoute allowedRoles={["admin"]}>
          <AddBlogForm />
        </RoleBasedRoute>
      ),
    },

          // Add the missing content-management route here:
          {
            path: "content-management",
            element: (
              <RoleBasedRoute allowedRoles={["admin", "volunteer"]}>
                <ContentManagement />
              </RoleBasedRoute>
            ),
          },

          // Dashboard home / index route
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },

      { path: "login", element: <Login /> },
      { path: "registration", element: <Register /> },
      { path: "/blogs", element: <BlogPage /> },
    ],
  },
]);

export default MainRoutes;
