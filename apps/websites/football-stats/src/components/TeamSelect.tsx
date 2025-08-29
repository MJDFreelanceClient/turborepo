"use client"

import {useStore} from "@tanstack/react-store";
import {teamNameStore, teamStore, toggleTeam} from "@/lib/teamStore";
import { useRouter, useSearchParams } from "next/navigation";

export const TeamSelect = () => {
    const teams = useStore(teamStore)
    const selectedTeams = useStore(teamNameStore)
    const router = useRouter();
    const searchParams = useSearchParams();

    const setQuery = (teamName:string) => {
        const params = new URLSearchParams(searchParams);
        const newTeams = selectedTeams.includes(teamName)
            ? selectedTeams.filter(t => t !== teamName)
            : [...selectedTeams, teamName]
        params.set("teams", newTeams.join(",")); // set query param ?foo=bar
        router.push(`?${params.toString()}`); // updates URL
        toggleTeam(teamName)
    };

    return (
        <div className="flex gap-4 flex-wrap">
            {teams.map(team => (
                <label key={team.name} className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={selectedTeams.includes(team.name)}
                        onChange={() => setQuery(team.name)}
                    />
                    <span style={{ color: team.color }}>{team.name}</span>
                </label>
            ))}
        </div>
    );
};