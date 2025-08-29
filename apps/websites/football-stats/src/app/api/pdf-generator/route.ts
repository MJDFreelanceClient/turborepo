import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    searchParams.append("bypass", "S6sncMNU0Fy4o0b9");

    const url = `https://footie.scaf-folder.com/?${searchParams.toString()}`

    // Fetch PDF from upstream
    const res = await fetch(`http://18.132.14.67:3000/pdf`, {
        headers: {
            "Content-Type": "application/json", // 👈 important
        },
        method: "POST",
        body: JSON.stringify({ url })
    });

    if (!res.ok) {
        return NextResponse.json(
            { error: `Upstream error: ${res.status}` },
            { status: res.status }
        );
    }

    const pdfBuffer = await res.arrayBuffer();

    return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline; filename=report.pdf",
        },
    });
}