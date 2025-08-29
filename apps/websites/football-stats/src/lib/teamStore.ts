import { Store } from "@tanstack/store";

export const teamStore = new Store([
    {
        name: "Arsenal",
        color: "#e11d48", // red
        ppda: {
            "High Press Zone": 8.2,
            "Midfield Press Zone": 11.5,
            "Defensive Third": 13.0,
            "Against Top 6": 9.4,
            "Against Bottom 6": 11.8,
            "UCL Matches": 10.9,
        },
    },
    {
        name: "ManCity",
        color: "#2563eb", // blue
        ppda: {
            "High Press Zone": 10.5,
            "Midfield Press Zone": 9.8,
            "Defensive Third": 12.0,
            "Against Top 6": 11.2,
            "Against Bottom 6": 13.5,
            "UCL Matches": 9.7,
        },
    },
    {
        name: "Liverpool",
        color: "#b91c1c", // darker red
        ppda: {
            "High Press Zone": 7.9,
            "Midfield Press Zone": 10.1,
            "Defensive Third": 11.5,
            "Against Top 6": 8.7,
            "Against Bottom 6": 10.9,
            "UCL Matches": 9.8,
        },
    },
    {
        name: "Spurs",
        color: "#64748b", // grey/white tone
        ppda: {
            "High Press Zone": 11.4,
            "Midfield Press Zone": 12.1,
            "Defensive Third": 13.8,
            "Against Top 6": 12.0,
            "Against Bottom 6": 13.2,
            "UCL Matches": 11.6,
        },
    },
    {
        name: "Chelsea",
        color: "#1d4ed8", // Chelsea blue
        ppda: {
            "High Press Zone": 9.6,
            "Midfield Press Zone": 11.2,
            "Defensive Third": 12.7,
            "Against Top 6": 10.1,
            "Against Bottom 6": 12.3,
            "UCL Matches": 10.8,
        },
    },
]);

export const teamNameStore = new Store<string[]>([
"Chelsea", "Spurs"
])

export const toggleTeam = (teamName: string) => {
    teamNameStore.setState(prev =>
        prev.includes(teamName)
            ? prev.filter(t => t !== teamName)
            : [...prev, teamName]
    );
};
