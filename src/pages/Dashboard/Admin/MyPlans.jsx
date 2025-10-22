import { useQuery } from "@tanstack/react-query";
import { DollarSign, Dot, Edit, Eye, Trash2 } from "lucide-react";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import DashboardPageTitle from "../../../components/DashboardPageTitle/DashboardPageTitle";
import { useState } from "react";

const MyPlans = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedPlan, setSelectedPlan] = useState({});
    const { name, price } = selectedPlan;
    console.log(selectedPlan.features)

    const { data: plans = [], isLoading, refetch } = useQuery({
        queryKey: ["plans"],
        queryFn: async () => {
            const res = await axiosSecure.get("/api/plans");
            return res.data.data;
        },
    });

    if (isLoading) return <Loading></Loading>;

    // Delete plan
    const handelDelete = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to delete this plan!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#FF0000",
                cancelButtonColor: "#868683",
                confirmButtonText: "Yes, Delete!",
                cancelButtonText: "No, Keep it.",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/api/plans/${id}`);
                    if (res.data.data.deletedCount === 1) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    }
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <DashboardPageTitle>My Plans</DashboardPageTitle>
            <div className="overflow-x-auto bg-white rounded-xl  border-gray-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-violet-500">Price ($)</th>
                            <th className="px-6 py-3 text-violet-500">Plan Name</th>
                            <th className="px-6 py-3 text-violet-500 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {plans.map((plan, index) => (
                            <tr
                                key={plan._id || index}
                                className=" hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {plan.name}
                                </td>
                                <td className="px-6 py-4">{plan.price}</td>
                                <td className="px-6 py-4 text-center flex justify-center gap-5">
                                    {/* View */}
                                    <button
                                        onClick={() => {
                                            setSelectedPlan(plan),
                                                document.getElementById('my_plan').showModal()
                                        }}
                                        className="text-gray-400 transition cursor-pointer"
                                    >
                                        <Eye size={18} />
                                    </button>

                                    {/* Delete */}
                                    <button
                                        onClick={() => handelDelete(plan._id)}
                                        className="text-gray-400 cursor-pointer hover:text-red-400 transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <dialog id="my_plan" className="modal">
                {selectedPlan && (
                    <>
                        <div className="modal-box w-11/12 max-w-3xl">
                            <h3 className="font-bold text-lg my-5 border-b pb-2 border-gray-200 text-violet-500">{name}</h3>
                            <p className="py-4 flex items-center">Plan price : <DollarSign size={14} />{price}</p>
                            <div className="space-y-2 border-b pb-5 border-gray-200">
                                <p className="pt-5 font-semibold text-violet-500">Plan features</p>
                                {selectedPlan?.features?.map((feature, idx) => (
                                    <p key={idx} className="flex items-center"><Dot className="text-violet-500"/> {feature.text}</p>
                                ))}
                            </div>

                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn text-white font-normal border-0 bg-gradient-to-r from-blue-500 to-purple-500">Close</button>
                                </form>
                            </div>
                        </div>
                    </>
                )}
            </dialog>
        </div>
    );
};

export default MyPlans;
