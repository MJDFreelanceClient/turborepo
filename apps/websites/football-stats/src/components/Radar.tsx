"use client"

import React, {useEffect, useMemo} from 'react';
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend} from 'recharts';
import {teamNameStore, teamStore} from "@/lib/teamStore";
import {useStore} from "@tanstack/react-store"
import {useSearchParams} from "next/navigation";

const RadarExample = () => {
    const teams = useStore(teamStore)
    const selectedTeamNames = useStore(teamNameStore)
    const searchParams = useSearchParams();

    useEffect(() => {
        const value = searchParams.get("teams");
        teamNameStore.setState(()=>value?.split(",")??[])
    }, [])

// 1. Get all categories (subjects) from the first team
    const subjects = Object.keys(teams[0].ppda);

    const selectedTeams = useMemo(
        ()=>teams.filter(team=>
            selectedTeamNames.includes(team.name)), [teams, selectedTeamNames])

// 2. Build the radar chart data
    const data = subjects.map(subject => {
        const row: any = { subject, fullMark: 20 };
        teams.forEach(team => {
            row[team.name] = (team.ppda as any)[subject as any];
        });
        return row;
    });

    return (

            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={(props) => {
                            const { x, y, payload } = props;
                            return (
                                <text x={x} y={y} textAnchor="middle"
                                      className={`text-[10px] xl:text-[16px]`}>
                                    {payload.value.replace("Press Zone", "PZ")}
                                </text>
                            );
                        }}
                    />
                    <PolarRadiusAxis />
                    {selectedTeams.map(team=>(
                        <Radar
                            isAnimationActive={false}
                            key={team.name}
                            name={team.name}
                            dataKey={team.name}
                            stroke={team.color}
                            fill={team.color}
                            fillOpacity={0.3}
                        />
                    ))}
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>
    );
};

export default RadarExample;
