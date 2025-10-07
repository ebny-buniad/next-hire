import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout/MainLayout";
import LandingPage from "../pages/LandingPage/LandingPage";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import FindJobs from "../pages/FindJobs/FindJobs";
import PrivateRouter from "../router/PrivateRouter";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import Support from "../pages/Support/Support";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true, Component: LandingPage,
            },
            {
                path: 'find-jobs',
                element: <PrivateRouter><FindJobs></FindJobs></PrivateRouter>
            },
            {
                path: 'profile',
                element: <PrivateRouter><Profile></Profile></PrivateRouter>
            },
            {
                path: 'settings',
                element: <PrivateRouter><Settings></Settings></PrivateRouter>
            },
            {
                path: 'support',
                element: <PrivateRouter><Support></Support></PrivateRouter>
            }
        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'signup',
                Component: SignUp
            }
        ]
    },
    {
        path: '/my-dashboard',
        element: <PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
        children: [

        ]
    }
]);

export default router;