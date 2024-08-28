import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// IMPORTING ALL ROUTES
import Layout from "./src/Layout/Layout";
import Dashboard from "./src/Screens/Dashboard";
import FromCreation from "./src/Screens/FromCreation";
import FeedBackDetails from "./src/Screens/FeedBackDetails";
import Notfound from "./src/Screens/Nofound";
import Home from './src/Screens/WebsiteScreens/Home';





const Router = () => {


    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    index: true,
                    path: '/',
                    element: <Dashboard />
                },
                {
                    path: 'form-creation',
                    element: <FromCreation />
                },
                {
                    path: 'feedback-details',
                    element: <FeedBackDetails />
                },

                {
                    path: '*',
                    element: <Notfound />
                }
            ]

        },
        {
            path: 'home',
            element: <Home />
        },
    ])

    return (

        <RouterProvider router={router} />
    )
}

export default Router