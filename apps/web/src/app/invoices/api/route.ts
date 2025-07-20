// app/api/seed/route.ts
import { NextResponse } from "next/server";
import {createInvoice, getInvoicesFile, Invoice} from "@/app/invoices/@api/invoices";

export const dynamic = "force-dynamic"; // disable Next's static caching

export async function GET() {
    console.log("hi");
    const data = await getInvoicesFile();
    try {
        const promises = (data as Invoice[]).map((invoice) => {
            createInvoice(invoice)
        });

        await Promise.all(promises);

        return NextResponse.json({ message: "Database seeded successfully!" });
    } catch (error) {
        console.error("Error seeding DB:", error);
        return NextResponse.json(
            { error: "Failed to seed database" },
            { status: 500 }
        );
    }
}