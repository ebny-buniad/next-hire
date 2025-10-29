import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const JobFilters = ({ onFilterChange }) => {
    const { register, watch, reset, setValue } = useForm();
    const values = watch();

    console.log(values)

    useEffect(() => {
        const timeout = setTimeout(() => {
            onFilterChange(values);
        }, 500);

        return () => clearTimeout(timeout);
    }, [values, onFilterChange]);

    const handleClear = () => {
        reset({
            jobType: "",
            category: [],
            minSalary: "",
            maxSalary: "",
        });
        onFilterChange({
            jobType: "",
            category: [],
            minSalary: "",
            maxSalary: "",
        });
    };


    // handle single job type select
    const handleJobTypeSelect = (value) => {
        if (values.jobType === value) {
            setValue("jobType", "");
        } else {
            setValue("jobType", value);
        }
    };

    return (
        <aside className="space-y-5">

            <div className="">
                <button
                    type="button"
                    className="cursor-pointer text-blue-600"
                    onClick={handleClear}
                >
                    Clear All
                </button>
            </div>
            {/* Job Type */}
            <div>
                <label className="label-text font-medium">Job Type</label>
                <div className="flex flex-col gap-1 mt-3 space-y-2">
                    {["Full-time", "Part-time", "Remote", "Internship"].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={values.jobType === type}
                                onChange={() => handleJobTypeSelect(type)}
                                className="checkbox checkbox-sm"
                            />
                            <span>{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Category */}
            <div>
                <label className="label-text font-medium">Category</label>
                <div className="flex flex-col gap-1 mt-3 space-y-2">
                    {[
                        "Frontend Development",
                        "Backend Development",
                        "UI/UX Design",
                        "Digital Marketing",
                        "QA / Testing",
                        "DevOps",
                    ].map((cat) => (
                        <label key={cat} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                value={cat}
                                {...register("category")}
                                className="checkbox checkbox-sm"
                            />
                            <span>{cat}</span>
                        </label>
                    ))}

                </div>
            </div>

            {/* Salary Range */}
            <div>
                <label className="label-text font-medium">Salary Range ($)</label>
                <div className="flex gap-2 mt-3">
                    <input
                        type="number"
                        placeholder="Min"
                        {...register("minSalary")}
                        className="input input-bordered py-2  rounded-lg focus:outline-none focus:border-violet-500 no-arrow"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        {...register("maxSalary")}
                        className="input input-bordered py-2  rounded-lg focus:outline-none focus:border-violet-500 no-arrow"
                    />
                </div>
            </div>
        </aside>
    );
};

export default JobFilters;
