import { useState } from "react";
import { Link, Outlet } from "react-router";
import { Building2, HandCoins, Menu, Plus, X } from "lucide-react";
import Logo from "../../components/Logo/Logo";

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Dashboard", path: "/dashboard", },
        { name: "Add plans", path: "/dashboard/add-plans", icon: <Plus size={16} /> },
        { name: "My Plans", path: "/dashboard/my-plans", icon: <HandCoins size={16} /> },
        { name: "Company profile", path: "/dashboard/company-profile", icon: <Building2 size={16} /> },
        { name: "Post Job", path: "/dashboard/post-job", icon: <Plus size={16} /> },
        { name: "My Applications (Jobseeker)", path: "/dashboard/my-applications", icon: <Plus size={16} /> },
        { name: "Logout", path: "/logout" },
    ];

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`fixed lg:static z-40 top-0 left-0 h-full w-96 bg-white shadow-md transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
            >
                <div className="p-4 border-b border-gray-200 flex justify-between items-center lg:block">
                    <Logo></Logo>
                    <button
                        className="lg:hidden text-gray-700"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="mt-6 flex flex-col space-y-2 px-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="text-gray-700 flex items-center gap-2 hover:bg-blue-50 hover:text-violet-500 px-3 py-2 rounded-lg transition"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar (shows only below lg) */}
                <header className="bg-white p-4 flex justify-between items-center lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-500 focus:outline-none border p-2 border-gray-200 rounded-lg"
                    >
                        <Menu size={26} />
                    </button>
                </header>

                {/* Outlet area */}
                <main className="p-3 overflow-auto flex-1 ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
