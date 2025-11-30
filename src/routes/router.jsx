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
import AddPlans from "../pages/Dashboard/Admin/AddPlans";
import MyPlans from "../pages/Dashboard/Admin/MyPlans";
import CompanyProfile from "../pages/Dashboard/Employer/CompanyProfile";
import CreateCompanyProfile from "../pages/Dashboard/Employer/CreateCompanyProfile";
import UpdateCompanyProfile from "../pages/Dashboard/Employer/UpdateCompanyProfile";
import PostJob from "../pages/Dashboard/Employer/PostJob";
import JobDetails from "../pages/FindJobs/JobDetails";
import ViewCompanyProfile from "../pages/FindJobs/ViewCompanyProfile";
import MyApplications from "../pages/Dashboard/Jobseeker/MyApplications";
import ManageJobs from "../pages/Dashboard/Employer/ManageJobs";

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
                path: 'job-details/:id',
                element: <PrivateRouter><JobDetails></JobDetails></PrivateRouter>
            },
            {
                path: 'view-company-profile/:company_Name',
                element: <PrivateRouter><ViewCompanyProfile></ViewCompanyProfile></PrivateRouter>
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
        path: '/dashboard',
        element: <PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
        children: [
            {
                path: 'add-plans',
                Component: AddPlans
            },
            {
                path: 'my-plans',
                Component: MyPlans
            },
            {
                path: 'company-profile',
                Component: CompanyProfile
            },
            {
                path: 'create-company-profile',
                Component: CreateCompanyProfile
            },
            {
                path: 'update-company-profile',
                Component: UpdateCompanyProfile
            },
            {
                path: 'post-job',
                Component: PostJob
            },
            {
                path: 'my-applications',
                Component: MyApplications
            }, 
            {
                path: 'manage-jobs',
                Component: ManageJobs
            }
        ]
    }
]);

export default router;