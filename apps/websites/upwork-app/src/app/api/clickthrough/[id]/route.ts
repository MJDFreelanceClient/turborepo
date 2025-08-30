import { NextResponse } from "next/server";
import {addItem} from "@/lib/dynamo"; // however you access your DB

export async function GET(req:any, { params }:any) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Log the click
    await addItem({job:id, clickedDateTime:Date.now()});

    // Redirect to external URL
    return NextResponse.redirect(`https://www.upwork.com/jobs/~02${id}`, 302);
}