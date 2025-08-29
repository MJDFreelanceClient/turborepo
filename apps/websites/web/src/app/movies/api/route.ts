import {NextResponse} from "next/server";
import {getMovies, saveMovie} from "@/app/movies/@api/movie";

export async function GET() {
    let movies:any[] = [];

    try {
        movies = await getMovies();

        await Promise.all(movies.map((movie) =>
                saveMovie({ ...movie, id: movie.title })
            )
        )

        return NextResponse.json({ message: "Database seeded successfully!" });
    } catch (error) {
        console.error("Error seeding DB:", error);
        return NextResponse.json(
            { error: "Failed to seed database", movies },
            { status: 500 }
        );
    }
}