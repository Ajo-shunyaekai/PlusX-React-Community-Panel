import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store.js";

import Dashboard from "../components/Dashboard/index.jsx";
import Layout from "../components/SharedComponent/Layout.jsx";
import Login from "../components/Login/index.jsx";
import Error from "../components/SharedComponent/Error/Error.jsx";
import NotificationList from "../components/Notification/NotificationList.jsx";
import Profile from "../components/Profile/index.jsx";
import Community from "../components/Community/index.jsx";
import ResidentsList from "../components/Residents/ResidentsList.jsx";
import ResidentsChargerList from "../components/Residents/ResidentsChargerList.jsx";
import ResidentsSessionList from "../components/Residents/ResidentsSessionList.jsx";
import ResidentsInvoiceList from "../components/Residents/ResidentsInvoiceList.jsx";
import ResidentsDetails from "../components/Residents/ResidentsDetails.jsx";
import ResidentsInvoiceDetails from "../components/Residents/ResidentsInvoiceDetails.jsx";
import ResidentsSessionDetails from "../components/Residents/ResidentsSessionDetails.jsx";

const router = createBrowserRouter(
    [
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Dashboard />,
                },
                {
                    path: "/community",
                    element: <Community />,
                    children: [
                        {
                            path: "resident-list",
                            element: <ResidentsList />,
                        },
                        {
                            path: "charger-list",
                            element: <ResidentsChargerList />,
                        },
                        {
                            path: "booking-list",
                            element: <ResidentsSessionList />,
                        },
                        {
                            path: "invoice-list",
                            element: <ResidentsInvoiceList />,
                        },
                        {
                            path: "resident-details/:residentId",
                            element: <ResidentsDetails />,
                        },
                        {
                            path: "invoice-details/:invoiceId",
                            element: <ResidentsInvoiceDetails />,
                        },
                        {
                            path: "session-detail/:sessionId",
                            element: <ResidentsSessionDetails />,
                        },
                    ],
                },
                {
                    path: "/notification-list",
                    element: <NotificationList />,
                },
                {
                    path: "/profile",
                    element: <Profile />,
                },
            ],
        },
        {
            path: "*",
            element: <Error />,
        },
    ],
    // PUBLIC_URL is set by CRA from "homepage" in package.json (/community-app).
    // Required so routes work when the app is hosted under a subdirectory.
    { basename: process.env.PUBLIC_URL || "" }
);

function Router() {
    return (
        <>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </>
    );
}

export default Router;
