"use client"

import {useStore} from "@tanstack/react-store";
import {teamNameStore, teamStore, toggleTeam} from "@/lib/teamStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export const TeamSelect = () => {
    const teams = useStore(teamStore);
    const selectedTeams = useStore(teamNameStore);
    const router = useRouter();
    const searchParams = useSearchParams();

    const setQuery = (teamName: string) => {
        const params = new URLSearchParams(searchParams);
        const newTeams = selectedTeams.includes(teamName)
            ? selectedTeams.filter((t) => t !== teamName)
            : [...selectedTeams, teamName];

        params.set("teams", newTeams.join(","));
        router.push(`?${params.toString()}`);
        toggleTeam(teamName);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="mb-4 p-8 text-[24px] min-w-48 justify-between">
                    {selectedTeams.length > 0
                        ? selectedTeams.join(', ')
                        : "Select teams"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
                {teams.map((team) => (
                    <DropdownMenuCheckboxItem
                        key={team.name}
                        checked={selectedTeams.includes(team.name)}
                        onCheckedChange={() => setQuery(team.name)}
                        style={{ color: team.color }}
                    >
                        {team.name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};