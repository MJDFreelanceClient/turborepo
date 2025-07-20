"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {useQuery} from "@tanstack/react-query";
import {getBudgets} from "@/lib/dynamo";

export const BudgetChart = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['budgets'],
        queryFn: ()=>getBudgets(),
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className={`relative flex items-center justify-center col-span-2`}>
            <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="maximum"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            innerRadius={94}
                            startAngle={160} endAngle={520}
                            fill="#8884d8"
                            stroke={`none`}
                        >
                            {data!.map((entry) => (
                                <Cell key={entry.category} fill={entry.theme} />
                            ))}
                        </Pie>
                        <Pie
                            data={data}
                            dataKey="maximum"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius={94}
                            innerRadius={81}
                            startAngle={160} endAngle={520}
                            fill="#8884d8"
                            stroke={`none`}
                        >
                            {data!.map((entry) => (
                                <Cell key={entry.category} fill={entry.theme} className={`opacity-75`} />
                            ))}
                        </Pie>
                    </PieChart>
            </ResponsiveContainer>
            <div className={`absolute inset-0 flex flex-col items-center justify-center`}>
                <div className={`text-preset-1 text-gray-900`}>$858</div>
                <div className={`text-preset-5 text-gray-500`}>of $975 limit</div>
            </div>
        </div>
    );
};