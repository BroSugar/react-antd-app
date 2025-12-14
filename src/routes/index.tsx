import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../layout/MainLayout";
import Demo from "../pages/Demo";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/Home";
import AForm from "../pages/form/AForm";
import BaseForm from "../pages/form/BaseForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true, element: <Navigate to="/home" replace />
            },
            {
                path: 'demo',
                element: <Demo />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'form',
                children: [
                    { path: 'a-form', element: <AForm /> },
                    { path: 'base-form', element: <BaseForm /> }
                ]
            }
        ]

    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '*',
        element: <NotFound />
    }

])

export default router;