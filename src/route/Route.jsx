import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ErrorPage from "../components/ErrorPage";
import Home from "../pages/Home";
import AllUsers from "../pages/AllUsers";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import Update from "../components/Update";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
         {
            path: '/',
            element: <Home />
         },
         {
            path: '/allUsers',
            element: <AllUsers />,
            loader: () => fetch('http://localhost:5000/users')
         },
         {
            path: '/signIn',
            element: <SignIn />
         },
         {
            path: '/signUp',
            element: <SignUp />
         },
         {
            path: '/update/:id',
            element: <Update />,
            loader: ({ params }) => fetch(`http://localhost:5000/update/${params.id}`)
         }
      ]
   },
]);